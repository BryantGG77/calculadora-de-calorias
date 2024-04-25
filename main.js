const formularioCalculadora = document.getElementById('formulario-calculadora')
const resultado = document.getElementById('resultado')

formularioCalculadora.addEventListener('submit', (evento) => {
    evento.preventDefault();
    calcularCalorias();
})

function calcularCalorias() {

    aparecerResultado();

    const nombre = document.querySelector('#nombre')
    const documento = document.querySelector('#documento')
    const documentoTipo = document.querySelector('#documentoTipo')
    const edad = document.querySelector('#edad')
    const genero = document.querySelector('input[name="genero"]:checked')

    const peso = document.querySelector('#peso')
    const altura = document.querySelector('#altura')
    const actividad = document.querySelector('#actividad')


    let formulaCalculo;

    if (genero.value === "M") {
        formulaCalculo = actividad.value * (10 * peso.value) + (6.25 * altura.value) - (5 * edad.value) + 5
    } else {
        formulaCalculo = actividad.value * (10 * peso.value) + (6.25 * altura.value) - (5 * edad.value) - 161
    }

    let grupoPoblacional;

    if (edad.value >= 15 && edad.value <= 29) {
        grupoPoblacional = "Joven"
    } else if (edad.value >= 30 && edad.value <= 59) {
        grupoPoblacional = "Adulto"
    } else {
        grupoPoblacional = "Adulto mayor"
    }

    resultado.innerHTML = `<div>
                                <h1> Calorias requeridas: </h1>
                                <br>
                                <p style="font-size: 2rem">
                                    El paciente ${nombre.value} identificado con ${documentoTipo.value}
                                    Nº ${documento.value}, requiere un total de ${Math.floor(formulaCalculo)} kcal
                                    para el sostenimiento de su TBM y el paciente pertece al grupo poblacional: ${grupoPoblacional}
                                </p>
                            </div>`

}

if (edad.value && peso.value && altura.value) {
    mostrarMensajeDeError('Por favor llenar todos los campos')
}




//Formula hombres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5
//Formula mujeres: valor actividad x (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div'); //<div>
    divError.className = 'd-flex justify-content-center align-items-center h-100'; //<div clas
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}


// Animaciones
function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';

    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;

    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
