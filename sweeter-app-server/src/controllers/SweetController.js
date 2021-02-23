const Sweet = require("../models/Sweet");
const mongoose= require ('mongoose');


module.exports={
     async sweetPost (req,res,next){
        const {content}= req.body;
        

         try {
            const sweet = await Sweet.create({owner: req.user, content});
            
            if (!sweet) res.status(400).send({error: "Unable to create sweet."})
            
            res.status(201).send(sweet)
            } catch (err) {
            res.status(400).send(err);
            };
        },  
    async likeDeslike(req,res,next){
        const {id}= req.params;
          try{
          const sweet= await Sweet.findById(id);
          if(!sweet) return res.status(400).send({error:"Sweet não encontrado "})
          const sweetAlreadyLike= sweet.likes.some(like=>like==req.user._id)
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
        },
     async findSweet(req,res,next){
        const {id}= req.params;
        try{
            const sweet = await Sweet.findById(id);
            if(!sweet) return res.status(400).send({erro:"Não possivel achar o sweet"});
            res.status(200).send(sweet)
           } catch (err) {           
              res.status(400);    
              next(err);
          }
     },
     async sweetDelete (req,res,next){
        const { id } = req.params;
        try {
      await Sweet.deleteOne(id); 
      res.status(200).send({message: "Sweet deleted."})
      } catch (err) { 
      res.status(400);
      next(err);
        }
     },

     async sweetAll (req,res,next){
         try{
          const sweets = await Sweet.find({})
          res.status(200).send(sweets);
         }catch{
          res.status(400);
          next(err);
         }
     }
}
     