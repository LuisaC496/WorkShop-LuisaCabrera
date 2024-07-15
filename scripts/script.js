document.addEventListener('DOMContentLoaded', agregarTarea);

const formularioTarea = document.getElementById('formulario-tarea');
const entradaTarea = document.getElementById('entrada-tarea');
const listaTareas = document.getElementById('lista-tareas');
const btnLimpiar = document.getElementById('limpiar');

let tareas = []; 


entradaTarea.addEventListener('keypress', eventoKey);
listaTareas.addEventListener('click', gestionarTarea);
btnLimpiar.addEventListener('click', limpiarTareas);

function agregarTarea(evento) {
    evento.preventDefault();
    const textoTarea = entradaTarea.value;
    if (textoTarea === '') return;
    tareas.push({ texto: textoTarea, completada: false });
    guardarTareasEnAlmacenamiento(tareas);
    actualizarListaTareas();
    entradaTarea.value = '';
}

function guardarTareasEnAlmacenamiento(tareas) {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function eventoKey(evento) {
    if (evento.key === 'Enter') {
        agregarTarea(evento);
    }
}

function crearElementoTarea(tarea) {
    const lista= document.createElement('li');
    lista.textContent = tarea.texto;
    if (tarea.completada) {
        lista.classList.add('completada');
    }
    lista.appendChild(crearBotonCompletar());
    lista.appendChild(crearBotonEliminar());
    return lista;
}


//////////////////////CREAR BOTONES PARA CADA OBJETO//////////////////////////////

function crearBotonCompletar() {
    const boton = document.createElement('button');
    boton.textContent = 'Completar';
    boton.classList.add('completar-btn');
    return boton;
}

function crearBotonEliminar() {
    const boton = document.createElement('button');
    boton.textContent = 'Eliminar';
    boton.classList.add('eliminar-btn');
    return boton;
}

//////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////ASIGNAR BOTONES PARA GESTIONAR TAREAS///////////////////////

function gestionarTarea(evento) {
    const elementoTarea = evento.target.parentElement;
    const textoTarea = elementoTarea.firstChild.textContent;
    if (evento.target.classList.contains('completar-btn')) {
        alternarTareaCompleta(textoTarea);
    } else if (evento.target.classList.contains('eliminar-btn')) {
        eliminarTarea(textoTarea);
    }

    actualizarListaTareas();
}
/////////////////////////////////////////////////////////////////////////////////////////////////

function alternarTareaCompleta(textoTarea) {
    tareas = tareas.map(tarea =>
        tarea.texto === textoTarea ? { ...tarea, completada: !tarea.completada } : tarea
    );
    guardarTareasEnAlmacenamiento(tareas);
}//FUNCION BOTÓN

function eliminarTarea(textoTarea) {
    tareas = tareas.filter(tarea => tarea.texto !== textoTarea);
    guardarTareasEnAlmacenamiento(tareas); //FUNCION BOTÓN
}

function actualizarListaTareas() {
    listaTareas.innerHTML = '';
    tareas.forEach(tarea => {
        const elementoTarea = crearElementoTarea(tarea);
        listaTareas.appendChild(elementoTarea);
    });
}

function limpiarTareas() {
    tareas = tareas.filter(tarea => !tarea.completada);
    guardarTareasEnAlmacenamiento(tareas);
    actualizarListaTareas();
}