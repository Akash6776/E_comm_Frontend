import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'


const CartItems = () => {

const {all_product, cartItems, removeFromCart, getTotalCartAmount} = useContext(ShopContext);

  const amount = 500;
  const currency= "INR";
  const receiptId= "qwsaq1";

  const paymentHandler = async (e)=>{
    const response = await fetch("http://localhost:5000/order",{
      method:"POST",
      body:JSON.stringify({
        amount,
        currency,
        receipt:receiptId,
      }),
      headers:{
        "Content-Type":"application/json",
      },
    });
    const order = await response.json();
    console.log(order);


//Payment method copyed from site===============================================================================================================
    var options = {
      "key": "rzp_test_NdcRnENlq3srBS", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      "name": "LAMBA STORE", //your business name
      "description": "Test Transaction",
      "image": "http://localhost:4000/images/product_1707508473659.png",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "handler": function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          "name": "Test Purpose", //your customer's name
          "email": "test@example.com", 
          "contact": "9000000000"  //Provide the customer's phone number for better conversion rates 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response){
          alert(response.error.reason);
  });
  rzp1.open();
  e.preventDefault();
  //==============================================================================================================================
  };

  
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
          if(cartItems[e.id]>0){
            return <div>  
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} alt="" className='carticon-product-icon'/>
                <p>{e.name}</p>
                <p>₹{e.new_price}</p>
                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                <p>₹{e.new_price*cartItems[e.id]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
              </div>
            <hr />
            </div>
          }
          return null;
        })}
    <div className="cartitems-down">
      <div className="cartitems-total">
        <h1>Cart Totals</h1>
        <div>
          <div className="cartitems-total-item">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>
          <hr />
          <div className="cartitems-total-item">
            <h3>Total</h3>
            <h3>₹{getTotalCartAmount()}</h3>
          </div>
        </div>
        <button onClick={paymentHandler}>PROCEED TO CHECKOUT</button>

      </div>
      <div className="cartitems-promocode">
        <p>If you have a promo code, Enter it here</p>
        <div className="cartitems-promobox">
          <input type="text" placeholder='promo code' />
          <button>Submit</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CartItems