import mongoose from "mongoose";

export async function connectDB() {
  try {
    // assuring that mongoose will get a connection string
    await mongoose.connect(`${process.env.MONGO_URI!}${process.env.DB_NAME!}`);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MONGO DB CONNECTED!!");
    });

    connection.on("error", (err) => {
      console.log(
        "Mongodb connection error, please make sure db is up running ",
        err
      );
      process.exit();
    });
    
  } catch (error) {
    console.log("Something went wrong while connecting to database");
    console.log(error);
  }
}
