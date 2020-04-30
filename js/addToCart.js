const addBtn = document.querySelector('#addToCart');

addBtn.addEventListener('click', (e) => {

  if (Storage && sessionStorage.getItem('cart')) {

    let cart = JSON.parse(sessionStorage.getItem('cart'));

    cart.push({
      id: Math.random() * 100,
      name: 'test'
    });

    console.log(cart);

    sessionStorage.setItem('cart', JSON.stringify(cart));
  } else {
    const newCart = [{
      id: Math.random() * 100,
      name: 'first Item'
    }];

    console.log(newCart);
    sessionStorage.setItem('cart', JSON.stringify(newCart));

  }

})

console.log(window.Redux, window.Storage);