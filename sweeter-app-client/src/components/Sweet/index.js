import React, { useEffect, useState } from "react";
import {LikeButton,Container}  from "./styles";
import api from "../../services/api";
export default function Sweet(props) {
     
     const [username,setUsername]=useState("");
        useEffect(()=>{
            const fetchUsername =async ()=>{
                try{
                     const token= localStorage.getItem("SESSION_TOKEN");
                     const response = await api.get(`user/${props.owner}`,{headers:{"auth-token": token}});
                     setUsername(response.data.username);
                    

                }catch (error){
                    console.error(error);
                }
            }
            fetchUsername();
        })


    return (
        <Container>
          <span>{username}</span>
    
          <p>{props.content}</p>
    
          <div>
            <span>{props.likes.length}</span>
            <LikeButton  onClick={() => props.onLike(props.owner, props. sweetid)}>Like</LikeButton>
          </div>
        </Container>
      );
    }