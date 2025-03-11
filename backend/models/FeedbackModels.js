import mongoose from "mongoose";
const {Schema} = mongoose;
const feedbackSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    rating: {
        type:String,
        required: true
    },
    review: {
        type: String,
        required: true
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;