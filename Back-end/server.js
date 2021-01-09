const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");
require('dotenv').config()
const Pet = require('./models/petSchema')
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const passport = require("passport");
const userRouter = require("./routes/userRouter");
const petRouter = require("./routes/petRouter");
const cloudinary = require('cloudinary').v2
const mongoose = require("mongoose");
const mongoUrl = process.env.MONGO_URL
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*/*');
    res.header('Access-Control-Expose-Headers','Authorization');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(cors());
app.use(express.json());
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './images')
    },
    filename: function(req, file, cb) {
      console.log(file)
      cb(null, file.originalname)
    }
  })


const upload = multer({ storage });
app.use("/api/pets", petRouter);
app.use("/api/users", userRouter);
mongoose.connect(mongoUrl).then(console.log("Connected"))
  .catch((err) => console.log(err));

app.post("/AddPet", upload.single("image"), (req, res) => {
    const path = req.file.path
    const uniqueFilename = new Date().toISOString()
    cloudinary.uploader.upload(
        path,
        { public_id: `pet_adoption/${uniqueFilename}`},
        function(err, image) {
          if (err) return res.send(err)
          console.log('file uploaded to Cloudinary')
          fs.unlinkSync(path)
          const newPet = req.body;
          const pet = new Pet(newPet)
          pet.image = image.secure_url
          pet.save((function (err, pet) {
              if (err) return console.error(err);
              console.log(pet);
            }))
        }
      )
    res.send('Pet Added')
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
