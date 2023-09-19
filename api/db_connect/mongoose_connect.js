import mongoose from 'mongoose';

const connectDB = async () => {
    
    // connect to the mongoose cluser and collections
    mongoose
    .connect(process.env.MONGO_URL, {})
    .then(console.log("connected to MongoDB"))
    .catch((err) => console.log(err));

    // To handle errors after initial connection was established, you should listen for error events on the connection.
    const db = mongoose.connection;
    db.on("error", (error) => {
        console.log('error found here')
        console.error(error)
        }
        );
    db.once("open", () => console.log("connected to Database"));
};

export default connectDB;