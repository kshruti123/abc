const Veterinary = require("../models/VeterinaryModel");
const getVeterinaries = async (req, res, next) => {
  try {
    const { area } = req.query; // Assuming the area is passed as a query parameter, e.g., /veterinaries?area=xyz

    const veterinaries = await Veterinary.find({ area: area });
    return res.json(veterinaries);
  } catch (error) {
    next(error);
  }
};
  module.exports = getVeteneries;