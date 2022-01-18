const fs = require('fs')
const {Meal} = require('../models/models')
var colors = require('colors/safe');

function CheckAddFoodToDB(){
    console.log("Check executed")
    Meal.find().then((meals)=> {
        console.log(colors.green("Food in Data Base = " + meals.length))
        if (meals.length == 0) {
            console.log("DB is empty")
            let AllFood = []
            fs.readFile('./AllFood2.txt', (err, data) => {
                if (err) throw err
                const A = data.toString().split("\r\n")
                for (let i in A) {
                    AllFood.push(A[i].split(";"))
                }
                let s = 1
                let k = 1
                for (let i in AllFood) {
                    if (!isNaN(AllFood[i][1]) && !isNaN(AllFood[i][2]) && !isNaN(AllFood[i][3]) && !isNaN(AllFood[i][4])) {
                        const meal = new Meal({
                            name: AllFood[i][0],
                            calories: Number(AllFood[i][4]),
                            protein: Number(AllFood[i][1]),
                            fat: Number(AllFood[i][2]),
                            Carbohydrates: Number(AllFood[i][3])
                        })
                        console.log(colors.green(`uploaded №${i} meal`))
                        meal.save()
                        k++
                    }else{
                        console.log(colors.red(`Skipped ${s} meals`))
                        s++
                    }
                }
            })
            console.log("Food list uploaded")
        }
    })
}

module.exports  = CheckAddFoodToDB