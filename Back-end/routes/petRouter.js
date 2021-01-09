const express = require('express')
const router = express.Router()
const {authenticateToken} = require('../utils/tokenGen')
const {getPetById, deletePetById,
    updatePetStatus, addNewPet, getPets, adoptPet, getPetsCarousel, editPet} = require("../controls/petCtrl")

router.get("/", authenticateToken, getPets);

// router.get("/carousel", getPetsCarousel);

router.get("/:id", getPetById);

router.delete("/:id", authenticateToken, deletePetById);

router.post("/", authenticateToken, addNewPet);

router.put("/adopt/:id", authenticateToken, adoptPet);

router.put("/return/:id", authenticateToken, updatePetStatus);

router.put("/update/:id", editPet);

router.put("/foster/:id", authenticateToken, updatePetStatus);

router.put("/save/:id", authenticateToken, updatePetStatus);

module.exports = router;