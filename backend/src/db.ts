import mongoose, {model,Schema} from "mongoose";

mongoose.connect("mongodb+srv://shivkasht2001:Shiwansh2001@cluster0.zsl2z.mongodb.net/brainly").then(()=>{
    console.log("DB connected successfully");
}).catch((e)=>{
    console.log("DB connection failed",e);
});

const UserSchema = new Schema({
    userName : {type : String, unique : true,required :true},
    password : {type : String}
})
export const UserModel = mongoose.model("user",UserSchema);

const ContentSchema = new Schema({
    title:{type: String},
    link:{type: String},
    type:{type: String},
    tags:[{type:mongoose.Types.ObjectId,ref:"Type"}],
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true}
})
export const ContentModel = model("content",ContentSchema);

const LinkSchema = new Schema({
    hash:{type:String},
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true,unique:true}
})
export const LinkModel = model("link",LinkSchema);