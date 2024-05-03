import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ShowCart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';



const ShowCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  
  // Retrieve userId from session storage or context
  const userId = sessionStorage.getItem('userId');
  
  useEffect(() => {
    if (!userId) {
      alert('Please log in to view your cart.');
      navigate('/login');
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/cart/${userId}`);
        setCartItems(response.data);

        // Calculate and set total price
        const total = response.data.reduce((sum, item) => sum + item.qty * item.price, 0);
        setTotalPrice(total.toFixed(2));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId, navigate]);

  const handleConfirmOrder = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      alert('Please log in to confirm your order.');
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:5500/order', { userId });
      // Navigate to MyOrder page upon success
      navigate('/my-order');
    } catch (error) {
      console.error('Error confirming order:', error);
      // Handle error, show message to the user
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      // Send a request to remove the item from the cart
      const response = await axios.post('http://localhost:5500/cart/removeitem', {
        userId,
        itemId: id
      });
  
      // Check if the response indicates successful removal
      if (response.status === 200) {
        // Display success message
        alert('Item removed from cart!');
  
        // Check if the response contains an empty cart
        if (response.data.cartItems.length === 0) {
          // Update cart items to an empty array
          setCartItems([]);
        } else {
          // Fetch the updated cart items from the server
          const updatedCartItemsResponse = await axios.get(`http://localhost:5500/cart/${userId}`);
          const updatedCartItems = updatedCartItemsResponse.data;
  
          // Update cart items
          setCartItems(updatedCartItems);
  
          // Calculate and set total price
          const total = updatedCartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
          setTotalPrice(total.toFixed(2));
        }
      } else {
        // Display error message if removal was not successful
        alert('Failed to remove item from cart.');
      }
    } catch (error) {
      console.error('Error removing item from cart', error);
      alert('Failed to remove item from cart.');
    }
  };
    

  const handleReduceQuantity = async (id) => {
    try {
      // Fetch the updated cart items from the server
      const response = await axios.get(`http://localhost:5500/cart/${userId}`);
      const updatedCartItems = response.data;
      
      // Find the item to reduce its quantity
      const itemToReduce = updatedCartItems.find(item => item.itemId === id);
      if (!itemToReduce) {
        console.error(`Item with ID ${id} not found in the cart.`);
        return;
      }
      
      // If the quantity of the item is already 1, remove it from the cart
      if (itemToReduce.qty === 1) {
        // Send a request to remove the item from the cart
        await axios.post('http://localhost:5500/cart/removeitem', {
          userId,
          itemId: id
        });
      } else {
        // Send a request to reduce the item quantity
        await axios.post('http://localhost:5500/cart/reducequantity', {
          userId,
          itemId: id
        });
      }
  
      // Update cart items
      const updatedItems = itemToReduce.qty === 1
        ? updatedCartItems.filter(item => item.itemId !== id)
        : updatedCartItems.map(item =>
            item.itemId === id ? { ...item, qty: item.qty - 1 } : item
          );
      setCartItems(updatedItems);
  
      // Calculate and set total price
      const total = updatedItems.reduce((sum, item) => sum + item.qty * item.price, 0);
      setTotalPrice(total.toFixed(2));
  
    } catch (error) {
      console.error('Error reducing item quantity', error);
      alert('Failed to reduce item quantity.');
    }
  };
    

  const handleIncreaseQuantity = async (id) => {
    try {
      // Increase the quantity of the item in the cart by 1
      await axios.post('http://localhost:5500/cart/increasequantity', {
        userId, // Assuming userId is available in scope
        itemId: id // Pass the itemId to identify the item
      });
  
      // Fetch the updated cart items from the server
      const response = await axios.get(`http://localhost:5500/cart/${userId}`);
      setCartItems(response.data);
  
      // Calculate and set total price
      const total = response.data.reduce((sum, item) => sum + item.qty * item.price, 0);
      setTotalPrice(total.toFixed(2));
  
      alert('Item quantity increased!');
    } catch (error) {
      console.error('Error increasing item quantity', error);
      alert('Failed to increase item quantity.');
    }
  };

  

  return (
    <div className='row'>
        <div className='col-sm-4'></div>
        <div className='col-sm-4'>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.itemId} className="cart-item">
              <img src={`/Images/${item.photo}`} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>£{item.price} x {item.qty}</p>
                <button 
                  className="btn btn-sm btn-minus rounded-circle bg-light border"
                  onClick={() => handleReduceQuantity(item.itemId)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <button 
                  className="btn btn-sm btn-plus rounded-circle bg-light border"
                  onClick={() => handleIncreaseQuantity(item.itemId)}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <button 
                  className="btn btn-sm btn-delete rounded-circle bg-light border"
                  onClick={() => handleDeleteItem(item.itemId)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>

              </div>
            </div>
          ))}
          <div className="total-price">
            <h3>Total £{totalPrice}</h3>
          </div>
          <button className='btn btn-primary' onClick={handleConfirmOrder}>Confirm Order</button>
        </>
      )}
    </div>
        <div className='col-sm-4'></div>
    </div>
    
  );
};

export default ShowCart;
