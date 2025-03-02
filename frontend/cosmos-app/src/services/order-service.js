import axios from 'axios';

const baseUrl = 'http://localhost:3000/orders';

export const createOrder = async (order) => {
    console.log(order);
    return axios.post(baseUrl, order);
}

export const getOrders = async () => {
    return axios.get(baseUrl);
}

export const updateOrderStatus = async (orderId, status) => {
    return axios.patch(`${baseUrl}/${orderId}/status`, { status });
};