import React, { useState, useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import HappyImage from '../../images/giphy.gif';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {
    const [cart, setCart] = useState([]);
    
    const [orderPlace, setOrderPlace] = useState(false);

    const auth = useAuth();

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
                {
                    !cart.length && <h2 className="text-center">Cart is empty</h2>
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="Shipment">
                        {
                            auth.user ?
                            <button className="main-button">Proceed Checkout</button>
                            :
                            <button className="main-button">Login To Proceed</button>
                        }
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;