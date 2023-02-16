// Array para el carrito de compras
const carrito = []

// Ordenar productos de menor a mayor
const ordenarMenorMayor = () => {
    productos.sort((a, b) => a.precio - b.precio)
    mostrarListaOrdenada()
};

// Ordenar productos de mayor a menor
const ordenarMayorMenor = () => {
    productos.sort((a, b) => b.precio - a.precio)
    mostrarListaOrdenada()
};

const mostrarListaOrdenada = () => {
    const listaDeProductos = productos.map(producto => {
        return '- '+producto.nombre+' $'+producto.precio
    })
    alert('Lista de precios:'+'\n\n'+listaDeProductos.join('\n'))
    comprarProductos(listaDeProductos)
};

const comprarProductos = (listaDeProductos) => {
    let productoNombre = ''
    let productoCantidad = 0
    let otroProducto = false

    do {
        productoNombre = prompt('¿Qué producto desea comprar?'+'\n\n'+listaDeProductos.join('\n'))
        productoCantidad = parseInt(prompt('¿Cuántos queres comprar?'))

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase())

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto no se encuentra en el catálogo!')
        }

        otroProducto = confirm('Desea agregar otro producto?')
    } while (otroProducto);

    confirmarCompra()
};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad
    }
};

const eliminarProductoCarrito = (nombreProductoAEliminar) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === nombreProductoAEliminar.toLowerCase()) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

const confirmarCompra = () => {
    const listaProductos = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad
    })

    const isCheckout = confirm('Checkout: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar un producto del carrito'
    )

    if (isCheckout) {
        finalizarCompra(listaProductos)
    } else {
        const nombreProductoAEliminar = prompt('Ingrese el nombre del producto a eliminar:')
        eliminarProductoCarrito(nombreProductoAEliminar)
    }
};

const finalizarCompra = (listaProductos) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.cantidad * item.precio), 0)
    alert('Detalle de su compra: '
        +'\n\n'+listaProductos.join('\n')
        +'\n\nTotal de productos: '+cantidadTotal
        +'\n\nEl total de su compra es: '+precioTotal
        +'\n\nGracias por su compra!'
    )
};

const comprar = () => {
    const productosBaratos = confirm('¿Querés ordenar la lista de productos del mas barato al mas caro?')

    if (productosBaratos) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};


//comprar()

// // EJEMPLO DESAFÍO ENTREGABLE

// const comprarProductos = () => {
//     let producto = '';
//     let cantidad = 0;
//     let precio = 0;
//     let totalCompra = 0;
//     let seguirComprando = false;

//     do {
//         producto = prompt ("Selecciona el producto a comprar del 1 al 9");
//         cantidad = parseInt(prompt ("¿Cuántos querés comprar?"));

//         let cantidadValidada = validarCantidad(cantidad);

//         switch (producto) {
//             case "1":
//                 precio = 600;
//                 break;
//             case "2":
//                 precio = 750;
//                 break;
//             case "3":
//                 precio = 500;
//                 break;
//             case "4":
//                 precio = 200;
//                 break;
//             case "5":
//                 precio = 1500;
//                 break;
//             case "6":
//                 precio = 500;
//                 break;
//             case "7":
//                 precio = 1000;
//                 break;
//             case "8":
//                 precio = 500;
//                 break;
//             case "9":
//                 precio = 100;
//                 break;
//             default:
//                 alert("Alguno de los datos ingresados no es correcto");
//                 precio= 0;
//                 cantidad= 0;
//         }

//         totalCompra += precio * cantidadValidada;
//         seguirComprando = confirm("¿Querés agregar otro producto?");

//     } while (seguirComprando){

//         const totalConDescuento = aplicarDescuento(totalCompra);
//         const totalConEnvio = calcularEnvio(totalConDescuento);
    
//         return totalConEnvio;
//     }
// }

// const validarCantidad = (cantidad) => {
//     while (Number.isNaN(cantidad) || cantidad === 0) {
//         if (cantidad !== 0) {
//             alert('Deber agregar un número.')
//         } else {
//             alert('Debe agregar un número distinto de cero.')
//         }
//         cantidad = parseInt(prompt ("¿Cuántos querés comprar?"));
//     }

//     return cantidad;
// };

// const aplicarDescuento = (totalCompra) => {
//     let totalConDescuento = 0;

//     if (totalCompra >= 5000) {
//         totalConDescuento = totalCompra * 0.80;
//         return totalConDescuento;
//     } else {
//         return totalCompra;
//     }
// }

// const calcularEnvio = (totalCompra) => {
//     let tieneEnvioADomicilio = false;

//     tieneEnvioADomicilio = confirm("¿Querés envío a domicilio?");

//     if (tieneEnvioADomicilio && totalCompra >= 2000) {
//       alert("Tenés envio gratis. El total de tu compra es $" + totalCompra);
//     } else if (tieneEnvioADomicilio && totalCompra < 2000 && totalCompra !== 0) {
//       totalCompra += 700;
//       alert("El envío cuesta $700. El total de tu compra es $" + totalCompra);
//     } else {
//       alert("El total de tu compra es $" + totalCompra);
//     }

//     return totalCompra;
// }

// function calcularCantidadDeCuotas() {
//     let cuotas = 0;
//     let tieneCuotas = false;

//     tieneCuotas = confirm("¿Querés pagar en cuotas?");

//     if(tieneCuotas) {
//         cuotas = parseInt(prompt("¿En cuántas cuotas querés pagar?"));
//         if (cuotas === 0){
//             cuotas = 1;
//         }else if (Number.isNaN(cuotas)){
//             calcularCantidadDeCuotas();
//         }
//     }else {
//         cuotas = 1;
//     }

//     return cuotas;
// };

// function calcularIntereses (cuotas) {
//     let tasa = 12.3;
//     let sinIntereses = 0;
//     let tasaTotal = 0;
//     let interesesTotales = 0;

//     if (cuotas === 1){
//         return sinIntereses;
//     }else{
//         tasaTotal = tasa + cuotas * 0.2;
//         interesesTotales = tasaTotal * cuotas;
//         return interesesTotales;
//     }
// }

// function calcularTotalAPagar (totalCompra, cuotas, intereses) {
//     totalCompra = (totalCompra + intereses)
//     let valorCuota = totalCompra / cuotas;
//     alert ("El total a pagar es $"+totalCompra+" en "+cuotas+" cuotas de $"+valorCuota.toFixed(2));
// }

// // Invocamos a la función comprarProductos() para obtener el precio total de la compra.
// function comprar() {
//     const totalCompra = comprarProductos();
//     // Calculamos la cantidad de cuotas.
//     const cuotas = calcularCantidadDeCuotas();
//     // Calculamos los intereses.
//     const intereses = calcularIntereses(cuotas);

//     // Calculamos el total a pagar y mostramos un mensaje al usuario.
//     calcularTotalAPagar(totalCompra, cuotas, intereses);
// }