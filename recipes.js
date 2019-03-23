const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
.then(() => {
  console.log('Connected to Mongo!');
 }).catch(err => {
  console.error('Error connecting to mongo', err);
 });
  
  const recipeSchema = new Schema({
    title:{type:String, required: true, unique: true} , 
    level:{type:String, enum:['Easy Peasy','Amateur Chef','UltraPro Chef' ]},
    ingredients:Array,
    cuisine:String,
    dishType:{type:String, default: 'Breakfast - Dish - Snack - Drink - Dessert - Other'},
    image:{type:String, default:'https://images.media-allrecipes.com/images/75131.jpg'},
    duration: {type:Number, min: 0},
    creator: String,
    created: {type:Date, default: Date.now}
  });

  const Recipe = mongoose.model('Recipe', recipeSchema);


  // Recipe.create({
  //   title: 'Orange and Milk-Braised Pork Carnitas',
  //   level: 'UltraPro Chef',
  //   ingredients: ['3 1/2 pounds boneless pork shoulder, cut into large pieces', '1 tablespoon freshly ground black pepper', '1 tablespoon kosher salt, or more to taste', '2 tablespoons vegetable oil', '2 bay leaves', '2 teaspoons ground cumin', '1 teaspoon dried oregano', '1/4 teaspoon cayenne pepper', '1 orange, juiced and zested'],
  //   cuisine: 'American',
  //   dishType: ['Dish'],
  //   image: 'https://images.media-allrecipes.com/userphotos/720x405/2280918.jpg',
  //   duration: 160,
  //   creator: 'Chef John'
  // })
  // .then(recipe => { console.log('The recipe is saved and its title is: ', recipe.title) })
  // .catch(err => { console.log('An error happened:', err) });

  

  Recipe.insertMany(data)
  .then(recipe => { console.log('The recipes are saved and its title is: ', recipe) })
  .catch(err => { console.log('An error happened:', err) });                                                          

Recipe.find({title: 'Carrot Cake'},{}, {}).then(documents => {
  debugger
  Recipe.remove(documents)
  .then(recipe => { console.log('Carror cake deleted..')});
})


Recipe.updateOne({title: 'Rigatoni alla Genovese'},{duration: '100'})
.then(recipe => { console.log('The duration updated..')});

