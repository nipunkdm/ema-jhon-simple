import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import HappyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    
    const [orderPlace, setOrderPlace] = useState(false);

    const handlePlaceOrder = () =>{
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }

    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const cartProducts = productKey.map( key => {
              const product = fakeData.find(pd => pd.key === key);
              product.quantity = saveCart[key];
              return product;
        });
        setCart(cartProducts);
    }, []);
    
    let thankYou;
    if(orderPlace){
        thankYou = <img src={HappyImage} alt=""/>;
    } 

    return (
        <div className="review-container">
            <div className="product-container">
                {
                    cart.map(pd=><ReviewItem 
                        product={pd}
                        removeProduct = {removeProduct}
                        key = {pd.key}
                        >
                        </ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="main-button" onClick={handlePlaceOrder}>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;