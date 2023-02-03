import React, { useEffect } from 'react';
import logo from '../../logo.svg';
import '../../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../../redux/actions/productAction'

import ProductList from '../../component/ProductList/ProductList';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';

function Home() {

    const data = useSelector(state => state.products.data)
    const loading = useSelector(state => state.products.loading)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadProducts())
    }, [])

    return (
        <>
            <Header></Header>
            <main className="home">
                <div id="A"></div>
                <div className="home-hot-products">
                    <div className="section-title">
                        <div className="text-1">AGL Menu</div>
                        <div className="text-2">Sản Phẩm Nổi Bật</div>
                        <div className="icon-bottom-title"></div>
                    </div>
                    <div className="section-content container">
                        {loading ?
                            <img src={logo} className="App-logo" alt="logo" />
                            :
                            <>
                                <ProductList data={data}></ProductList>
                            </>
                        }
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>


    );
}

export default Home;