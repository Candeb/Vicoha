// DOM
// header-container

// Contenedor de productos donde se van a renderizar (tienda)
const products = document.querySelector('.products-container');
// container de cada producto
const containerProduct = document.querySelectorAll('.product');
// // // boton comprar de cada producto
const btnShop = document.querySelectorAll('.btn-shop');
// Contenedor de productos destacados donde se van a renderizar
const featured = document.querySelector('.products-destacados-container');
// Categorias que se van a ir pulsando y se van a aplicar los filtros
const categories = document.querySelector('.categoryContainer');
// Lista de categorías
const categoryList = document.querySelectorAll('.category');
// Con esto modificamos el nombre de la sección elegida en categorías (por defecto es los más populares)
const tituloCategoria = document.querySelector('.prodSubTitle');
// icono de menu hamburguesa
const iconOpenMenu = document.querySelector('.icon-menu');
// contenedor para el menu
const menuContainer = document.querySelector('.navbar');
// menu
const menu = document.querySelector('.bars-menu');
// cerrar el menu
const iconExitMenu = document.querySelector('.icon-exit');
// abrir menu usuario
const iconUser = document.querySelector('.btn-user');
// menu usuario
const userMenu = document.querySelector('.user-menu');
// Abrir el carrito
const cartButton = document.querySelector('.btn-cart');
// Cerrar carrito
const cartHidden = document.querySelector('.btn-closeCart');
// Carrito
const cartShop = document.querySelector('.cart');
// Overlay
const divOverlay = document.querySelector('.overlay');
// Contenedor de productos del carrito
const productsCart = document.querySelector('.cart-productsContainer');
// span a rellenar con el subtotal
const subtotal = document.querySelector('.subtotal');
// span a rellenar con el total
const total = document.querySelector('.total');
// boton comprar
const buyBtn = document.getElementById('btn-buy');
// boton agregar
const addBtn = document.querySelector('.btn-shop');
// detalle $ carrito
const cartDetail = document.querySelector('.cart-costoInfo');
// header
const header = document.querySelector('.header');
// div donde se muestra el producto agregado
const productModal = document.querySelector('.addProductModal');
//boton para ver mas productos que cierre el cart al apretarlo
const verMasProd = document.querySelector('.btn-verMas');

// lo que va a tener el carrito, vacío o lo del LS
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// guardar el carrito al LS
const saveToLS = (fullCart) => {
  localStorage.setItem('cart', JSON.stringify(fullCart));
};

//Función que renderiza los productos destacados
const renderFeatured = (product) => {
  const { id, name, image, category, price } = product;

  return `
        <div class="product-destacado animate__animated animate__zoomIn">
              <div class="img-destacado">
                <img src="${image}" alt="${name}" />
              </div>
              <div class="detalles-container">
                <div class="descripcion-destacado">
                  <p class="product-title" id="product-det">${name}</p>
                  <span class="product-price" id="product-det">$${price}</span>
                </div>
                <div class="btn-destacados">
                  <button class="btn-shop" data-id="${id}" data-name="${name}" data-price="${price}" data-image="${image}" data-category="${category}"> Agregar al carrito </button>
                </div>
              </div>
            </div>
    `;
};

// funcion para seleccionar productos al azar

const tresAleatorios = (productsList) => {
  return [...productsList]
    .sort(() => (Math.random() > 0.5 ? 1 : -1))
    .slice(0, 3);
};

// funcion para renderizar los productos seleccionados al azar (Destacados)

const featuredProducts = () => {
  featured.innerHTML = tresAleatorios(productsArray)
    .map(renderFeatured)
    .join('');
};

//Renderiza los productos en la parte de tienda y cuando se vayan aplicando los filtros
const renderProduct = (product) => {
  const { id, name, image, category, price } = product;
  return `
  <div name="product"
  class="product  animate__animated animate__fadeIn"
  >
  <img src="${image}" alt="${name}" />
  <p class="product-title">${name}</p>
  <span class="product-price">$${price}</span>
  <button id="btn-shop"
    class="btn-shop"  data-id="${id}" data-name="${name}" data-price="${price}" data-image="${image}" data-category="${category}"
    
  >
    Agregar al carrito
  </button>
</div>
`;
};

//Función general que recibe un contenedor del DOM y una lista de productos
const renderProducts = (contenedor, productsList, category) => {
  if (category === 'populares') {
    let populares = productsList.filter((product) => {
      return product.isPopular;
    });
    contenedor.innerHTML = populares.map(renderProduct).join('');
  } else {
    contenedor.innerHTML = productsList.map(renderProduct).join('');
  }
};

//Esta función lo que hará será manejar los filtros por categoría, haciendo que solamente se muestren los productos deseados
const filterCategory = (e) => {
  if (!e.target.classList.contains('category')) {
    return;
  } else if (e.target.dataset.category === 'Populares') {
    tituloCategoria.innerHTML = e.target.dataset.category;
    renderProducts(products, productsArray, 'Populares');
    return;
  }

  let categoriaElegida = productsArray.filter((product) => {
    return product.category === e.target.dataset.category;
  });

  if (categoriaElegida.length === 0) {
    products.innerHTML = 'Coming Soon';
    tituloCategoria.innerHTML = 'Hexagono';
  } else {
    tituloCategoria.innerHTML = e.target.dataset.category;

    renderProducts(products, categoriaElegida, e.target.dataset.category);
  }
};

// Funciones para abrir y cerrar menu hamburguesa

const closeMenu = (e) => {
  if (e.target.classList.contains('active')) return;
  menu.classList.toggle('active');
  divOverlay.classList.toggle('show-overlay');
};

const toggleMenu = () => {
  menu.classList.toggle('active');
  divOverlay.classList.toggle('show-overlay');
  userMenu.classList.add('hidden');
};

const closeOnScrollMenu = () => {
  if (!menu.classList.contains('active')) return;
  menu.classList.remove('active');
  divOverlay.classList.remove('show-overlay');
};

const closeOnDivOverlayClickMenu = () => {
  menu.classList.remove('active');
  divOverlay.classList.remove('show-overlay');
};

const showUserMenu = (e) => {
  userMenu.classList.toggle('setActive');
  userMenu.classList.toggle('animation');
};
// Funciones para abrir y cerrar carrito segun corresponda

const closeCart = (e) => {
  if (e.target.classList.contains('cartActive')) return;
  cartShop.classList.toggle('cartActive');
  divOverlay.classList.toggle('show-overlay');
};

const toggleCart = () => {
  cartShop.classList.toggle('cartActive');
  divOverlay.classList.toggle('show-overlay');
  cartShop.style.opacity = '1';
};

const closeOnDivOverlayClick = () => {
  cartShop.classList.remove('cartActive');
  divOverlay.classList.remove('show-overlay');
  cartShop.style.opacity = '0';
};

// Funciones para el manejo del carrito

//Función general que recibe un contenedor del DOM y una lista de productos

const renderCartProduct = (cartProduct) => {
  const { id, name, price, quantity, image } = cartProduct;
  return ` 
  <div class="cart-product animate__animated animate__fadeInRight">
                <img src="${image}" alt="Foto ilustrativa de ${name}" />
                <div class="cart-productDetalle">
                  <h4>${name}</h4>
                  <p>$${price}</p>
                </div>
                <div class="cart-cantidadDetalle">
                  <button class="button btn-menosUno down" data-id="${id}">-</button>
                  <p>${quantity}</p>
                  <button class="button btn-masUno up" data-id="${id}">+</button>
                </div>
</div>   
  `;
};

const renderCart = () => {
  if (!cart.length) {
    productsCart.innerHTML = `
    <p class"empty-cart">Todavía no hay productos en el carrito!</p>`;
    cartDetail.classList.add('hidden');
    disableButton(buyBtn);
    return;
  }
  cartDetail.classList.remove('hidden');
  productsCart.innerHTML = cart.map(renderCartProduct).join('');
};

const calculateTotalCart = () => {
  return cart.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
};

const showSubtotal = () => {
  subtotal.innerHTML = `
  ${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(calculateTotalCart())}`;
};

const showTotal = () => {
  total.innerHTML = `
  ${new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(calculateTotalCart())}`;
};

const disableButton = (button) => {
  if (!cart.length) {
    button.classList.remove('button');
    button.classList.add('disabled');
    return;
  }
  button.classList.remove('disabled');
};

const addUnit = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};
const productData = (id, name, price, image) => {
  return { id, name, price, image };
};

const isExistingCartProduct = (product) => {
  return cart.find((item) => item.id === product.id);
};

const createCartProduct = (product) => {
  cart = [...cart, { ...product, quantity: 1 }];
};

const addProduct = (e) => {
  if (!e.target.classList.contains('btn-shop')) return;
  const { id, name, price, image } = e.target.dataset;

  const product = productData(id, name, price, image);

  if (isExistingCartProduct(product)) {
    addUnit(product);
    showModal(product);
  } else {
    createCartProduct(product);
    showModal(product);
  }
  checkCartState();
};

const showModal = (product) => {
  productModal.classList.remove('hidden');

  setTimeout(() => {
    productModal.classList.add('hidden');
  }, 2000);

  return (productModal.innerHTML = `
    El producto "${product.name}" fue agregado al carrito.
  `);
};
// + y - del carrito

const removeProductFromCart = (existingProduct) => {
  cart = cart.filter((product) => product.id !== existingProduct.id);
  checkCartState();
};

const substractProductUnit = (existingProduct) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === existingProduct.id
      ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
      : cartProduct;
  });
};

const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  if (existingCartProduct.quantity === 1) {
    if (window.confirm('¿Desea eliminar el producto del carrito?')) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }
  substractProductUnit(existingCartProduct);
};

const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  addUnit(existingCartProduct);
};

const handleQuantity = (e) => {
  if (e.target.classList.contains('down')) {
    handleMinusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains('up')) {
    handlePlusBtnEvent(e.target.dataset.id);
  }
  checkCartState();
};

const completarCompra = () => {
  if (!cart.length) return;
  if (window.confirm('¿Deseas finalizar tu compra?')) {
    cart = [];
    window.alert('Compra completada');
    window.location.reload();
  } else {
    window.alert('Su compra no fue completada');
  }
  checkCartState();
  localStorage.removeItem(cartActive);
};

// Función para chequear el estado del carrito una vez realizada alguna manipulación del mismo (añadir producto, quitar producto, comprar o vaciar carrito).
const checkCartState = () => {
  saveToLS(cart);
  renderCart(cart);
  showTotal();
  showSubtotal();
  // adjustCartHeight();
  disableButton(buyBtn);
};

// funcion inicializadora
const init = () => {
  featuredProducts();
  renderProducts(products, productsArray, 'populares');
  categories.addEventListener('click', filterCategory);
  iconOpenMenu.addEventListener('click', toggleMenu);
  iconExitMenu.addEventListener('click', closeMenu);
  window.addEventListener('scroll', closeOnScrollMenu);
  divOverlay.addEventListener('click', closeOnDivOverlayClickMenu);
  iconUser.addEventListener('click', showUserMenu);
  cartButton.addEventListener('click', toggleCart);
  cartHidden.addEventListener('click', closeCart);
  divOverlay.addEventListener('click', closeOnDivOverlayClick);
  document.addEventListener('DOMContentLoaded', renderCart);
  document.addEventListener('DOMContentLoaded', showSubtotal);
  document.addEventListener('DOMContentLoaded', showTotal);
  products.addEventListener('click', addProduct);
  featured.addEventListener('click', addProduct);
  disableButton(buyBtn);
  productsCart.addEventListener('click', handleQuantity);
  buyBtn.addEventListener('click', completarCompra);
  verMasProd.addEventListener('click', closeCart);
  checkCartState();
};

init();
