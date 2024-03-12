import mongoose from "mongoose";

const ConnectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database connected with host: ${connect.connection.host}`);
  } catch (error) {
    console.error(`Unable to connect with database : ${error.message}`);
    process.exit(1);
  }
};


export default ConnectDb;