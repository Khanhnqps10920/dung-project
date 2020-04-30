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

    default:
      return state;
  }


}


const store = createStore(rootReducer);

store.subscribe(() => {
  console.log('STATE UPDATE !', store.getState());

  sessionStorage.setItem('cart', JSON.stringify(store.getState()));
})

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