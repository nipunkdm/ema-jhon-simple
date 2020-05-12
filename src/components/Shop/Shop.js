import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
       const saveCart = getDatabaseCart();
       const productKey = Object.keys(saveCart);
       const previousKey = productKey.map( existingKey =>{
            const product = fakeData.find(pd=> pd.key === existingKey);
            product.quantity = saveCart[existingKey];
            return product;
       })
       //console.log(productKey);
    },[])

    const handleAddProduct = (product) =>{
        //console.log('Add cart', product);
        //const newCart = [...cart, product];
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd=>pd.key !== toBeAdded);
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        

        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className="review-container">
             <div className="product-container">
                 <ul>
                    {
                        products.map(pd=><Product
                            key = {pd.key} 
                            showAddToCart={true}
                            product={pd}
                            handleAddProduct = {handleAddProduct}
                            >
                            </Product>)
                    }
                 </ul>
             </div>
             <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
                </Cart>
             </div>
        </div>
    );
};
export default Shop;