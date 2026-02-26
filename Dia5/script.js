//Una promesa es un objeto que representa la eventual finalizacion o falta de una operacion
//asincronica
//
//'Te prometo entregar algo'
//Si cumplo hago algo -> Resultado
//Si no cumplo -> Error
//
//
//
//Estados de una promesa:
//1. Pending (Pendiente) : Aun no se resolvio ni fallo
//2. Fullfilled (cumplida) : Ya tenemos un valor para usar
//3. Rejected (rechazada) : Ya tiene un motivo de error
//
// # Ciclo de vida de una promesa
//
// 1. Nace en pendiente --> pasara una sola vez a fulfilled o rejected --> quedara en 'asentada'
// (settled), donde no cambiara jamas ==> evitar doble entrega
//
//
// Plantilla para promesa con dela que RESUELVE
//
const Solveat = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

// Plantilla para promesa con delay que rechazada
//
const denyat = (ms, error) =>
  new Promise((_, reject) => setTimeout(() => reject(error), ms));
//
//
//
//
// utilities
const log = (...args) => console.log(...args);

const title = (n, name) => {
  log("\n" + "=".repeat(50));
  log(`EXAMPLE ${n}: ${name}`);
  log("=".repeat(50));
};

const wait1 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


//Example n1
function verificarNumerosAsync(numero) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (numero % 2 === 0) {
        resolve(`Numero valido`);
      } else {
        reject(new Error(`Numero es invalido`));
      }
    }, 500);
  });
}

verificarNumerosAsync(4)
  .then((res) => console.log(res))
  .catch((res) => console.log(err.message))

verificarNumerosAsync(7)
  .then((res) => console.log(res))
  .catch((res) => console.log(err.message))

fetch(`https://www.dnd5eapi.co/api/2014/monsters`)
.then(response => response.json())
.then(data=>{
  console.log(data[`results`][0]);
});