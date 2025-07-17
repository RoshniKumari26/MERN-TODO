const mongoose=require("mongoose");

const conn=async()=>{
    try{
    await mongoose
        .connect
        ("mongodb+srv://roshnikumari4475:roshni26mango@cluster0.tm0qp2r.mongodb.net/roshnikumari4475");
    
    
        console.log("Connected");
    }
catch(error){
console.error("Not Connected",error);

}
};
conn();