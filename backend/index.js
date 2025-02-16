import express from 'express'
import mongoose from 'mongoose'
import Credential from './models/CredentialsModels.js'
import dotenv from 'dotenv'

dotenv.config(); // dotenv is sucessful
const app = express()
const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("sucessfully connected to the database");
}).catch((err) => console.log(`There is an error connecting the database ${err}`));

app.use(express.json()); // using middleware to take data from the client side

// Remove those console_log in production
// This block is for saving the data
app.post('/' , async (req, res) => {
  const { webname, user, password } = req.body;
  try {
      console.log(req.body);
      const Creds = new Credential({
        webname: webname,
        user: user,
        password: password
      });
      await Creds.save();
      res.status(200).json({message:"Creds have been Saved",data:Creds}); 
    } catch (err) {
      console.log(err);
      res.status(500).send("There is an error Saving the Data");
    }
});

// this block is for retriving the data
app.get('/', async (req, res) => {
  try {
    const credentials = await Credential.find();
    res.status(200).json(credentials);
  } catch (error) {
    console.log(error);
    res.status(500).send("There is an error Retriving the data");
  }
});

// delete request block
app.delete('/', async(req,res) => {
  try {
    const isThere = await Credential.findOne(req.body);
    if (isThere) {
      await Credential.deleteOne(req.body);
      res.json({
        message: "Delete sucessfull",
        data: req.body
      });
    }else{
      res.status(404).json({message: "No Matching data found"});
    }
  } catch (err) {
    console.log("An error has been occured in delete", err);
    res.send("There is an error in delete request");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});