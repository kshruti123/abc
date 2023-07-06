const Category = require("../models/CategoryModel");
const getCategories = async (req, res, next) => {
  // Farmer.create({name:"Raju"})
  // res.send("Handling category routes, e.g. search for categories")
  try {
    const categories = await Category.find({}).sort({ name: "asc" }).orFail();
    res.json(categories);
  } catch (er) {
    next(er);
  } // this endpoint is to get all the fields fromthe db
};
const newCategories = async (req, res, next) => {
  try {
    //res.send(!!req.body);//!! for boolean value
    const { category } = req.body;
    if (!category) {
      res.status(400).send("category input is required");
    }
    // res.send(category);
    const categoryExists = await Category.findOne({ name: category });
    if (categoryExists) {
      res.status(400).send("category already exists");
    }else{
      const categoryCreated = await Category.create({
        name:category
      })
      res.status(201).send({categoryCreated:categoryCreated});
    }
  } catch (er) {
    next(er);
  }
};
const deleteCategories =async (req, res, next) =>{
  //return res.send(req.params.category)
  try{
if(req.params.category!=="Choose category"){
  const categoryExists=await Caategory.findOne({
    name: decodeURIComponent(req.params.category)
  }).orFail()
  await categoryExists.remove()
  res.json({categoryDeleted:true})
}
  }
  catch(er){
    next(er)
  }
}
module.exports = { getCategories, newCategories,deleteCategories };
