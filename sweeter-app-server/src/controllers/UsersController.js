const mongoose= require ('mongoose');
const User = require('../models/User');
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_Secret = process.env.JWT_SECRET;

module.exports={
    async store(req,res,next){
            //res.send("certo resgiste")}
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
        },


      async login (req,res,next){
        // res.send("certo resgiste")}
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
                res.json({ auth: true, token: token });
                //res.header('auth-token', token).send(token);
                //json({ auth: true, token: token });
                
                //res.status(200).json(token);
              
             }catch (err){
                 res.status(400).send(err);
                 
             }
      
          },
      async finduser(req,res,next){
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
      } ,
      async findOneUser(req,res,next){
        const {id}= req.params;
        try{
            const user = await User.findById(id);
            if(!user) return res.status(400).send({erro:"Não possivel achar o usuario"});
            res.status(200).send(user)
           } catch (err) {           
              res.status(400);    
              next(err);
          }
     }    
      



    }
