const {Meal} = require('../models/models')

function get_food_db(){
    console.log("started food downloading")
    let a = []
    Meal.find().then((meals)=> {
        console.log("all food is downloaded")
        for(let e in meals){
            a.push([meals[e]['name'], meals[e]['calories'], meals[e]['protein'], meals[e]['fat'],meals[e]['Carbohydrates']])
        }
    })
    return a
}
module.exports = get_food_db
