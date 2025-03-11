import mongoose from "mongoose";
const { Schema } = mongoose;
const credentialSchema = new Schema({
    web: {
        type: String,
        required: true
    },
    user: {
        type:String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
});

const Credential = mongoose.model('Credentials', credentialSchema);
export default Credential;