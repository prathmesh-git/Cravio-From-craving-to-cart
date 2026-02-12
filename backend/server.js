require("dotenv").config();
const app = require("./src/app.js");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongo Connected");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);

        });
    })
    .catch(err => console.log(err));