import React, { useEffect, useRef, useState } from 'react';
import classNames from "classnames/bind";
import styles from "./ProductCart.module.scss";
import Popup from 'reactjs-popup';
import Button from '../Button';

const cx = classNames.bind(styles);

let paymentMethods = [{
    id: 1,
    name: 'Thanh toán Momo',
    note: ''
}, {
    id: 2,
    name: 'Thanh toán tiền mặt',
    note: 'Xin vui lòng thanh toán sau khi nhận hàng!! Cám ơn'
}]
function ProductCart({ showPopUpCart, closePopupCart, value }) {
    const [isChecked, setIsChecked] = useState(1);
    const [customer_name, setCustomer_name] = useState("");
    const [customer_phone, setCustomer_phone] = useState("");
    const [customer_note, setCustomer_note] = useState("");
    const [priceItem, setPriceItem] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    // Set count ID customer
    const initialCount = () => Number(window.localStorage.getItem('count'));
    const [count, setCount] = useState(initialCount);
    const increment = () => setCount(count + 1);

    const [infoCustomer, setInfoCustomer] = useState(() => {
        const newCustomer = JSON.parse(localStorage.getItem("ListInfoCustomer"));
        return newCustomer ?? [];
    });

    const [productCart, setProductCart] = useState(() => {
        const newProducts = JSON.parse(localStorage.getItem("list_products"));
        return newProducts ?? [];
    });

    const [orderList, setOrderList] = useState(() => {
        const newOrderList = JSON.parse(localStorage.getItem("ListOrder"));
        return newOrderList ?? [];
    });

    // Create QR pay
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=348x348&data=2|99|0937804498|Cao Dinh Thy|caodinhthy1996@gmail.com|0|0|${totalPrice}|Người đặt: ${customer_name} -- SDT: ${customer_phone}|transfer_myqr`

    // Create Date Time
    const current = new Date();
    let time
    if (current.getHours() > 12) {
        time = `${current.getHours()}:${current.getMinutes()} PM`
    } else {
        time = `${current.getHours()}:${current.getMinutes()} AM`
    }

    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

    const ref = useRef();
    // Handling condition when input is not enough characters and numbers
    const enabledButton =
        customer_name.length >= 2 && customer_phone.length >= 10;

    function handleData(productCart) {
        let tempArr = []
        for (let i = 0; i < productCart?.length; i++) {
            const element = productCart[i];
            if (element.id === productCart[i].id) {
                tempArr.push({
                    id: element.id,
                    qty: element.selectedQty,
                    price: element.selectedPrice,
                    totalTopping: element.totalPriceTopping
                })
            }
        }

        const priceItem = tempArr.map((arr) => arr.price)
        const totalPrice = tempArr.reduce((a, c) => a + (c.price * c.qty) + c.totalTopping, 0)
        setPriceItem(priceItem)
        setTotalPrice(totalPrice)
    }

    // More customer information and products
    const handleSubmit = () => {
        setInfoCustomer((prev) => {
            const listInfoCustomer = [
                ...prev,
                {
                    id: count,
                    customer_name: customer_name.replace(/ +(?= )/g, "").trim(),
                    customer_phone: customer_phone,
                    customer_note: customer_note,
                    order_time: time,
                    order_date: date,
                    qr_code: qr,
                    product_cart: productCart,
                    payload:
                        isChecked === 1
                            ? "Thanh toán bằng Momo"
                            : "Thanh toán bằng Cash",
                },
            ];
            localStorage.setItem(
                "ListInfoCustomer",
                JSON.stringify(listInfoCustomer)
            );

            return listInfoCustomer;
        });

        setOrderList((prev) => {
            const oldOrderList = [...prev];
            const currentOrderList = productCart;
            const listOrder = oldOrderList.concat(currentOrderList);
            localStorage.setItem("ListOrder", JSON.stringify(listOrder));
            return listOrder;
        });

        setProductCart([])

        setCustomer_name("");
        setCustomer_phone("");
        setCustomer_note("")
        ref.current.focus();
    };

    // Function to help input only numbers
    const handleChangeNumber = (e) => {
        const rex = /^[0-9\b]+$/; //rules
        if (e.target.value === "" || rex.test(e.target.value)) {
            setCustomer_phone(e.target.value);
        }
    };

    // Function to help input only text
    const handleChangeUser = (e) => {
        const rex = /^[a-zA-Z\s\W]+$/; //rules
        if (e.target.value === "" || rex.test(e.target.value)) {
            setCustomer_name(e.target.value);
        }
    };

    const handleDeletedItem = (countIndex) => {
        setProductCart(productCart.filter((item, index) => index !== countIndex))

    }
    useEffect(() => {
        handleData(productCart)
        if (productCart) {
            const jsonProductLocal = JSON.stringify(productCart)
            localStorage.setItem('list_products', jsonProductLocal)
        }
        window.localStorage.setItem('count', count);

    }, [productCart, count])


    return (
        <>
            <Popup open={showPopUpCart} closeOnDocumentClick onClose={closePopupCart} className="modal-cart">
                <a className={cx('close')} onClick={closePopupCart}>
                    &times;
                </a>
                {productCart && productCart.length > 0 ?
                    <div className={cx("modal-pop-up")}>
                        <div className={cx("left-info")}>
                            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                                Thông Tin Sản Phẩm
                            </h2>
                            <div className={cx("content-width")}>
                                <div className={cx("content-scroll")}>
                                    <dl className={cx("content-flex")}>
                                        <dt>Hình ảnh</dt>
                                        <dt>Tên sản phẩm</dt>
                                        <dt>Chi tiết</dt>
                                        <dt>Số lượng</dt>
                                        <dt>Giá tiền</dt>
                                        <dt>Xóa</dt>
                                    </dl>

                                    {
                                        productCart && productCart?.map((item, index) => {
                                            return (
                                                <dl key={index} className={cx("content-flex")}>
                                                    <dd className={cx("content-flex-img")}>
                                                        <img src={item.image} alt="" />
                                                    </dd>

                                                    <dd className={cx("content-flex-name")}>{item.name}</dd>

                                                    <dd className={cx("content-flex-note")}>
                                                        Size: {item.selectedSize} <br />
                                                        {item.selectedTopping.length > 0 ? <>Topping: {item.selectedTopping.map(size => (
                                                            <p>- {size.name}</p>
                                                        ))}</> : ""
                                                        }
                                                    </dd>

                                                    <dd className={cx("content-flex-qty")}>
                                                        {item.selectedQty}
                                                    </dd>

                                                    <dd className={cx("content-flex-price")}>
                                                        {priceItem && priceItem[index].toLocaleString()}đ
                                                    </dd>

                                                    <dd className={cx("content-flex-del")}>
                                                        <button onClick={() => handleDeletedItem(index)}>Xóa</button>
                                                    </dd>
                                                </dl>
                                            );
                                        })
                                    }
                                    {productCart.length !== 0 && (
                                        <>
                                            <dl className={cx("content-flex", "last-info")}>
                                                <dd>Tổng cộng</dd>
                                                <dd>{totalPrice.toLocaleString()}đ</dd>
                                            </dl>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={cx("right-info")}>
                            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                                Thông Tin Khách Hàng
                            </h2>
                            <div className={cx("info-user")}>
                                <p>
                                    <span>Họ tên:</span>
                                    <input
                                        type="text"
                                        ref={ref}
                                        value={customer_name}
                                        onChange={handleChangeUser}
                                    />
                                </p>
                                <p>
                                    <span>Số DT:</span>
                                    <input
                                        type="text"
                                        maxLength="11"
                                        value={customer_phone}
                                        onChange={handleChangeNumber}
                                    />
                                </p>
                                <p>
                                    <span>Ghi chú:</span>
                                    <textarea
                                        type="text"
                                        value={customer_note}
                                        onChange={e => setCustomer_note(e.target.value)}
                                    />
                                </p>
                            </div>

                            <div className={cx("info-payload")}>
                                <h5>Hình thức thanh toán</h5>
                                <div>
                                    {paymentMethods.map((pay) => (
                                        <>
                                            <label key={pay.id}>
                                                <input
                                                    type="radio"
                                                    checked={isChecked === pay.id}
                                                    onChange={() => setIsChecked(pay.id)}
                                                />
                                                &nbsp;{pay.name}
                                            </label>
                                            &emsp;
                                        </>
                                    ))}
                                </div>

                                <ul>
                                    {paymentMethods.map((pay) => (
                                        <li
                                            key={pay.id}
                                            style={
                                                isChecked === pay.id
                                                    ? { display: "block" }
                                                    : { display: "none" }
                                            }
                                        >
                                            {pay.id === 1 ? (
                                                <>
                                                    <img className={cx('payment_momo')} src={qr} width="100%" height="100%" alt=""></img>
                                                    <p>Vui lòng quét mã thanh toán trước khi đặt hàng</p>
                                                    <h5>{totalPrice.toLocaleString()} VND</h5>
                                                </>
                                            ) : (
                                                <h6>{pay.note}</h6>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={cx("btn-cart", enabledButton ? 'show-click' : '')} onClick={increment}>
                                <Button disabled enabledButton={enabledButton} onClick={() => handleSubmit()}>
                                    Đặt Hàng
                                </Button>
                            </div>

                        </div>
                    </div> : <div style={{ fontSize: '20px' }}>Hiện tại chưa có sản phẩm</div>}
            </Popup>
        </>
    );
}

export default ProductCart;