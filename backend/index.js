const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
require("dotenv").config();


const port = process.env.PORT || 5000;


const app = express();
app.use(express.json());
app.use(cors({ origin: true }));


app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": process.env.chatAPIKEY } }
    );
    return res.status(r.status).json(r.data)
    
  } catch (e) {
    return  res.status(e.response.status).json(e.response.data)
    
  }
});

app.get("/", (req, res) => {
    res.send("V-Chat is running");
  });
  
  app.listen(port, () => {
    console.log(`V-Chat server is running on port ${port}`);
  });