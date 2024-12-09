import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items); // Access cart items from Redux store
  const dispatch = useDispatch();

  // Helper function to clean price and parse it to a number
  const parsePrice = (price) => {
    return +price.replace('$', '');
  };

  // Calculate the total cost of all items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.quantity * parsePrice(item.cost)), 0).toFixed(2); 
  };

  // Handle continue shopping action
  const handleContinueShopping = () => {
    console.log('Continuing shopping...');
    if (onContinueShopping) {
      onContinueShopping(); // Call the parent function to continue shopping
    }
  };

  // Handle incrementing the quantity of an item in the cart
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ ...item, quantity: item.quantity + 1 }));
  };

  // Handle decrementing the quantity of an item in the cart
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item)); // Remove item if quantity is 1 and it's decremented
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item)); // Dispatch remove item action
  };

  // Calculate the total cost for a single item based on its quantity
  const calculateTotalCost = (item) => {
    return (item.quantity * parsePrice(item.cost)).toFixed(2); // Calculate item cost
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <div>Your cart is empty. Start shopping!</div>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => alert('Functionality to be added for checkout in future')}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
