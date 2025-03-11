import express from 'express'
import mongoose from 'mongoose'
import Credential from './models/CredentialsModels.js'
import Feedback from './models/FeedbackModels.js'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config(); // dotenv is sucessful
const app = express()
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("sucessfully connected to the database");
}).catch((err) => console.log(`There is an error connecting the database ${err}`));

app.use(cors());
app.use(express.json()); // using middleware to take data from the client side

// Remove those console_log in production
// This block is for saving the data
app.post('/post' , async (req, res) => {
  const { web, user, pass } = req.body;
  const isThere = await Credential.findOne(req.body);
  try {
      if (!web || !user || !pass) {
        res.json({message: "Input fields must not be empty"});
      }else{
        if (isThere) {
          res.status(409).json({message: "Credentials already exists"});
        }else{
          console.log(req.body);
          const Creds = new Credential({web, user, pass});
          await Creds.save();
          res.status(200).json({message:"Creds have been Saved"});
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("There is an error Saving the Data");
    }
});

// this block is for retriving the data
app.get('/retrive', async (req, res) => {
  try {
    const credentials = await Credential.find(req.body);
    res.status(200).json(credentials);
  } catch (error) {
    console.log(error);
    res.status(500).send("There is an error Retriving the data");
  }
});

// delete request block
app.delete('/delete', async(req,res) => {
  try {
    const isThere = await Credential.findOne(req.body);
    if (isThere) {
      await Credential.deleteOne(req.body);
      res.json({
        message: "Delete sucessfull",
      });
    }else{
      res.status(404).json({message: "No Matching data found"});
    }
  } catch (err) {
    console.log("An error has been occured in delete", err);
    res.send("There is an error in delete request");
  }
});

// Edit request block 

app.delete('/edit', async(req,res) => {
  try {
    const isThere = Credential.findOne(req.body);
    if (isThere) {
      await Credential.deleteOne(req.body);
      res.json({
        message: "Edit Request Accepted",
        data: req.body
      });
    }else{
      res.status(404).json({message: "Requested Credentials Not Found"});
    }
  } catch (e) {
    res.send("There is an Error in Edit Request");
    console.log(`Error: ${e}`);
  }
})

// Feedback form Data
app.post('/feedback', async(req,res) => {
  const {email, rating, review} = req.body;
  try {
    const feedback = new Feedback({email, rating, review});
    await feedback.save();
    res.status(200).json({
      message: "Feedback Recived"
    });
  } catch (e) {
    console.log("error", e);
    res.send("Error Encountered");
  }
}
);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});