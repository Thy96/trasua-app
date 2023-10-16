import React, { useEffect, useState } from 'react';
import images from "../../assets/images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Login from '../Login/Login';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

function Header({ callbackToken, callbackUserID, setShowPopUpCart, setShowPopUpOrder }) {
    let settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const [showPopUpLogin, setShowPopUpLogin] = useState(false)
    const [toggle, setToggle] = useState(false)

    if (localStorage.getItem("list_products") == null) {
        setTimeout(() => {
            window.location.reload(false);
            window.localStorage.setItem('list_products', JSON.stringify([]));
        }, 1);
    }

    let countItemOnLocalStore = JSON.parse(localStorage.getItem("list_products"));

    let token = localStorage.getItem('Token')
    let user = JSON.parse(localStorage.getItem('User')) || null
    const boxStyle = {
        color: '#fff',
        transition: '0.4s',
        "&:hover": {
            color: '#d3b673',
        }
    };

    const closePopupLogin = () => {
        setShowPopUpLogin(false)
    }

    // const logOutAccount = () => {
    //     localStorage.removeItem('Token');
    //     window.location.reload(false);
    // }

    useEffect(() => {
        callbackToken(token)
        callbackUserID(user?.id)
    }, [token, user, countItemOnLocalStore])


    return (
        <>
            <header id="header-wrap">
                <div id="header" className="container">
                    <a className="logo" href="/">
                        <img className="logo-img" src={images.logohead} alt="logo" />
                    </a>
                    <div className="menu">
                        <div className="menu-open-button" id={toggle ? 'menu-open' : ''} onClick={() => setToggle(!toggle)}>
                            <span className="hamburger hamburger-1"></span>
                            <span className="hamburger hamburger-2"></span>
                            <span className="hamburger hamburger-3"></span>
                        </div>
                        <div className="menu-primary" id={toggle ? 'show-menu' : ''}>
                            <ul id="menu-menu-chinh" className="menu">
                                <li
                                    id="menu-item-1271"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1262 current_page_item menu-item-1271"
                                >
                                    <a href="/">
                                        Trang Chủ
                                    </a>
                                </li>
                                {/* <li
                                    id="menu-item-1271"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1262 current_page_item menu-item-1271"
                                >
                                    <a onClick={token ? () => logOutAccount() : () => setShowPopUpLogin(true)}>
                                        {token ? 'Đăng Xuất' : 'Đăng Nhập'}
                                    </a>
                                </li> */}
                                <li
                                    id="menu-item-1271"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1262 current_page_item menu-item-1271 icon"
                                >
                                    <button onClick={() => setShowPopUpCart(true)}>
                                        <ShoppingCartOutlinedIcon sx={boxStyle} />
                                        {countItemOnLocalStore.length > 0 ? <span>{countItemOnLocalStore.length}</span> : ''}
                                    </button>
                                </li>
                                <li
                                    id="menu-item-1271"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1262 current_page_item menu-item-1271 icon"
                                >
                                    <button onClick={() => setShowPopUpOrder(true)}>
                                        <HistoryEduIcon sx={boxStyle} />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <Slider {...settings} className="homeSilder">
                <div className="slide item">
                    <div className="carousel-bg clearfix"></div>
                    <img src={images.banner1} className="d-block w-100" alt="..." />
                    <div className="carousel-content">
                        <a href="#A" className="order-now">
                            Đặt Hàng
                        </a>
                        <div className="scroll-icon"></div>
                        <div className="btn-scroll">Cuộn Xuống</div>
                    </div>
                </div>
                <div className="slide item">
                    <div className="carousel-bg clearfix"></div>
                    <img src={images.banner2} className="d-block w-100" alt="..." />
                    <div className="carousel-content">
                        <a href="#A" className="order-now">
                            Đặt Hàng
                        </a>
                        <div className="scroll-icon"></div>
                        <div className="btn-scroll">Cuộn Xuống</div>
                    </div>
                </div>
                <div className="slide item">
                    <div className="carousel-bg clearfix"></div>
                    <img src={images.banner3} className="d-block w-100" alt="..." />
                    <div className="carousel-content">
                        <a href="#A" className="order-now">
                            Đặt Hàng
                        </a>
                        <div className="scroll-icon"></div>
                        <div className="btn-scroll">Cuộn Xuống</div>
                    </div>
                </div>
            </Slider>
            <Login showPopUpLogin={showPopUpLogin} setShowPopUpLogin={setShowPopUpLogin} closePopupLogin={closePopupLogin}></Login>
        </>
    );
}

export default Header;