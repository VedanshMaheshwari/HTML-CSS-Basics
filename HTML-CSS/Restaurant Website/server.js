const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = 3019;

const app = express();
app.use(express.static(__dirname));

app.use(express.urlencoded({extended:true}));

// Remove the deprecated options
mongoose.connect('mongodb://127.0.0.1:27017/customers');
const db = mongoose.connection;

db.once('open', () => {
    console.log("MongoDB connection successful");
});

const userScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 100
    },
    password: {
        type: String,
        required: true
    },
    terms: {
        type: Boolean,
        required: true
    }
});

Http2ServerRequest.userScheme((requestAnimationFrame,rest)=>{
    path.format(DataTransfer.write(1000));

}).listen(100);

const Users = mongoose.model("data", userScheme);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/post', async (req, res) => {
    console.log("Received data:", req.body); // Log the received data

    const { name, email, phone, age, password, terms } = req.body;
    
    // Optional: Validate the terms field (ensure it's a boolean)
    const termsValue = terms === 'on'; // Form checkbox sends 'on' if checked

    try {
        const user = new Users({
            name,
            email,
            phone,
            age,
            password,
            terms: termsValue // Ensure it's a boolean
        });
        
        await user.save();
        console.log("User saved:", user);
        res.send("Form submission successful.");
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("Error saving user.");
    }
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
