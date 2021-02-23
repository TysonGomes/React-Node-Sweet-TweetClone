import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Container } from "./styles";
import Layout from "../../components/Layout";
import SweetForm from "../../components/SweetForm";
import SweetList from "../../components/SweetList";

export default function Home() {

     const[sweet,setSweet]= useState([]);
    
  
     useEffect(()=>{
        const fetchSweet =async ()=>{
          try{
            const token = localStorage.getItem("SESSION_TOKEN");

            const sweetResponse = await api.get("/sweets",{headers:{"auth-token": token }});

            const sweetUsers = await Promise.all(
                sweetResponse.data.map(async sweet=>{
                  const user = await api.get (`/user/${sweet.owner}`,{headers:{"auth-token": token }});
                  
                  return {...sweet,username: user.data.username}
                })
           );
           setSweet(sweetUsers);

          }catch (error){
            console.error(error);
          }
        };
        fetchSweet() ;
     },{})
      const handleLike = async (ownerID,sweetID)=>{
         console.log(ownerID,sweetID);
         const token = localStorage.getItem("SESSION_TOKEN");
         const response = await api.put(`/sweets/${sweetID}`,null,{headers:{"auth-token": token ,Authorization: `Bearer ${token}`}});
         console.log(response.data);
         window.location.reload ();
         
        /*
         const newSweet = sweet.map(sweet =>{
           if (sweet._id===sweetID){
             const sweetLiked = sweet.likes.find(owner=>owner ===ownerID);
             if(sweetLiked){
               return{...sweet,likes: sweet.likes.filter(owner =>owner !== ownerID)};
             }
             return {...sweet,like:[...sweet.likes,ownerID]};
           }
           return sweet
         })
         setSweet(newSweet);
         */
      }
     




   return (
    <Layout>
      
        <SweetForm />
         <SweetList
         sweet={sweet}
         onLike={handleLike}
         />
      
    </Layout>
  );
}