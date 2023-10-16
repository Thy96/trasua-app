import React, { useEffect, useState } from 'react';
import classNames from "classnames/bind";
import styles from "./ProductOrder.module.scss";
import Popup from 'reactjs-popup';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

const cx = classNames.bind(styles);

function ProductOrder({ showPopUpOrder, closePopupOrder }) {

    const [orderList, setOrderList] = useState(() => {
        const newOrder = JSON.parse(localStorage.getItem("ListOrder"));
        return newOrder ?? [];
    })

    const [users, setUsers] = useState(() => {
        const newUser = JSON.parse(localStorage.getItem("ListInfoCustomer"));
        return newUser ?? [];
    })

    const users_sort = users.sort((a, b) => b.id - a.id)

    useEffect(() => { }, [orderList, users])

    return (
        <>
            <Popup open={showPopUpOrder} closeOnDocumentClick onClose={closePopupOrder} className="modal-cart">
                <a className={cx('close')} onClick={closePopupOrder}>
                    &times;
                </a>
                {orderList && orderList.length > 0 ?
                    <div className={cx("modal-pop-up")}>
                        <div className={cx("left-info")}>
                            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                                Lịch Sử Đơn Hàng
                            </h2>
                            <div className={cx("content-width")}>
                                <div className={cx("content-scroll")}>
                                    <dl className={cx("content-flex", "content-flex-info")}>
                                        <dt>Ngày mua hàng</dt>
                                        <dt>Tên khách hàng</dt>
                                        <dt>Ghi chú</dt>
                                        <dt>Số DT</dt>
                                        <dt>Hình thức thanh toán</dt>
                                    </dl>
                                    {
                                        users_sort && users_sort?.map((user, index) => {
                                            return (
                                                <>
                                                    <dl key={index} className={cx("content-flex", "content-flex-info")}>
                                                        <dd className={cx("content-flex-img")}>
                                                            {user.order_time}<br />
                                                            {user.order_date}
                                                        </dd>

                                                        <dd className={cx("content-flex-name")}>{user.customer_name}</dd>

                                                        <dd className={cx("content-flex-note")}>
                                                            -- {user.customer_note}<br />
                                                            {user.product_cart.map((item) => {
                                                                const totalPriceItem = item.selectedPrice * item.selectedQty + item.totalPriceTopping
                                                                return (
                                                                    <>
                                                                        <div className={cx('info-box')}>
                                                                            <figure><img src={item.image} /></figure>
                                                                            <div className={cx('info-item')}>
                                                                                {item.name} x {item.selectedQty} <br />
                                                                                {item.selectedTopping.map((topping) => {
                                                                                    return (
                                                                                        <>
                                                                                            <p>- {topping.name}</p>
                                                                                        </>
                                                                                    )
                                                                                })}
                                                                                <div className={cx('info-item-price')}>Giá tiền: {totalPriceItem.toLocaleString()}đ</div>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                )
                                                            })}
                                                        </dd>

                                                        <dd className={cx("content-flex-qty")}>
                                                            <PhoneIphoneIcon></PhoneIphoneIcon>{user.customer_phone}
                                                        </dd>

                                                        <dd className={cx("content-flex-price")}>
                                                            {user.payload}<br />
                                                            {user.payload == "Thanh toán bằng Cash" ?
                                                                ''
                                                                : <img src={user.qr_code} alt='qr' width='100%' />
                                                            }
                                                        </dd>
                                                    </dl></>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div> : <div style={{ fontSize: '20px' }}>Hiện tại chưa có sản phẩm</div>}
            </Popup>
        </>
    );
}

export default ProductOrder;