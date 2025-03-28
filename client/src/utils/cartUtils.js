import { addOrder, removeOrder } from '../store/ordersSlice';

/**
 * Add a service to the cart
 * @param {Object} service - The service to add
 * @param {Function} dispatch - Redux dispatch function
 */
export const addServiceToCart = (service, dispatch) => {
  const orderItem = {
    id: service.id,
    title: service.title,
    subtitle: service.subtitle || service.description,
    price: service.price,
    image: service.image,
    quantity: 1
  };
  
  dispatch(addOrder(orderItem));
};

/**
 * Remove a service from the cart
 * @param {string|number} serviceId - The ID of the service to remove
 * @param {Function} dispatch - Redux dispatch function
 */
export const removeServiceFromCart = (serviceId, dispatch) => {
  dispatch(removeOrder(serviceId));
};

/**
 * Get the total quantity of items in the cart
 * @param {Array} cartItems - The cart items array
 * @returns {number} The total quantity
 */
export const getTotalQuantity = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

/**
 * Get the total price of items in the cart
 * @param {Array} cartItems - The cart items array
 * @returns {number} The total price
 */
export const getTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}; 