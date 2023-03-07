// const getProducts = () => {
//     fetch('../data/stock.json')
//         .then((resp) => resp.json())
//         .then(data => {
//             pintarProductos(data)
//         })
// };

// getProducts()


fetch('../data/stock.json')
    .then((respuesta) => respuesta.json())
    .then(data => {
        pintarProductos(data)
    })