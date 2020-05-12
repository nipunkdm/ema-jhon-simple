import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';
const Product = (props) => {
    const { img, name, price, seller, stock, key } = props.product;
    //console.log(props);
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h3 className="product-name"><Link to={"/product/"+key}>{name}</Link></h3>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <br />
                <p><small>Only {stock} left in stock - Order soon</small></p>
                {props.showAddToCart && <button onClick={() => props.handleAddProduct(props.product)} className="main-button"><FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;