const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fsc-taskmanagercluster.yk5pk.mongodb.net/?retryWrites=true&w=majority&appName=FSC-TaskManagerCluster`
    );
    console.log("Connected to database successfully 🔥");
};

module.exports = { connectToDatabase };
