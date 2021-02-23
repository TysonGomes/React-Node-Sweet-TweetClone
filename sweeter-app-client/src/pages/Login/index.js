import React ,{useState}from "react";
import api from "../../services/api";
//import axios from "axios";
import {useHistory} from "react-router-dom"
import Layout from "../../components/Layout";
import {Container,Content,Input,Button,ErrorWarning} from "./styles";
import jwt from "jsonwebtoken";

export default function Login (){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history =useHistory();
    const [error,setError]=useState();
    const handleLogin= async event=>{
        
        event.preventDefault();
        if (!username || !password)return;
            try{
                const response = await api.post("/login",{username,password});
                console.log(response.data.token);
                console.log(jwt.decode(response.data.token));
               // console.log(response.headers.get('auth-token'));
             localStorage.setItem("SESSION_TOKEN",response.data.token);
             return history.push("/home");
            }catch (e){
             console.error(e);
             setUsername("");
            if (e.response.status === 404) {
                setError("Nome de usuário não encontrado.");
              } else if (e.response.status === 400) {
                setError("Senha incorreta.");
              }
              setPassword("");
        }
   
    }

    return(
        <Layout>
            <Container>
                <Content>
                {error && <ErrorWarning>{error}</ErrorWarning>} 
                    <div>
                        <form>
                            <div>
                                <label>Nome do Usuario:</label>
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
                            <a href="/register" >Criar conta</a>
                            <Button onClick={handleLogin} type="submit">Entrar</Button>
                            </div>
                            </form>
                    </div>
                   
                </Content>  
            </Container>
        </Layout>
    );
}