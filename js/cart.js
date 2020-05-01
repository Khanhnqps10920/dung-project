const cart = store.getState();

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
    document.querySelector('#orderTotal').textContent = `$${totalMoney}`;

    renderCartItems(cart);


  } else {
    document.querySelector('.empty').style.display = 'block';
    document.querySelector('.cart').style.display = 'none';
  }
}


const checkOutBtn = document.querySelector('.check-out-btn');

if (checkOutBtn) {
  checkOutBtn.addEventListener('click', () => {

    window.location = window.location.href + '#success';
    window.location.reload(true);
  })
}




if (location.hash.substr(1) === 'success') {
  store.dispatch({
    type: 'REMOVE_CART',
  })
}