import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
import rateLimeter from "./middleware/rateLimiter.js";

dotenv.config();
      
const port = process.env.PORT || 8080;
const app = express();

// what is endpoint
// An endpoint is an combination of  URL and HTTP method that let the client
// interact with a specific resource

// middleware
app.use(express.json());
app.use(cors({
  origin: "*" 
}));

// ratelimiter middleware
// app.use(rateLimeter)  

app.use("/api/notes", notesRoutes);
        
connectDB().then(() => {
  app.listen(port, () => {
    console.log("app is listening");
  });
});

// mongodb+srv://sarthakzunjurke:SpK3kGYACyvP7swX@cluster0.8nnrl48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
