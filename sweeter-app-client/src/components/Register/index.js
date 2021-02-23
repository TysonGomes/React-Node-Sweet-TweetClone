import React ,{useState }from "react";
//import axios from "axios";
import api from "../../services/api";
import {useHistory} from "react-router-dom";
import Layout from "../../components/Layout";
import {Container,Content,Input,Button,ErrorWarning} from "./styles";
export default function Register(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError]= useState()
    const history= useHistory();
 
    const handleRegister= async event=>{
        event.preventDefault();
        if(!username || !password) return

        try{
            await api.post("/register",{username,password});
            return history.push ("/");
        }catch(e){
           console.error(e)
            setError("error ao registrar.");
            setUsername("");
            setPassword("");
        }
    };
   

    //console.log(username,password);
    return(
        <Layout>
           <Container>
             <Content>   
             {error && <ErrorWarning>{error}</ErrorWarning>}            
                            <div>
                                <div>
                                <div>
                                    <label>Novo Usuario:</label>
                                    <Input type="text"
                                      value={username}
                                      onChange={e=>setUsername(e.target.value)}
                                    
                                    />
                                </div>  
                                <div>
                                        <label className="Pass">Senha:</label>
                                        <Input type="password"
                                        value={password}
                                        onChange={e=>setPassword(e.target.value)}
                                        
                                        />
                                </div>
                                <div className="Buttons">
                                    <a href="/">Cancelar</a>
                                    <Button type="submit" onClick={handleRegister}>Registrar</Button>
                                </div>
                                </div>
                            </div>
                </Content>            
            </Container>
       </Layout>                  
    )
}