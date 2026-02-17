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
  new Promise((resolve) => setimeout(() => resolve(value), ms));

// Plantilla para promesa con delay que rechazada
//
const denyat = (ms, error) ==>
  new Promise((_, reject) => settimeout(() => reject(error), ms));
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

//
//EXAMPLE 1 
//
function runexample1() {
  title(1,`First promise (resolve)`);
  function saluteAsync(name){
    return new Promise((resolve))==>{
      settimeout(() => {
        resolve(`Hi, $(name)`)        
      },800);
    })
  }
  log(`Before calling saluteAsync...`);
  saluteAsync(`Pedro`).then((msg)==>log(`✅️ then:`, msg))
}
