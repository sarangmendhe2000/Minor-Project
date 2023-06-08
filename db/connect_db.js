const mongoose =require('mongoose');
const database="mongodb+srv://saloni_mehta:Silkymehta%40123@cluster0.vveoula.mongodb.net/?retryWrites=true&w=majority";

const connectDB=()=>{
    //for local database connection
    return mongoose.connect("mongodb://0.0.0.0:27017/AdmissionPortal")

    //for cloud
    // return mongoose.connect(database)
    .then(()=>{
        console.log('Connect Successfully')
    })
    .catch((err)=>{
        console.log(err)
    })
}



module.exports = connectDB