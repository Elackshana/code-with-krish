import React, { useEffect } from "react";
import {createOrder, getOrders, updateOrderStatus} from "../services/order-service";

export default function OrderManagement(){

    const[customerId, setCustomerId]= React.useState("");
    const[productId, setProductId]= React.useState("");
    const[price, setPrice]= React.useState("");
    const[qty, setQTY]= React.useState("");
    const[orders, setOrders]= React.useState("");

    const handleOrderSubmit = async (e)=>{
        e.preventDefault();
        console.log("Order submitted");
        console.log({customerId, productId, price, qty })
        try{
            const order = {
                customerId, 
                items:[
                    {   
                        productId, 
                        price, 
                        quantity : qty
                    }
                ]
                
            }
            const response = await createOrder(order);
            console.log(response.data);
        }catch(error){
            alert(error.name)
        }
    }
    useEffect(() => {
        fetchOrders();
    }, [])

    const fetchOrders = async ()=>{
        try{
            const response = await getOrders();
            console.log(response.data);
            setOrders(response.data);
        }catch(error){
            console.error(error);
            alert(error)
        }
    }

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            fetchOrders(); //refreshing the orders list
        } catch (error) {
            alert("Failed to update status: " + error.message);
        }
    };

    return(
        <>
            <p>Create Order</p>
            <form onSubmit={handleOrderSubmit}>
                <label htmlFor ="cus_id">Customer ID</label>
                <input type="text" id="cus_id" name="cus_id" value={customerId} onChange={(e)=> setCustomerId(e.target.value)} required/>
                <br/>
                <label htmlFor ="prod_id">Product ID</label>
                <input type="text" id="prod_id" name="prod_id" value={productId} onChange={(e)=> setProductId(e.target.value)} required/>
                <br/>
                <label htmlFor ="price">Price</label>
                <input type="text" id="price" name="price" value={price} onChange={(e)=> setPrice(e.target.value)} required/>
                <br/>
                <label htmlFor ="qty">QTY</label>
                <input type="text" id="qty" name="qty" value={qty}  onChange={(e)=> setQTY(e.target.value)} required/>
                <br/>
                <input type="submit"value="Submit"/>
            </form>

            <div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Customer ID</th>
                        <th>Order Date</th>
                        <th>Order Status</th>
                        <th>Update Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {orders && orders.map(item => (
                        <tr>
                            <th>{item.id}</th>
                            <th>{item.customerId}</th>
                            <th>{item.createdAt.split("T")[0]}</th>
                            <th>{item.status}</th>
                            <td>
                                <select
                                    value={item.status}
                                    onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                                >
                                    <option value="PENDING">PENDING</option>
                                    <option value="CONFIRMED">CONFIRMED</option>
                                    <option value="SHIPPED">SHIPPED</option>
                                    <option value="DELIVERED">DELIVERED</option>
                                    <option value="CANCELLED">CANCELLED</option>       
                                </select>
                            </td>
                            <th></th>
                            <th></th>
                        </tr>
                    ))}
                    

                </table>
            </div>
        </>
    )
        
}
 