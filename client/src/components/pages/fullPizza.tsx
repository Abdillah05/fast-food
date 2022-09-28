import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza: React.FC = () => {
const {id} = useParams()
const navigate = useNavigate()
const [pizza, setPizza] = useState<
{
    imageUrl:string,
    title:string,
    price:number,   
}
>();
useEffect(() => {
    async function fetchPizza() {
        try {
            const {data} = await axios.get('https://62f6a75a612c13062b52efa0.mockapi.io/item/' + id )
            setPizza(data)
        } catch (error) {
          alert("Ошибка при получении пиццы") 
          navigate('/') 
        } 
    }

    fetchPizza();
},[id])
if(!pizza){
    return <>'Loading...'</>
}
    return ( 
 <div className='container'>
     <img src={pizza.imageUrl} alt="" />
     <h2>{pizza.title}</h2>
     <h4>{pizza.price}</h4>
 </div>
    
    
     );
}
 
export default FullPizza;