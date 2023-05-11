const socket = io();
// Muestro la lista de productos obtenidos a traves de websockets en tiempo real
socket.on('products', (products) => {
    console.log(products)
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${product.title} - ${product.description} - ${product.price} - ${product.thumbnail} - ${product.code} - ${product.stock}`;
        productList.append(listItem);
    });
});


//Agrego un nuevo producto en tiempo real y tambien lo envio al servidor para que se actualice
const newProductForm = document.getElementById('newProductForm');
newProductForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('productTitle').value;
  const description = document.getElementById('productDescription').value;
  const price= document.getElementById('productPrice').value
  const thumbnail= document.getElementById('productThumbnail').value
  const code = document.getElementById('productCode').value
  const stock = document.getElementById('productStock').value
  const newProduct = { title, description, price, thumbnail, code, stock };

  socket.emit('newProduct', newProduct);

  newProductForm.reset();
});
