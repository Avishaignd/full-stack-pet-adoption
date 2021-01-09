const Pet = require("../models/petSchema");
const User = require('../models/userSchema')
const Image = require('../models/imageSchema')
const multer = require("multer");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("connected");
// });

const getPets = async (req, res) => {
  Pet.find(function (err, pets) {
    if (err) return console.error(err);
    res.send(pets);
  });
};

const getPetById = (req, res) => {
  // const pet = new Pet()
  // const foundPet = pet.findById(req.params.id)
  // res.json(foundPet);
  // const query = req.query
  // let petArray = []
  // Pet.find(function (err, pets) {
  //     if (err) return console.error(err);
  //     for (const key in query){
  //         pets.forEach((pet) => {
  //             if ()
  //         })
  //     }
  //   })
  // console.log(req.query);
  res.send("ok");
};

const deletePetById = (req, res) => {
  const { id } = req.params;

  const pet = new Pet();
  const petList = pet.deleteById(id);

  res.json(petList);
};

const getPetsCarousel = async (req, res) => {
  const images = await Image.find()
  res.send(images)
}

const addNewPet = (req, res) => {
  const newPet = req.body;
  const pet = new Pet(newPet);
  pet.save(function (err, pet) {
    if (err) return console.error(err);
    console.log(pet);
  });
  res.send(newPet);
};

const adoptPet = async (req, res) => {
  const { pet, user } = req.body;
  const found = await Pet.findOne({_id: pet})
  found.ownerId = user
  found.petStatus = "Adopted"
  await found.save()
  res.send(found)
};

const editPet = async (req, res) => {
  const { id } = req.params
  const updates = req.body
  const found = await Pet.findOneAndUpdate({ _id : id.slice(1) }, updates, {new: true}) 
  await found.save()
  res.send(found)
}

const updatePetStatus = async (req, res) => {
  const { pet, user, updateType } = req.body
  const found = await Pet.findOne({_id: pet})
  if (updateType === "Return"){
    found.ownerId = ""
    found.petStatus = "Not adopted"
    await found.save()
    res.send(found)
  } else if (updateType === "Foster") {
    found.ownerId = user
    found.petStatus = "Fostered"
    await found.save()
    res.send(found)
  } else if (updateType === "Save") {
    const updateUser = await User.findOne({_id: user})
    updateUser.savedPets.push(pet)
    found.petStatus = "Saved"
    found.ownerId = user
    await updateUser.save()
    await found.save()
    res.send(found)
  } else if (updateType === "Unsave") {
    const updateUser = await User.findOne({_id: user})
    const filteredList = updateUser.savedPets.filter(item => {
      if (item !== pet) {return item}
    })
    found.petStatus = "Not Adopted"
    found.ownerId = ""
    updateUser.savedPets = filteredList
    await updateUser.save()
    await found.save()
    res.send(found)
  }
};

module.exports = {
  getPetById,
  deletePetById,
  addNewPet,
  updatePetStatus,
  getPets,
  adoptPet,
  getPetsCarousel,
  editPet
};
