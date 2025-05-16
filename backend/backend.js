var http = require("http");
var fs = require("fs");
const path = require("path");
const sql = require("mssql/msnodesqlv8");

var config = {
  server: "NOTEBOOK-ROBIN-\\MYSQLSERVER",
  database: "FilmsAndSeries",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    const filepath = path.join(__dirname, "../frontend", "index.html");
    const file = fs.readFileSync(filepath);

    res.writeHead(200, { "content-type": "text/html" });
    res.end(file);
  } else if (req.url == "/api/data") {
    await sql.connect(config);
    const request = new sql.Request();
    const result = await request.query("SELECT TOP 10 * FROM Film");

    const dataWithBase64 = result.recordset.map((film) => ({
      FilmId: film.FilmId,
      Name: film.Name,
      Picture: film.Picture ? film.Picture.toString("base64") : null,
      Year: film.Year,
      Length: film.Length,
      Director: film.Director,
    }));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(dataWithBase64));
  } else {
    res.writeHead(404);
    res.end("Nicht gefunden");
  }
});

server.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
