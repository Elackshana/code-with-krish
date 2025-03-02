import axios from 'axios';

const baseUrl = 'http://localhost:3002/customers';

export const createCustomer = async (customer) => {
    console.log(customer);
    return axios.post(baseUrl, customer);
}

export const getCustomers = async () => {
    return axios.get(baseUrl);
}
