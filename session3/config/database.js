const mongoose = require("mongoose");

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect('mongodb+srv://hamza:WgGHwxyGIqoD7IDc@atlascluster.jphjrc6.mongodb.net/generator')
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

// mongoose.connect('mongodb+srv://hamza:<password>@atlascluster.jphjrc6.mongodb.net/generator', ()=> {
//   console.log('connected')
// }, console.log('error'))
