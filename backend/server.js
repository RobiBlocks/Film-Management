const express = require("express");
const multer = require("multer");
const sql = require("mssql/msnodesqlv8");
const path = require("path");
const app = express();

const config = {
  server: "NOTEBOOK-ROBIN-\\MYSQLSERVER",
  database: "FilmsAndSeries",
  driver: "msnodesqlv8",
  options: { trustedConnection: true },
};

app.use(express.json());

const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 } });

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
  res.sendFile(path.join(__dirname, "../frontend", "styles.css"));
  res.sendFile(path.join(__dirname, "../frontend", "script.js"));
});

app.post("/api/films/load", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await new sql.Request().query("SELECT TOP 10 * FROM Film");

    const data = result.recordset.map((film) => ({
      FilmId: film.FilmId,
      Name: film.Name,
      Picture: film.Picture ? film.Picture.toString("base64") : null,
      Year: film.Year,
      Length: film.Length,
      Director: film.Director,
    }));
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ fehler: "Fehler beim Abrufen der Daten" });
  }
});

app.post("/api/films/add", upload.single("bild"), async (req, res) => {
  try {
    const { name, jahr, length, regisseur } = req.body;

    let bild;
    if (req.file && req.file.buffer) {
      bild = req.file.buffer;
    } else {
      bild = null;
    }

    await sql.connect(config);
    const request = new sql.Request();
    request.input("Name", sql.NVarChar, name);
    request.input("Picture", sql.VarBinary(sql.MAX), bild);
    request.input("Year", sql.Int, parseInt(jahr));
    request.input("Length", sql.Int, parseInt(length));
    request.input("Director", sql.NVarChar, regisseur);

    await request.query(`
      INSERT INTO Film (Name, Picture, Year, Length, Director)
      VALUES (@Name, @Picture, @Year, @Length, @Director)
    `);

    res.json({ erfolg: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ fehler: "Fehler beim Speichern" });
  }
});

app.put("/api/films/:id", upload.single("bild"), async (req, res) => {
  try {
    const filmId = parseInt(req.params.id);
    const { name, jahr, length, regisseur } = req.body;

    await sql.connect(config);
    const request = new sql.Request();

    request.input("FilmId", sql.Int, filmId);
    request.input("Name", sql.NVarChar, name);
    request.input("Year", sql.Int, parseInt(jahr));
    request.input("Length", sql.Int, parseInt(length));
    request.input("Director", sql.NVarChar, regisseur);

    if (req.file && req.file.buffer) {
      request.input("Picture", sql.VarBinary(sql.MAX), req.file.buffer);

      const result = await request.query(`
        UPDATE Film
        SET Name = @Name,
            Picture = @Picture,
            Year = @Year,
            Length = @Length,
            Director = @Director
        WHERE FilmId = @FilmId
      `);

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ fehler: "Film nicht gefunden" });
      }
    } else {
      const result = await request.query(`
        UPDATE Film
        SET Name = @Name,
            Year = @Year,
            Length = @Length,
            Director = @Director
        WHERE FilmId = @FilmId
      `);

      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ fehler: "Film nicht gefunden" });
      }
    }

    res.json({ erfolg: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ fehler: "Fehler beim Aktualisieren" });
  }
});

app.delete("/api/films/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await sql.connect(config);
    const result = await new sql.Request()
      .input("FilmId", sql.Int, id)
      .query("DELETE FROM Film WHERE FilmId = @FilmId");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Film nicht gefunden" });
    }
    res.status(200).json({ message: "Film erfolgreich gelöscht" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ fehler: "Fehler beim Löschen des Films" });
  }
});

app.listen(3000, () => console.log("Server läuft auf http://localhost:3000"));
