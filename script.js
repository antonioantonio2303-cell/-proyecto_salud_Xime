let registros = JSON.parse(localStorage.getItem('registros')) || [];


function calcularIMC(peso, talla) {
return peso / (talla * talla);
}


function clasificar(imc) {
if (imc < 18.5) return 'Bajo peso';
if (imc < 25) return 'Normal';
if (imc < 30) return 'Sobrepeso';
return 'Obesidad';
}


function guardarLocal() {
localStorage.setItem('registros', JSON.stringify(registros));
}


function irDetalle(i){
localStorage.setItem('detalleSeleccionado', JSON.stringify(registros[i]));
window.location.href = 'detalle.html';
}


function mostrar() {
const tabla = document.getElementById('tabla');
tabla.innerHTML = '';


registros.forEach((r, i) => {
tabla.innerHTML += `
<tr>
<td>${r.nombre}</td>
<td>${r.apellidos}</td>
<td>${r.edad}</td>
<td>${r.peso}</td>
<td>${r.talla}</td>
<td>${r.imc.toFixed(2)}</td>
<td><a href="#" onclick="irDetalle(${i})">${r.clasificacion}</a></td>
<td>${r.direccion}</td>
<td>
<button class="editar" onclick="editar(${i})">Modificar</button>
<button class="eliminar" onclick="eliminar(${i})">Eliminar</button>
</td>
</tr>`;
});
}
function eliminar(i) {
if (confirm('¿Seguro que deseas eliminar este registro?')) {
registros.splice(i, 1);
guardarLocal();
mostrar();
}
}


function editar(i) {
const r = registros[i];
nombre.value = r.nombre;
apellidos.value = r.apellidos;
edad.value = r.edad;
peso.value = r.peso;
talla.value = r.talla;
direccion.value = r.direccion;
registros.splice(i, 1);
guardarLocal();
mostrar();
}


formulario.addEventListener('submit', e => {
e.preventDefault();
const imc = calcularIMC(+peso.value, +talla.value);


registros.push({
nombre: nombre.value,
apellidos: apellidos.value,
edad: edad.value,
peso: peso.value,
talla: talla.value,
direccion: direccion.value,
imc: imc,
clasificacion: clasificar(imc)
});


guardarLocal();
formulario.reset();
mostrar();
});


mostrar();
