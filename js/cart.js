const cart = store.getState();
console.log(cart);

// check storage
if (cart) {
  console.log('storage have item')


  if (cart.length > 0) {

    // handle cart total
    const totalItems = cart.reduce((prev, curr) => {
      return prev + curr.quantity
    }, 0)


    // handle cart total
    const totalMoney = cart.reduce((prev, curr) => {
      return prev + curr.quantity * curr.price
    }, 0)



    document.querySelector('.empty').style.display = 'none';
    document.querySelector('.cart').style.display = 'block';



    document.querySelector('.mechandise-price.price').textContent = `$${totalMoney}`;
    document.querySelector('.cart__title').textContent = totalItems + ' Items ';
    document.querySelector('#orderTotal').textContent = `$${totalMoney}`;


  } else {
    document.querySelector('.empty').style.display = 'block';
    document.querySelector('.cart').style.display = 'none';
  }
}