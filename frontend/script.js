document.getElementById("load").addEventListener("click", loadFilms);
document.getElementById("add").addEventListener("click", loadAddFilmForm);

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

        tbody.appendChild(tr);
      });
    });
}

function loadAddFilmForm() {
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

  const btnSave = document.createElement("button");
  btnSave.id = "save";
  btnSave.textContent = "Speichern";

  btnSave.addEventListener("click", () => {
    const name = inputName.value;
    const jahr = inputYear.value;
    const länge = inputLength.value;
    const regisseur = inputDirector.value;
    const bildDatei = inputBild.files[0];

    saveNewFilm(name, jahr, länge, regisseur, bildDatei);
  });

  tbody.appendChild(tr);
  tbody.appendChild(btnSave);
}

function saveNewFilm(name, jahr, länge, regisseur, bildDatei) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("jahr", jahr);
  formData.append("länge", länge);
  formData.append("regisseur", regisseur);
  if (bildDatei) {
    formData.append("bild", bildDatei);
  }

  fetch("/api/films", {
    method: "POST",
    body: formData,
  });
}
