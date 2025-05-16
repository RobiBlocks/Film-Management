var http = require("http");
var fs = require("fs");
var sql = require("mssql/msnodesqlv8");

var config = {
  server: "NOTEBOOK-ROBIN-\\MYSQLSERVER",
  database: "SavePicturesDB",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

http.createServer(async (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  try {
    await sql.connect(config);

    const result = await sql.query("SELECT * FROM PicturesWithDescription");

    fs.readFile("index.html", "utf-8", (err, data) => {
      if (err) {
        console.error("Fehler beim Lesen der HTML-Datei:", err);
        res.end("<h1>Fehler beim Laden der Seite</h1>");
        return;
      }
      var filmsContent = "";
      result.recordset.forEach(film => {
        filmsContent += `<p><strong>${film.Filmname}</strong>: ${film.Episode}</p>`;
      });
      var htmlContent = data.replace("{{films}}", filmsContent);
    res.end(htmlContent);
    });
  }
  catch (err) {
    console.error("Fehler bei Datenbankverbindung:", err);
    res.end("<h1>Fehler beim Abrufen der Daten</h1>");
  }

}).listen(3000, () => {
  console.log("Server läuft auf localhost:3000");
});