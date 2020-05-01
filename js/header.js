window.onscroll = () => {
  const header = document.querySelector('header');
  if (header) {
    const info = header.querySelector('.navbar');

    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      header.classList.add('scrolling');
    } else {
      header.classList.remove('scrolling');
    }
  }
}


const cartQuantity = document.querySelector('.cart-total');

const cartItems = JSON.parse(sessionStorage.getItem('cart'));
cartQuantity.textContent = cartItems.reduce((prev, curr) => {
  return prev + curr.quantity
}, 0)
