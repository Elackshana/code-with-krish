import React, { useEffect } from "react";
import {createCustomer, getCustomers} from "../services/customer-service";

export default function CustomerManagement(){

    const[name, setName]= React.useState("");
    const[email, setEmail]= React.useState("");
    const[address, setAddress]= React.useState("");
    const[customers, setCustomers]= React.useState("");

    const handleCustomerCreationSubmit = async (e)=>{
        e.preventDefault();
        console.log("Customer created");
        console.log({name, email, address })
        try{
            const customer = {   
                name, 
                email, 
                address
            }
                
            const response = await createCustomer(customer);
            console.log(response.data);
        }catch(error){
            alert(error.name)
        }
    }
    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = async ()=>{
        try{
            const response = await getCustomers();
            console.log(response.data);
            setCustomers(response.data);
        }catch(error){
            console.error(error);
            alert(error)
        }
    }

    return(
        <>
            <p>Create Customer</p>
            <form onSubmit={handleCustomerCreationSubmit}>
                <label htmlFor ="name">Customer Name</label>
                <input type="text" id="name" name="name" value={name} onChange={(e)=> setName(e.target.value)} required/>
                <br/>
                <label htmlFor ="email">Email</label>
                <input type="text" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required/>
                <br/>
                <label htmlFor ="address">Address</label>
                <input type="text" id="address" name="address" value={address} onChange={(e)=> setAddress(e.target.value)} required/>
                <br/>
                <input type="submit"value="Submit"/>
            </form>

            <div>
                <table>
                    <tr>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {customers && customers.map(item => (
                        <tr>
                            <th>{item.name}</th>
                            <th>{item.email}</th>
                            <th>{item.address}</th>
                            <th></th>
                            <th></th>
                        </tr>
                    ))}
                    

                </table>
            </div>
        </>
    )
        
}
 