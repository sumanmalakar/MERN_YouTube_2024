import express from "express";
import mongoose from "mongoose";
import { Contact } from "./ContactModal.js";
import bodyParser from "express";
import cors from 'cors'

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin:true,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}))

mongoose
  .connect(
    "mongodb+srv://sumanmalakar2022:OOXdNLG37a3gnDr1@cluster0.vjfokig.mongodb.net/",
    {
      dbName: "MERN_Tutorial_YouTube_2024",
    }
  )
  .then(() => console.log("MongoDb Connected..!"))
  .catch((err) => console.log(err));

// get All Contacts
app.get("/", async (req, res) => {
  try {
    let contact = await Contact.find().sort({createdAt:-1});

    res.json({ message: "All Contacts", contact });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Add Contact
app.post("/", async (req, res) => {
  const { name, gmail, phone } = req.body;
  try {
    let contact = await Contact.findOne({ gmail });

    if (contact) return res.json({ message: "Contact already exist..!" });

    contact = await Contact.create({ name, gmail, phone });
    res.json({ message: "Contact Saved Successfully..!", contact });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Edit Contact
app.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    let contact = await Contact.findById(id)
    if(!contact) return res.json({message:'contact not exist'})
    let data = await Contact.findByIdAndUpdate(id, updatedData, { new: true });
    res.json({ message: "Contact has been updated..!", data });
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Delete Contact
app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let contact = await Contact.findById(id);
    if (!contact) return res.json({ message: "Contact not exist...!" });
    await contact.deleteOne();
    res.json({ message: "Your Contact has been deleted..!" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

app.listen(2000, () => console.log("Server is running on port 2000"));

// username = sumanmalakar2022
// password = OOXdNLG37a3gnDr1
