let cart;

if (Storage && sessionStorage.getItem('cart')) {
  cart = JSON.parse(sessionStorage.getItem('cart'));
  console.log('storage have item')
  console.log(cart);

  if (cart.length > 0) {
    document.querySelector('.empty').style.display = 'none';
    document.querySelector('.cart').style.display = 'block';
  } else {
    document.querySelector('.empty').style.display = 'block';
    document.querySelector('.cart').style.display = 'none';
  }
}