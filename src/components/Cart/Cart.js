import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    //const total = cart.reduce((total, product) =>total + product.price, 0);
    let total = 0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i];
        total = total + product.price * product.quantity;
        debugger;
    }

    let shipping = 0;
    if(total>35){
       shipping = 0;
    }
    else if(total>15){
       shipping = 4.99;
    }
    else if(total>0){
      shipping = 12;
    }
    const grandTotal = (total+shipping).toFixed(2);
    return (
        <div>
            <h4>Cart Summary</h4>
            <p>Item Order: {cart.length}</p>
            <p>Price: {(total).toFixed(2)}</p>
            <p>Shipping: {shipping}</p>
            <p>Total Price: {grandTotal}</p>
            <br/>
            {
              props.children
            }
        </div>
    );
};

export default Cart;