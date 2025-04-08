document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.getElementById('cardsContainer');

  // Mostrar mensaje de carga
  cardsContainer.innerHTML = `
    <div class="text-center my-5 bg-warning">
      <div class="spinner-border text-warning" role="status">
        <span class="visually-hidden">Cargandooooo desesperado...</span>
      </div>
      <p class="mt-3">Cargando Movies...</p>
    </div>
  `;
    // fetchezito JSON
    fetch('data.json')
        .then(response => {
        if (!response.ok) {
            throw new Error('Erroooooorrrrrrrrrr cargar el archivo data.json');
        }
        return response.json();
    })

    .then(data => renderCards(data))
    // SI HAY ERRooooooooOR 
    .catch(error => {
        console.error('Errooooooooor cards:', error);
        cardsContainer.innerHTML = `<p class="text-danger text-center p-5 bg-warning">Erroorrrrrrrrrrrrrr cards.</p>`;
    });
});

function renderCards(cardsData) {

    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';
    // Si no hay data muestra un mensaje
    if (!cardsData || cardsData.length === 0) {
        container.innerHTML = '<p class="text-center mt-5">No hay datos cards</p>';
        return;
    }
    // Si hay data itera cada elemento en una card 
    cardsData.forEach((card, index) => {
    const carouselId = `carousel-${index}`;

    // declaramos variable 
    let carouselItems = '';
    // Iteramos 
        card.imagenes.forEach((imagen, imgIndex) => {
        // bloquezin de HTML que vamos a asignar dentro de carousel    
        carouselItems +=
        // asignamos la clase active con operador ternario
        `<div class="carousel-item ${imgIndex === 0 ? 'active' : ''}">
            <img src="${imagen}" class="d-block w-100 rounded-5" alt="Imagen ${imgIndex}">
        </div>`;
    });
    // bloquezin de HTML que vamos a asignar dentro de card
    const cardHTML = `
        <div class="col-12 col-md-6 col-lg-4 mb-4 h-100" id="card-${index}">
            <div class="card h-100 shadow-lg bg-card rounded-5 p-2">
                <div id="${carouselId}" class="carousel slide" data-bs-ride="carousel">

                    <div class="carousel-inner">
                    ${carouselItems}
                    </div>

                    <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">

                        <span class="carousel-control-prev-icon" aria-hidden="true">
                        </span>
                        <span class="visually-hidden">
                        Anterior
                        </span>

                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">

                        <span class="carousel-control-next-icon" aria-hidden="true">
                        </span>
                        <span class="visually-hidden">
                        Siguiente
                        </span>
                        
                    </button>
                </div>
                <div class="card-body">

                    <h3 class="card-text text-white">
                    ${card.title}
                    </h3>
                    <p class="card-text text-white">
                    ${card.texto}
                    </p>

                    <div class="d-flex flex-column justify-content-between ">
                        <button class="btn btn-primary w-100 my-1" onclick="viewCard(${index})">
                        Ver
                        </button>
                        <button class="btn btn-danger w-100 my-1" onclick="hideCard(${index})">
                        Ocultar
                        </button>
                    </div>

                </div>
            </div>
        </div>
    `;

    container.innerHTML += cardHTML;
  });
}


    //FUNCION FAKE BUTTON LOGIN 
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Los valores de los inputsitos
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        // si es false ps no te deja, asi de simple 
        let isValid = true; 

        // Valida correo 
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValid.test(email.value.trim())) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.remove('is-invalid');
        }

        // Validar password 6 sencillo 
        if (password.value.trim().length < 6) {
            password.classList.add('is-invalid');
            isValid = false;
          } else {
            password.classList.remove('is-invalid');
          }

        // verifica que la variable isValid sea true, si no es asi no hace nada izzi izzi
        if (isValid) {
            simulateRedirect();
        }
    });

    function simulateRedirect() {
        window.location.href = 'home.html'; 
    }

    // ya que tenga vistas va a redireccionar a las vistas... si es que llegan a existir 
    function navigate(route) {
        // ya de 
        window.scrollTo(0, 0);

        const content = document.getElementById('content');

        switch (route) {
        case 'peliculas':
            content.innerHTML = '<h1>Películas</h1><p>No existe vista películas</p>';
            break;
        case 'series':
            content.innerHTML = '<h1>Series</h1><p>Aquí van las series</p>';
            break;
        case 'favoritos':
            content.innerHTML = '<h1>Favoritos</h1><p>Tu lista de favoritos</p>';
            break;
        case 'generos':
            content.innerHTML = '<h1>Géneros</h1><p>Pues los género</p>';
            break;
            // no cierra sesion oooooooobviamente, pero da el gatazo
        case 'cerrar-sesion':
            window.location.href = 'index.html'; 

            break;    
        default:
            content.innerHTML = '<h1>Bienvenido</h1>';
        }
    }

      
      function hideCard(index) {

        const card = document.getElementById(`card-${index}`);

        if (card) {
          card.style.display = 'none';
        }
      }
      // no tiene sentido esta funcion, se cambiara...
      function viewCard(index) {

        const card = document.getElementById(`card-${index}`);

        if (card) {
          card.style.display = 'block';
        }
      }

