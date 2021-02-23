const express = require("express");
const morgan= require("morgan");
const cors =require("cors");
//const bcrypt= require("bcrypt");
const  mongoose =require ("mongoose");
//const authenticate = require("./auth");
//const jwt = require ("jsonwebtoken");
const expressJWT= require("express-jwt");
const routes = require("./routes");
require("dotenv").config();
const jwt_Secret = process.env.JWT_SECRET;
const middlewares= require("../src/middleware/middleware");
//const User = require("../src/models/User");
const app = express();

app.use(express.json());
app.use(morgan("common"));

app.use(
    cors({
        origin:process.env.CORS_ORIGIN,
        
    })
);
app.get("/",(req,res)=> {
    res.send("deu certo ok 222")
})
app.use(routes);
const PORT=3333;
app.listen(PORT,()=>{
    console.log (`server na porta :${PORT}`);
    
})

app.use(
  expressJWT({secret:jwt_Secret,
  algorithms: ['HS256']})
  .unless({path:["/login"]})
)
// Middleware recurso não encontrado
app.use(middlewares.notFound);
// Middleware de tratamento de erro
app.use(middlewares.errorHandling);

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,    
    useUnifiedTopology: true  
    },  () => console.log("Conectou top!"))

   

    // tokken/*
   /* function verifyJWT(req, res, next){
      const token = req.headers['x-access-token'];
      if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
      
      jwt.verify(token, process.env.jwt_Secret, function(err, decoded) {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
      });
  }*/
// Criar usuário
/*app.post("/register", async (req, res, next) => {
    try {
      const { username, password } = req.body;
 // Verificar se username é valido
 const userExists = await User.findOne({username});
 
 if (userExists) return res.status(400).send({error: "Username already in use."});
 
 // Criptografar a senha
 const salt = await bcrypt.genSalt(10);
 const hash = await bcrypt.hash(`${password}`, salt);
 //Criar novo usuário no banco
 const user = await User.create({
   username,
   password: hash
 })
 
 res.status(201).send({
   id: user.id,
   username: user.username
 });    
 } catch (err) {       
      res.status(400)
      next(err);
    }
  });*/
 /*app.post("/login",async(req,res,next)=>{
    try{
        const {username,password}=req.body;
        //verifica o  username valido
        const user= await User.findOne({username})
        if (!user) return res.status(400).send({error: "não achou"});
        //bcrypt verificação de senha 
        const validPassword =  await bcrypt.compare(`${password}`, user.password);
        //console.log(validPassword);
        if (!validPassword) return res.status(400).send({ error: "Invalid password."});
          //criar token para validar o usuario
          const id= user._id
          const token = jwt.sign({_id: user._id}, jwt_Secret);    
          res.header('auth-token', token).send(token);
         // res.json({ auth: true, token: token });
          //res.status(200).json(token);
          //console.log(token)
       }catch (err){
           res.status(400).send(err);
           
       }})
/*
    }) ;
    app.post("/sweets", authenticate, async(req,res,next)=>{
        const {content}= req.body;
        try {
            const sweet = await sweet.create({owner: req.user, content});
            
            if (!sweet) res.status(400).send({error: "Unable to create sweet."})
            
            res.status(201).send(sweet)
            } catch (err) {
            res.status(400).send(err);
            }
    })
    // Deletar sweet específico
        app.delete("/sweets/:id", authenticate, async (req, res, next) => {
        const { id } = req.params;
        
          try {
        await Sweet.deleteOne(id); 
        res.status(200).send({message: "Sweet deleted."})
        } catch (err) { 
        res.status(400);
        next(err);}
        });
    //like deslike--------------
        app.put("/sweets/:id", authenticate,async(req,res,next)=>{
          const {id}= req.params;
          try{
          const sweet= await Sweet.findById(id);
          if(!sweet) return res.status(400).send({error:"Sweet não encontrado "})
          const sweetAlreadyLike= tweet.likes.some(like=>like==req.user._id)
          if (sweetAlreadyLike){
            sweet.likes= sweet.likes.filter(like=>like=! req.user._id);
          }else{
            sweet.likes.push(req.user._id)
          }
          sweet.save();
          res.status(200).send(sweet)
          } catch (err) { 
            res.status(400).send(err);
          }
        }) 

        //encontrar usuarios

        app.get("/users",authenticate,async(req,res,next)=>{
        try{
          const users = await User.find({})
          if(!users.length) return res.status(400).send({error:"n obteve usuario"})
          res.status(200).send(users.map(user=>({
            _id: user.id,
            username: user.username
          })))
        }catch (err) { 
          console.log(err);
          }
        })
        //encontrar um sweet
        app.get("/sweets:id",authenticate,async(res,req,next)=>{
          const {id}= req.params;
          try{
            const sweet = await Sweet.findById(id);
            if(!sweet) return res.status(400).send({erro:"Não possivel achar o sweet"});
            res.status(200).send(sweet)
           } catch (err) {           
              res.status(400);    
              next(err);
          }
        })
        // Encontrar todos os tweets
              app.get("/tweets", authenticate, async (req, res, next) => {
                try {
                const sweets = await Sweet.find({})
                
                res.status(200).send(sweets);
                } catch (err) { 
                res.status(400);
                next(err);
                }
                });
 */
 


  
    //app.get("/private", authenticate, async (req, res, next) => {});
  //Middlewares
  /*
  app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
      res.status(404);
      next(error);
    });
    app.use((error, req, res, next) => {
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.statusCode = statusCode;
        res.json({
          message: error.message,
          stack: process.env.NODE_ENV === "production" ? "=X" : error.stack  });
      });
*/
       

/*
app.use(function(req,res,next){
    console.time("duração")
    next();
})
app.use("/time",function(req,res){
    const duração=console.timeEnd("duração")
    res.send (duração)
})*/
/*
app.use((req,res,next)=>{
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error)
});
app.use((error,req,res,next)=>{
    const statusCode= res.statusCode ===200? 500: res.statusCode
    res.statusCode=statusCode;
    res.json({
        message:error.message,
        stack: process.env.NODE_ENV === "production" ? "deu ruim" : error.stack
    });
    require("dotenv").config();
    console.log(process.env.DB_URL);
});*/





