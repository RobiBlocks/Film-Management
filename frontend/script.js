document.getElementById("btnAdd").addEventListener("click", loadAddForm);
const body = document.getElementsByTagName("body")[0];
const toggleBtn = document.getElementById("toggleColorBtn");

function updateToggleIcon() {
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️";
    toggleBtn.title = "Light Mode aktivieren";
  } else {
    toggleBtn.textContent = "🌕";
    toggleBtn.title = "Dark Mode aktivieren";
  }
}

toggleBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  updateToggleIcon();
});

window.addEventListener("load", loadFilms);

function createTable(showAllColumns = false) {
  const existingTable = document.getElementById("filmTable");
  if (existingTable) {
    existingTable.remove();
  }

  const table = document.createElement("table");
  table.id = "filmTable";
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  if (showAllColumns) {
    headerRow.innerHTML = `
      <th>Name</th>
      <th>Bild</th>
      <th>Jahr</th>
      <th>Länge (Minuten)</th>
      <th>Regisseur</th>
      <th>Trailer</th>
      <th>Bearbeiten</th>
    `;
  } else {
    headerRow.innerHTML = `
      <th>Name</th>
      <th>Bild</th>
      <th>Bearbeiten</th>
    `;
  }
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.id = "filmTableBody";
  table.appendChild(tbody);

  body.appendChild(table);
  showStartActions(false);
  return table;
}

function showStartActions(show) {
  const actions = document.getElementById("startActions");
  const table = document.querySelector("table");
  if (actions) actions.style.display = show ? "block" : "none";
  if (table) {
    if (!show) {
      table.classList.add("table-margin");
    } else {
      table.classList.remove("table-margin");
    }
  }
}

function loadFilms() {
  removeBackBtn();
  createTable(false);
  showStartActions(true);
  document.body.classList.remove("force-mobile");
  const tbody = document.getElementById("filmTableBody");
  tbody.innerHTML = "";

  fetch("/api/films/load", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((filme) => {
      filme.forEach((film) => {
        const tr = document.createElement("tr");

        const tdName = document.createElement("td");
        tdName.textContent = film.Name;

        var btnMore = document.createElement("button");
        btnMore.textContent = "Weitere Details";
        btnMore.id = "btnMore";
        btnMore.addEventListener("click", () => {
          showFilmDetails(film.FilmId);
        });
        tdName.appendChild(btnMore);

        tr.appendChild(tdName);

        const tdPic = document.createElement("td");
        if (film.Picture) {
          const img = document.createElement("img");
          img.src = "data:image/jpeg;base64," + film.Picture;
          tdPic.appendChild(img);
        } else {
          tdPic.textContent = "kein Bild";
        }
        tr.appendChild(tdPic);

        const tdEdit = document.createElement("td");

        var btnDelete = document.createElement("button");
        btnDelete.textContent = "Löschen";
        btnDelete.id = "btnDelete";
        btnDelete.addEventListener("click", () => {
          deleteFilm(film.FilmId);
        });
        tdEdit.appendChild(btnDelete);

        var btnEdit = document.createElement("button");
        btnEdit.textContent = "Bearbeiten";
        btnEdit.id = "btnEdit";
        btnEdit.addEventListener("click", () => {
          loadUpdateForm(film.FilmId);
        });
        tdEdit.appendChild(btnEdit);

        tr.appendChild(tdEdit);
        tbody.appendChild(tr);
      });
    });
}

function showFilmDetails(filmId) {
  showStartActions(false);
  document.body.classList.add("force-mobile");
  fetch("/api/films/load", { method: "POST" })
    .then((res) => res.json())
    .then((filme) => {
      const film = filme.find((f) => f.FilmId === filmId);
      if (!film) return;

      const tbody = document.querySelector("#filmTable tbody");
      tbody.innerHTML = "";

      const tr = document.createElement("tr");
      const tdDetails = document.createElement("td");

      let html = `<h2>${film.Name}</h2>`;
      html += `<p><strong>Jahr:</strong> ${film.Year}</p>`;
      html += `<p><strong>Länge:</strong> ${film.Length} Minuten</p>`;
      html += `<p><strong>Regisseur:</strong> ${film.Director}</p>`;

      if (film.Trailer) {
        let embedUrl = film.Trailer;
        if (embedUrl.includes("youtube.com/watch")) {
          const urlObj = new URL(embedUrl);
          const videoId = urlObj.searchParams.get("v");
          if (videoId) {
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
          }
        }
        html += `<iframe width="420" height="236" src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
      } else {
        html += `<p><em>Kein Trailer verfügbar.</em></p>`;
      }
      html += `<br><button id="btnBack">Zurück</button>`;

      tdDetails.innerHTML = html;
      tr.appendChild(tdDetails);
      tbody.appendChild(tr);

      document.getElementById("btnBack").addEventListener("click", () => {
        loadFilms();
        document.body.classList.remove("force-mobile");
      });
    });
}

function loadAddForm() {
  showStartActions(false);
  removeBackBtn();
  createTable(true);
  const tbody = document.querySelector("#filmTable tbody");
  tbody.innerHTML = "";

  const tr = document.createElement("tr");

  const tdName = document.createElement("td");
  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.placeholder = "Name";
  tdName.appendChild(inputName);
  tr.appendChild(tdName);

  const tdBild = document.createElement("td");
  const inputBild = document.createElement("input");
  inputBild.type = "file";
  inputBild.placeholder = "Name";
  tdBild.appendChild(inputBild);
  tr.appendChild(tdBild);

  const tdYear = document.createElement("td");
  const inputYear = document.createElement("input");
  inputYear.type = "number";
  inputYear.min = 1900;
  inputYear.max = 2100;
  inputYear.placeholder = "Jahr";
  tdYear.appendChild(inputYear);
  tr.appendChild(tdYear);

  const tdLength = document.createElement("td");
  const inputLength = document.createElement("input");
  inputLength.type = "number";
  inputLength.placeholder = "Länge";
  tdLength.appendChild(inputLength);
  tr.appendChild(tdLength);

  const tdDirector = document.createElement("td");
  const inputDirector = document.createElement("input");
  inputDirector.type = "text";
  inputDirector.placeholder = "Name";
  tdDirector.appendChild(inputDirector);
  tr.appendChild(tdDirector);

  const tdTrailer = document.createElement("td");
  const inputTrailer = document.createElement("input");
  inputTrailer.type = "text";
  inputTrailer.placeholder = "YouTube-URL";
  tdTrailer.appendChild(inputTrailer);
  tr.appendChild(tdTrailer);

  const tdSave = document.createElement("td");
  const btnSave = document.createElement("button");
  btnSave.textContent = "Speichern";
  btnSave.addEventListener("click", async () => {
    const name = inputName.value;
    const jahr = inputYear.value;
    const länge = inputLength.value;
    const regisseur = inputDirector.value;
    const trailer = inputTrailer.value;
    const bildDatei = inputBild.files[0];

    await addFilm(name, jahr, länge, regisseur, trailer, bildDatei);
    loadFilms();
  });
  tdSave.appendChild(btnSave);
  tr.appendChild(tdSave);
  tbody.appendChild(tr);

  showBackBtn();
}

function addFilm(name, jahr, länge, regisseur, trailer, bildDatei) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("jahr", jahr);
  formData.append("length", länge);
  formData.append("regisseur", regisseur);
  formData.append("trailer", trailer);
  if (bildDatei) {
    formData.append("bild", bildDatei);
  }

  return fetch("/api/films/add", {
    method: "POST",
    body: formData,
  });
}

function loadUpdateForm(id) {
  showStartActions(false);
  removeBackBtn();
  createTable(true);
  fetch("/api/films/load", { method: "POST" })
    .then((res) => res.json())
    .then((filme) => {
      const film = filme.find((f) => f.FilmId === id);
      if (!film) return;

      const tbody = document.querySelector("#filmTable tbody");
      tbody.innerHTML = "";

      const tr = document.createElement("tr");

      const tdName = document.createElement("td");
      const inputName = document.createElement("input");
      inputName.type = "text";
      inputName.value = film.Name;
      tdName.appendChild(inputName);
      tr.appendChild(tdName);

      const tdBild = document.createElement("td");
      const inputBild = document.createElement("input");
      inputBild.type = "file";
      tdBild.appendChild(inputBild);
      tr.appendChild(tdBild);

      const tdYear = document.createElement("td");
      const inputYear = document.createElement("input");
      inputYear.type = "number";
      inputYear.min = 1900;
      inputYear.max = 2100;
      inputYear.value = film.Year;
      tdYear.appendChild(inputYear);
      tr.appendChild(tdYear);

      const tdLength = document.createElement("td");
      const inputLength = document.createElement("input");
      inputLength.type = "number";
      inputLength.value = film.Length;
      tdLength.appendChild(inputLength);
      tr.appendChild(tdLength);

      const tdDirector = document.createElement("td");
      const inputDirector = document.createElement("input");
      inputDirector.type = "text";
      inputDirector.value = film.Director;
      tdDirector.appendChild(inputDirector);
      tr.appendChild(tdDirector);

      const tdTrailer = document.createElement("td");
      const inputTrailer = document.createElement("input");
      inputTrailer.type = "text";
      inputTrailer.placeholder = "YouTube-URL";
      inputTrailer.value = film.Trailer;
      tdTrailer.appendChild(inputTrailer);
      tr.appendChild(tdTrailer);

      const tdSave = document.createElement("td");
      const btnSave = document.createElement("button");
      btnSave.textContent = "Speichern";
      btnSave.addEventListener("click", async () => {
        const formData = new FormData();
        formData.append("name", inputName.value);
        formData.append("jahr", inputYear.value);
        formData.append("length", inputLength.value);
        formData.append("regisseur", inputDirector.value);
        formData.append("trailer", inputTrailer.value);
        if (inputBild.files.length > 0) {
          formData.append("bild", inputBild.files[0]);
        }
        try {
          await updateFilm(id, formData);
          loadFilms();
        } catch (err) {
          alert("Fehler beim Aktualisieren.");
        }
      });
      tdSave.appendChild(btnSave);
      tr.appendChild(tdSave);
      tbody.appendChild(tr);
    });

  showBackBtn();
}

function updateFilm(id, formData) {
  return fetch(`/api/films/${id}`, {
    method: "PUT",
    body: formData,
  }).then(async (res) => {
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server antwortet mit Fehler:", res.status, errorText);
      throw new Error("Fehler beim Aktualisieren");
    }
    return res.json();
  });
}

function deleteFilm(id) {
  if (confirm("Do you want to delete this film?") == true) {
    fetch(`/api/films/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fehler beim Löschen");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        loadFilms();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    text = "You canceled!";
  }
}

function showBackBtn() {
  const backBtn = document.createElement("button");
  backBtn.id = "btnBack";
  backBtn.textContent = "Zurück";
  body.appendChild(backBtn);
  backBtn.addEventListener("click", () => {
    loadFilms();
  });
}

function removeBackBtn() {
  const btn = document.getElementById("btnBack");
  if (btn) btn.remove();
}
