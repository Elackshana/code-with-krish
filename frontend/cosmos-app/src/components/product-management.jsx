import React, { useEffect } from "react";
import {createProduct, getProducts} from "../services/product-service";

export default function CustomerManagement(){

    const[name, setName]= React.useState("");
    const[price, setPrice]= React.useState("");
    const[quantity, setQuantity]= React.useState("");
    const[products, setProducts]= React.useState("");

    const handleProductCreationSubmit = async (e)=>{
        e.preventDefault();
        console.log("Product created");
        console.log({name, price, quantity })
        try{
            const product = {   
                name, 
                price, 
                quantity
            }
                
            const response = await createProduct(product);
            console.log(response.data);
        }catch(error){
            alert(error.name)
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async ()=>{
        try{
            const response = await getProducts();
            console.log(response.data);
            setProducts(response.data);
        }catch(error){
            console.error(error);
            alert(error)
        }
    }

    return(
        <>
            <p>Create Product</p>
            <form onSubmit={handleProductCreationSubmit}>
                <label htmlFor ="name">Product Name</label>
                <input type="text" id="name" name="name" value={name} onChange={(e)=> setName(e.target.value)} required/>
                <br/>
                <label htmlFor ="price">Price</label>
                <input type="text" id="price" name="price" value={price} onChange={(e)=> setPrice(e.target.value)} required/>
                <br/>
                <label htmlFor ="quantity">Quantity</label>
                <input type="text" id="quantity" name="quantity" value={quantity} onChange={(e)=> setQuantity(e.target.value)} required/>
                <br/>
                <input type="submit"value="Submit"/>
            </form>

            <div>
                <table>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th></th>
                        <th></th>
                    </tr>
                    {products && products.map(item => (
                        <tr>
                            <th>{item.name}</th>
                            <th>{item.price}</th>
                            <th>{item.quantity}</th>
                            <th></th>
                            <th></th>
                        </tr>
                    ))}
                    

                </table>
            </div>
        </>
    )
        
}
 