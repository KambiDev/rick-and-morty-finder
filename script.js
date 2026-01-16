document.addEventListener('DOMContentLoaded', fetchData);

const containerResults = document.querySelector('.results');
const input = document.querySelector('#search');
let results = [];

async function fetchData(){
    try {
        
        const respuesta = await fetch('https://rickandmortyapi.com/api/character');

        if (!respuesta.ok) {
            throw new Error('Error en la peticion');
        }

        const data = await respuesta.json();

        results = data.results;

        mostrarPersonajes(results);


    } catch (error) {
        console.log(error);
    }
}

function mostrarPersonajes(personajes){

    let card = '';

    personajes.forEach(personaje => {
        card += `
        <article class="card">
            <div class="image-container">
                <img src="${personaje.image}" alt="Imagen de ${personaje.name}">
            </div>
            
            <div class="content">
                <h3>${personaje.name}</h3>
                <p>${personaje.species}</p>
                
                <div class="status-container">
                    <span class="status-dot ${personaje.status.toLowerCase()}"></span>
                    <span>${personaje.status}</span>
                </div>
            </div>
        </article>
        `;
    });

    containerResults.innerHTML = card;
}

function filtrarPersonajes(personajeBuscado){

    const personajesFiltrados = results.filter(personaje => personaje.name.toLowerCase().includes(personajeBuscado));

    mostrarPersonajes(personajesFiltrados);
}

input.addEventListener('input', (event) => {

    const personajeBuscado = event.target.value.toLowerCase();

    filtrarPersonajes(personajeBuscado);
});