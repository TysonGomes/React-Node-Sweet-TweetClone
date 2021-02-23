const mongoose = require("mongoose");

const User= new mongoose.Schema({
  username:{
      type: String,
      required: true
    },
   password:{
     type: String,
     require : true,
     max: 1024
   },
    sweets:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Sweet'
    }]
   },
   {timestamps:true}
)
module.exports=mongoose.model('User',User)