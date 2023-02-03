import React from 'react';
import images from "../../assets/images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Header() {
    var settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <header id="header-wrap">
                <div id="header" className="container">
                    <a className="logo" href="/">
                        <img className="logo-img" src={images.logohead} alt="logo" />
                    </a>
                    <div className="menu">
                        <div className="menu-primary">
                            <ul id="menu-menu-chinh" className="menu">
                                <li
                                    id="menu-item-1271"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1262 current_page_item menu-item-1271"
                                >
                                    <a href="/">
                                        Trang Chủ
                                    </a>
                                </li>
                                <li
                                    id="menu-item-1271"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-1262 current_page_item menu-item-1271"
                                >
                                    <a href="/">
                                        Giỏ hàng
                                    </a>
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
        </>
    );
}

export default Header;