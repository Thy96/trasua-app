import React, { useState } from 'react';
import logo from '../../logo.svg';
import '../../App.css';

import classNames from 'classnames/bind'
import style from './ProductList.module.scss'
import ProductDetail from '../ProductDetail/ProductDetail';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';
import ProductCart from '../ProductCart/ProductCart';
import ProductOrder from '../ProductOrder/ProductOrder';
import { loadProducts } from '../../redux/actions/productAction';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(style)

function ProductList({ data, loading, category, value, handleChange, showPopUpCart, setShowPopUpCart, showPopUpOrder, setShowPopUpOrder }) {
    const [showPopUp, setShowPopUp] = useState(false)
    const [showProductDetail, setShowProductDetail] = useState([])

    const dispatch = useDispatch()

    function onShowProductDetail(product) {
        setShowPopUp(!false)
        setShowProductDetail(product)
    }

    const closePopupCart = () => {
        dispatch(loadProducts(value))
        setShowPopUpCart(false)
    }

    const closePopupOrder = () => {
        setShowPopUpOrder(false)
    }

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            {
                                category?.map(cate => (
                                    <Tab label={cate.name === 'trasua' ? 'Trà Sữa' : cate.name === 'tra' ? 'Trà' : ''} value={cate.name} />
                                ))
                            }
                        </TabList>
                    </Box>
                </TabContext>
            </Box>
            {
                (loading ?
                    <img src={logo} className="App-logo" alt="logo" />
                    :

                    (data && data.length > 0) ?
                        <>

                            <div className={cx('product-flex', 'list-product')}>
                                {
                                    data.map((product, index) => (
                                        <>
                                            <div key={index} className={cx('product-box', 'product-card')}>
                                                <figure className="img-wrap"><img src={product.image} alt={product.name} /></figure>
                                                <div className='product-card-content'>
                                                    <div className="product-title">{product.name}</div>
                                                    <div className="product-price">
                                                        <div className="product-origin-price">Giá {product.price.toLocaleString()}đ</div>
                                                    </div>
                                                    <button className={cx('btn-detail', 'btn-order-product')}
                                                        onClick={() => onShowProductDetail(product)}>
                                                        Xem Chi tiết
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                            <ProductCart showPopUpCart={showPopUpCart} closePopupCart={closePopupCart} value={value}></ProductCart>
                            <ProductOrder showPopUpOrder={showPopUpOrder} closePopupOrder={closePopupOrder}></ProductOrder>
                            <ProductDetail showPopUp={showPopUp} setShowPopUp={setShowPopUp} showProductDetail={showProductDetail} value={value}></ProductDetail>
                        </>
                        : <div style={{ fontSize: '20px', textAlign: 'center', height: '300px', paddingTop: '150px' }}>Data is empty</div>
                )
            }
        </>
    );
}

export default ProductList;