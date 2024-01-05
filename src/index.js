const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require("./routes/user");
const cors = require("cors");
dotenv.config();

// Create an Express app
const app = express();
app.use(cors())

app.use((res, req, next) => {
  app.use(cors({origin : "http://localhost:3000"}));
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Request-Headers",
  "access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,authorization,content-type,access-control-allow-origin");
  res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers,access-control-allow-origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  
    next();
} )




app.use(express.json());
// MongoDB connection URI (replace 'your-db-uri' with your actual MongoDB URI)
const mongoURI ="mongodb+srv://kwanelendaba113:LTSNsskk113@cluster0.z5iwho0.mongodb.net/?retryWrites=true&w=majority";



// Connect to MongoDB
mongoose.connect(mongoURI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB!');
  // You can start defining your schemas and models or perform other operations here
});

app.use("/api/users",userRouter)
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
