import mongoose from "mongoose";
const { Schema } = mongoose;
const credentialSchema = new Schema({
    webname: {type: String},
    user: {
        type:String
    },
    password: {
        type: String,
        minlength: [4, 'Password Must at least 3 Charaters long']
    }
});

const Credential = mongoose.model('Credentials', credentialSchema);
export default Credential;