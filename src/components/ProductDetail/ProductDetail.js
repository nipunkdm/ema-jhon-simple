import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const{productkey} = useParams();
    const detail = fakeData.find(pd=> pd.key === productkey);
    //console.log(detail); 
    return (
        <div>
            <h2>{productkey} Product Detail</h2>
            <Product showAddToCart={false} product={detail}></Product>
        </div>
    );
};

export default ProductDetail;