const listaDeTareas = [
  {
    id: 1,
    nombre: "Agregar entradas al array",
    realizado: false,
  },

  {
    id: 2,
    nombre: "Terminar el desafio",
    realizado: false,
  },

  {
    id: 3,
    nombre: "Limpiar PC",
    realizado: false,
  },
];

const idDetarea = document.getElementById("idDeTarea");
const nombreDeTarea = document.getElementById("nombreDeTarea");
const inputTarea = document.getElementById("inputTarea");
const btnTarea = document.getElementById("btnTarea");
const totalTareas = document.getElementById("totalTareas");
const realizadasTareas = document.getElementById("realizadasTareas");

btnTarea.addEventListener("click", function () {
  nuevaTarea();
});

function nuevaTarea() {
  const nombreNuevaTarea = inputTarea.value;
  const newIndex = listaDeTareas.length + 1;

  if (inputTarea.value === "") {
  } else {
    let obj = { id: newIndex, nombre: nombreNuevaTarea, realizado: false };
    listaDeTareas.push(obj);
    inputTarea.value = "";
    renderTareas(listaDeTareas)
  }
}

function renderTareas(arrayDeTareas) {
  idDetarea.innerHTML = renderId(arrayDeTareas);
  nombreDeTarea.innerHTML = renderNombre(arrayDeTareas);
  totalTareas.innerHTML = `Total: ${listaDeTareas.length}`;
}

function renderId(arrayDeTareas) {
  let html = "";
  for (tarea of arrayDeTareas) {
    html += `<span>${tarea.id}</span>`;
  }
  return html;
}

function renderNombre(arrayDeTareas) {
  let html = "";
  for (tarea of arrayDeTareas) {
    html += `<div class="row">
              <span id="${tarea.id}" class="col-8">${tarea.nombre}</span>
              <input class="col-1" type="checkbox" onchange=tareaRealizada(${tarea.id})>
              <button type ="button" class="col-3 btn btn-outline-danger btn-sm" onclick="borrarTarea(${tarea.id})">Eliminar</button>
            </div>
    `;
  }
  return html;
}

function borrarTarea(id) {
  const index = indexTarea(id);
  listaDeTareas.splice(index, 1);
  renderTareas(listaDeTareas);
}

function tareaRealizada(id) {
  const index = indexTarea(id);
  if (listaDeTareas[index].realizado === false) {
    listaDeTareas[index].realizado = true
    document.getElementById(id).style.textDecoration = "line-through";
  } else {
    listaDeTareas[index].realizado = false
    document.getElementById(id).style.textDecoration = ""
  }
  realizadasTareas.innerHTML = `Realizadas: ${filtrarTareas(listaDeTareas)}`;
}

function filtrarTareas(array) {
  const filtro = array.filter(tarea => tarea.realizado === true)
  return filtro.length
}

function indexTarea(id) {
  const index = listaDeTareas.findIndex((tarea) => tarea.id === id);
  return index;
}

if (document.readyState === "Loading") {
  document.addEventListener("DOMContentLoaded", renderTareas(listaDeTareas));
} else {
  renderTareas(listaDeTareas);
}
