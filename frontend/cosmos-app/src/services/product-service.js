import axios from 'axios';

const baseUrl = 'http://localhost:3001/products';

export const createProduct = async (product) => {
    console.log(product);
    return axios.post(baseUrl, product);
}

export const getProducts = async () => {
    return axios.get(baseUrl);
}
