import React, { useEffect, useState } from 'react';


import classNames from 'classnames/bind'
import style from './ProductList.module.scss'
import ProductDetail from '../ProductDetail/ProductDetail';
import ProductCart from '../../component/ProductCart/ProductCart';

const cx = classNames.bind(style)

function ProductList({ data }) {
    const [showPopUp, setShowPopUp] = useState(false)
    const [showProductDetail, setShowProductDetail] = useState([])
    const [orderListCart, setOrderListCart] = useState([])

    function onShowProductDetail(product) {
        setShowPopUp(!false)
        setShowProductDetail(product)
    }

    useEffect(() => {
    }, [orderListCart])
    console.log("product list ", orderListCart);

    return (
        <>
            {
                (data && data.length > 0) ?
                    <>
                        <div className={cx('product-flex', 'list-product')}>
                            {
                                data.map((product, index) => (
                                    <>
                                        <div key={index} className={cx('product-box', 'product-card')}>
                                            <figure className="img-wrap"><img src={product.url} alt={product.name} /></figure>
                                            <div className='product-card-content'>
                                                <div className="product-title">{product.name}</div>
                                                <div className="product-price">
                                                    <div className="product-origin-price">Giá {product.price.toLocaleString()}đ</div>
                                                </div>
                                                <button className={cx('btn-detail', 'btn-order-product', 'btn-order-product')} onClick={() => onShowProductDetail(product)}>Xem Chi tiết</button>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }
                        </div>

                        <ProductDetail showPopUp={showPopUp} setShowPopUp={setShowPopUp} showProductDetail={showProductDetail} callbackOrderSuccess={(value) => setOrderListCart(value)}></ProductDetail>
                        <ProductCart orderListCart={orderListCart}></ProductCart>
                    </>
                    : <div>Data is empty</div>
            }
        </>
    );
}

export default ProductList;