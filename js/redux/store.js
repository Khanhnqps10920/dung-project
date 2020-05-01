console.log(window.Redux);


// creat store
const {
  createStore
} = window.Redux;


// initial state
const initialState = JSON.parse(sessionStorage.getItem('cart')) || [];

const rootReducer = (state = initialState, action) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case 'ADD_TO_CART': {
      const cart = [...state];
      const cartItemIndex = cart.findIndex((item) => {
        return item.id === payload.id
      })


      if (cartItemIndex !== -1) {
        // handle add quantity
        cart[cartItemIndex] = {
          ...cart[cartItemIndex],
          quantity: cart[cartItemIndex].quantity + payload.quantity
        }

      } else {
        //handle newItem
        cart.push(payload);
      }

      return cart;
    }

    case 'ADD_ONE_ITEM_TO_CART': {
      const cart = [...state];
      const cartItemIndex = cart.findIndex((item) => {
        return item.id === payload.id
      })


      if (cartItemIndex !== -1) {
        // handle add quantity
        cart[cartItemIndex] = {
          ...cart[cartItemIndex],
          quantity: cart[cartItemIndex].quantity + 1
        }

      } else {
        //handle newItem
        cart.push(payload);
      }

      return cart

    }

    case 'REMOVE_ONE_ITEM_FROM_CART': {
      const cart = [...state];
      // find item index
      const cartItemIndex = cart.findIndex((item) => {
        return item.id === payload.id
      })

      if (cartItemIndex !== -1) {

        // check if quantity > 1 
        if (cart[cartItemIndex].quantity > 1) {
          cart[cartItemIndex] = {
            ...cart[cartItemIndex],
            quantity: cart[cartItemIndex].quantity - 1
          }
        } else {
          cart.splice(cartItemIndex, 1);
        }


      }


      return cart
    }

    case 'REMOVE_ITEM_FROM_CART': {
      const cart = [...state];
      // find item index
      const cartItemIndex = cart.findIndex((item) => {
        return item.id === payload.id
      })

      if (cartItemIndex !== -1) {
        cart.splice(cartItemIndex, 1);
      }

      return cart;
    }

    case 'REMOVE_CART': {
      return [];
    }

    default:
      return state;
  }


}


const store = createStore(rootReducer);

store.subscribe(() => {
  console.log('STATE UPDATE !', store.getState());
  const cart = store.getState();





  if (cart.length < 1) {
    document.querySelector('.empty').style.display = 'block';
    document.querySelector('.cart').style.display = 'none';
  } else {
    // handle quantity
    const cartQuantity = document.querySelector('.cart-total');
    if (cartQuantity) {
      cartQuantity.textContent = cart.reduce((prev, curr) => {
        return prev + curr.quantity
      }, 0)
    }

    // handle cart total

    const totalMoney = cart.reduce((prev, curr) => {
      return prev + curr.quantity * curr.price
    }, 0)



    const mechandisePrice = document.querySelector('.mechandise-price.price');
    if (mechandisePrice) {
      mechandisePrice.textContent = `$${totalMoney}`
    }
    const orderToTal = document.querySelector('#orderTotal');
    if (orderToTal) {
      orderToTal.textContent = `$${totalMoney}`;
    }
    // build cart item

    renderCartItems(cart);

  }


  sessionStorage.setItem('cart', JSON.stringify(cart));
})

// render cart items

const renderCartItems = (cartItems) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) return;

  const cartElement = document.querySelector('.cart__items');

  if (!cartElement) return;

  // remove all element
  cartElement.innerHTML = " ";

  const totalCart = cartItems.reduce((prev, curr) => {
    return prev + curr.quantity
  }, 0)


  // create cart tittle
  const cartTitle = document.createElement('h2');
  cartTitle.classList.add('cart__title');
  cartTitle.textContent = `${totalCart}Items `;
  cartElement.appendChild(cartTitle);
  console.log(cartTitle.textContent);

  //create cart item
  for (const item of cartItems) {
    const cartItemElement = buildCartItemElement(item);
    cartElement.appendChild(cartItemElement);
  }

}

// build cart item
const buildCartItemElement = (item) => {
  const cartItemTemplate = document.querySelector('#cartItemTemplate')

  if (!cartItemTemplate) return;

  const cartItemFragment = cartItemTemplate.content.cloneNode(true);

  const cartItemElement = cartItemFragment.querySelector('.cart__items-item');

  // quantity
  const cartItemQuantity = cartItemElement.querySelector('#quantity');
  cartItemQuantity.textContent = item.quantity;
  // name
  const cartItemName = cartItemElement.querySelector('.cart__info-name span');
  cartItemName.textContent = item.name;
  // price
  const cartItemPrice = cartItemElement.querySelector('.cart__info-price span');
  cartItemPrice.textContent = item.price * item.quantity + '$' + `( ${item.price}$ per 1)`;


  // minus btn

  const minusBtn = cartItemElement.querySelector('.minus');
  if (item.quantity === 1) {
    minusBtn.disabled = true;
  }
  minusBtn.addEventListener('click', () => {

    store.dispatch({
      type: 'REMOVE_ONE_ITEM_FROM_CART',
      payload: item
    })

  })

  // plus btn
  const plusBtn = cartItemElement.querySelector('.plus');
  plusBtn.addEventListener('click', () => {

    store.dispatch({
      type: 'ADD_ONE_ITEM_TO_CART',
      payload: item
    })

  })

  const removeBtn = cartItemElement.querySelector('.close');
  removeBtn.addEventListener('click', () => {
    const confirmMess = 'Do u want remove this item ?';
    if (window.confirm(confirmMess)) {

      store.dispatch({
        type: 'REMOVE_ITEM_FROM_CART',
        payload: item
      })
    }
  })


  return cartItemElement
}


const handleAddToCart = (item) => {

  const action = {
    type: 'ADD_TO_CART',
    payload: item
  }

  store.dispatch(action);
}





// handle add to cart detail
const addToCartBtn = document.querySelector('#addToCart');




if (addToCartBtn) {


  addToCartBtn.addEventListener('click', (e) => {


    const {
      dataset: {
        id,
        name,
        images,
        price
      }
    } = addToCartBtn;

    const detailQuantity = document.querySelector('#detailQuantity');

    const quantity = Number(detailQuantity.textContent);

    const item = {
      id,
      name,
      images,
      price: Number(price),
      quantity
    }

    handleAddToCart(item);
  })
}


// handle quantity

// minus
const detailBtnMinus = document.querySelector('.detail__info-quantity-btn.minus');

// plus
const detailBtnPlus = document.querySelector('.detail__info-quantity-btn.plus');

// quantity



if (detailBtnPlus && detailBtnMinus) {

  detailBtnMinus.addEventListener('click', () => {

    const detailQuantity = document.querySelector('#detailQuantity');

    let quantity = Number(detailQuantity.textContent);

    const totalQuantity = handleMinusClick(quantity, detailBtnMinus);

    if (totalQuantity >= 1) {
      detailQuantity.textContent = totalQuantity;
    } else {
      detailBtnMinus.disabled = true;
    }


  })


  detailBtnPlus.addEventListener('click', () => {

    const detailQuantity = document.querySelector('#detailQuantity');

    const quantity = Number(detailQuantity.textContent);

    const totalQuantity = handlePlusClick(quantity, detailBtnMinus);

    detailQuantity.textContent = totalQuantity;


  })
}


// handle minus
const handleMinusClick = (quantity) => {

  return quantity - 1;
}

// handle plus
const handlePlusClick = (quantity, minusBtn) => {

  minusBtn.removeAttribute('disabled');


  return quantity + 1
}