document.getElementById("btnLoad").addEventListener("click", loadFilms);
document.getElementById("btnAdd").addEventListener("click", loadAddForm);
const toggleBtn = document.getElementById('toggleColorBtn');

function updateToggleIcon() {
  if (document.body.classList.contains('dark-mode')) {
    toggleBtn.textContent = '☀️';
    toggleBtn.title = 'Light Mode aktivieren';
  } else {
    toggleBtn.textContent = '🌕';
    toggleBtn.title = 'Dark Mode aktivieren';
  }
}

toggleBtn.addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  updateToggleIcon();
});

window.addEventListener("load", loadFilms);

function loadFilms() {
  fetch("/api/films/load", {
    method: "POST",
  })
    .then((res) => res.json())
    .then((filme) => {
      const tbody = document.querySelector("#filmTable tbody");
      tbody.innerHTML = "";

      filme.forEach((film) => {
        const tr = document.createElement("tr");

        const tdName = document.createElement("td");
        tdName.textContent = film.Name;
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

        const tdYear = document.createElement("td");
        tdYear.textContent = film.Year;
        tr.appendChild(tdYear);

        const tdLength = document.createElement("td");
        tdLength.textContent = film.Length;
        tr.appendChild(tdLength);

        const tdDirector = document.createElement("td");
        tdDirector.textContent = film.Director;
        tr.appendChild(tdDirector);

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

function loadAddForm() {
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

  const tdSave = document.createElement("td");
  const btnSave = document.createElement("button");
  btnSave.textContent = "Speichern";
  btnSave.addEventListener("click", async () => {
    const name = inputName.value;
    const jahr = inputYear.value;
    const länge = inputLength.value;
    const regisseur = inputDirector.value;
    const bildDatei = inputBild.files[0];

    await addFilm(name, jahr, länge, regisseur, bildDatei);
    loadFilms();
  });
  tdSave.appendChild(btnSave);
  tr.appendChild(tdSave);
  tbody.appendChild(tr);
}

function addFilm(name, jahr, länge, regisseur, bildDatei) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("jahr", jahr);
  formData.append("length", länge);
  formData.append("regisseur", regisseur);
  if (bildDatei) {
    formData.append("bild", bildDatei);
  }

  return fetch("/api/films/add", {
    method: "POST",
    body: formData,
  });
}

function loadUpdateForm(id) {
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

      const tdSave = document.createElement("td");
      const btnSave = document.createElement("button");
      btnSave.textContent = "Speichern";
      btnSave.addEventListener("click", async () => {
        const formData = new FormData();
        formData.append("name", inputName.value);
        formData.append("jahr", inputYear.value);
        formData.append("length", inputLength.value);
        formData.append("regisseur", inputDirector.value);
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
}
