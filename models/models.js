const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: String,
    email: String,
    password: String,
    weightNow: Number,
    height: Number,
    dailyCalories: Number,
    gender: String,
    age: Number,
    vip: Boolean,
    registerDate: Date,
})

const mealSchema = new Schema({
    name: String,
    calories: Number,
    protein: Number,
    fat: Number,
    Carbohydrates: Number,
})

const oneMealSchema = new Schema({
    quantity: Number,
    calories: Number,
    protein: Number,
    fat: Number,
    carbohydrates: Number,
    user:{type: Schema.Types.ObjectId, ref:'User'},
    date: Date,
})

const User    = mongoose.model('User', userSchema)
const Meal    = mongoose.model('Meal', mealSchema)
const OneMeal = mongoose.model('OneMeal', oneMealSchema)

module.exports = {User, Meal, OneMeal}
