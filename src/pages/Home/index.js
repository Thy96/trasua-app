import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts } from '../../redux/actions/productAction'
// import { loadCategorys } from '../../redux/actions/categoryAction';

import ProductList from '../../component/ProductList/ProductList';
import Header from '../../component/Header/Header';
import Footer from '../../component/Footer/Footer';

const category = [{
    _id: "1",
    name: 'trasua'
},
{
    _id: "2",
    name: 'tra',
}]
function Home() {

    const [value, setValue] = useState('trasua');
    const [valueToken, setValueToken] = useState('')
    const [valueUserID, setValueUserID] = useState('')

    const [showPopUpCart, setShowPopUpCart] = useState(false)
    const [showPopUpOrder, setShowPopUpOrder] = useState(false)

    const data = useSelector(state => state.products.data)
    const loading = useSelector(state => state.products.loading)

    // const category = useSelector(state => state.categorys.data)

    const dispatch = useDispatch()

    const handleChange = (event, newValue) => {
        dispatch(loadProducts(newValue))
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(loadProducts(value))
        // dispatch(loadCategorys())
    }, [])

    return (
        <>
            <Header callbackToken={(e) => setValueToken(e)} callbackUserID={(e) => setValueUserID(e)} valueToken={valueToken} valueUserID={valueUserID} setShowPopUpCart={setShowPopUpCart} showPopUpOrder={showPopUpOrder} setShowPopUpOrder={setShowPopUpOrder}></Header>
            <main className="home">
                <div id="A"></div>
                <div className="home-hot-products">
                    <div className="section-title">
                        <div className="text-1">AGL Menu</div>
                        <div className="text-2">Sản Phẩm Nổi Bật</div>
                        <div className="icon-bottom-title"></div>
                    </div>
                    <div className="section-content container" style={{ marginTop: "50px" }}>
                        <ProductList data={data} loading={loading} category={category} value={value} handleChange={handleChange} showPopUpCart={showPopUpCart} setShowPopUpCart={setShowPopUpCart} showPopUpOrder={showPopUpOrder} setShowPopUpOrder={setShowPopUpOrder}></ProductList>
                    </div>
                </div>
            </main>
            <Footer></Footer>
        </>


    );
}

export default Home;