import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../../app/reducer/orderSlice'; // Import the thunk to fetch order by ID
import { useAuth } from '../../context/authContext';

const MyOrders = () => {
  const { user, accessToken } = useAuth();
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(''); // To handle specific order ID input
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const { order, status, error } = useSelector((state) => state.order); // Get order state from Redux

  useEffect(() => {
    if (user && accessToken) {
      // Optionally, you can fetch all orders here or leave it to a different component
    }
  }, [user, accessToken]);

  // Function to fetch order by ID when the user enters an order ID
  const handleFetchOrder = () => {
    setIsLoading(true);
    dispatch(fetchOrderById(orderId))
      .finally(() => setIsLoading(false));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (status === 'failed' && error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Order History</h2>
      
      {/* Fetch specific order by ID */}
      <div>
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={handleFetchOrder}>Fetch Order</button>
      </div>

      {/* Display specific order details */}
      {order && (
        <div>
          <h3>Order Details (ID: {order.orderId})</h3>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> PKR {order.grandTotal}</p>
          {/* Add more order details here */}
        </div>
      )}

      {/* Optionally, display all orders if required */}
      {/* {orders.map((order) => (
        <div key={order.orderId}>
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> PKR {order.grandTotal}</p>
        </div>
      ))} */}
    </div>
  );
};

export default MyOrders;
