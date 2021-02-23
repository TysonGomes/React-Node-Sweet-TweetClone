import React, { useState } from "react";
import api from "../../services/api"
import { Container } from "./styles";

export default function SweetForm() {
    const [text,setText] = useState("");

    const handleSweet =async event =>{
      event.preventDefault ();
      try{
        const token = localStorage.getItem("SESSION_TOKEN");

        const response = await api.post("sweet",{content:text},{headers: { "auth-token": token }});

        setText("");
        console.log(response);
        
      }catch (error) {
      console.error(error);
      }
    }


  return (
    <Container>
      <textarea 
        required
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="O que você está pensando" rows={4} />
      <div>
        <button onClick={handleSweet}>Enviar</button>
      </div>
    </Container>
  );
}