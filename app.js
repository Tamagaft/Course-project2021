const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const {User, OneMeal} = require('./models/models')
const bcrypt = require('bcrypt')
const secretKey = 'Fuckingawasomesecretkeyfortokens'
const CheckAddFoodToDB = require('./services/add-food')
const get_food_db = require('./services/get-food')
const colors = require('colors')
const {subDays,endOfDay} = require('date-fns')
const db_api = require('db_creds')


let all_food = get_food_db()

app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser(secretKey))


app.use(express.static(path.resolve(__dirname,'client')))


mongoose.connect(db_api, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:true,})
    .then(()=> console.log(colors.green("MONGODB Connected")))
    .catch((err) => console.log(err))

//всё работает, надо убрать комментарий после загрузки на сервер
//CheckAddFoodToDB()


app.get('/api/food', (req,res)=> {
    //a = check_auth(req.cookies['user'])
    const id = req.cookies['user']
    if (id) {
        User.findById(id, (err, user) => {
            if (err) {
                res.status(401).json({auth: false})
            }
            if (user) {
                res.status(200).json({all_food: all_food, cal: user['dailyCalories'], auth: true})
            }
        })
    }else{
        res.status(401).json({auth: false})
    }
})

app.get('/api/logout',(req,res)=>{
    console.log(req.cookies)
    res.status(200).clearCookie('user').json({logout:true})
})

app.get('/api/loadstat',(req,res)=>{
    const id = req.cookies['user']
    const today7 = endOfDay(subDays(Date.now(),6))
    const today6 = endOfDay(subDays(Date.now(),5))
    const today5 = endOfDay(subDays(Date.now(),4))
    const today4 = endOfDay(subDays(Date.now(),3))
    const today3 = endOfDay(subDays(Date.now(),2))
    const today2 = endOfDay(subDays(Date.now(),1))
    const today1 = endOfDay(Date.now())
    let d = new Date();
    d.setDate(d.getDate() - 1);
    const day1 =  {date:`${d.getDate()+1}/${d.getMonth()+1}`,q:0,calories:0,protein:0,fat:0,carbohydrates:0}
    d.setDate(d.getDate() - 1);
    const day2 =  {date:`${d.getDate()+1}/${d.getMonth()+1}`,q:0,calories:0,protein:0,fat:0,carbohydrates:0}
    d.setDate(d.getDate() - 1);
    const day3 =  {date:`${d.getDate()+1}/${d.getMonth()+1}`,q:0,calories:0,protein:0,fat:0,carbohydrates:0}
    d.setDate(d.getDate() - 1);
    const day4 =  {date:`${d.getDate()+1}/${d.getMonth()+1}`,q:0,calories:0,protein:0,fat:0,carbohydrates:0}
    d.setDate(d.getDate() - 1);
    const day5 =  {date:`${d.getDate()+1}/${d.getMonth()+1}`,q:0,calories:0,protein:0,fat:0,carbohydrates:0}
    d.setDate(d.getDate() - 1);
    const day6 =  {date:`${d.getDate()+1}/${d.getMonth()+1}`,q:0,calories:0,protein:0,fat:0,carbohydrates:0}
    d.setDate(d.getDate() - 1);
    const day7 =  {date:`${d.getDate()+1}/${d.getMonth()+1}`,q:0,calories:0,protein:0,fat:0,carbohydrates:0}
    d.setDate(d.getDate() - 1);

    OneMeal.find({user:id, date:{
            $gte: subDays(new Date(),6),
            $lte: endOfDay(new Date())
        }}).then(list=>{
        for(let i in list){
            if(list[i]['date'] < today7 ){
                day7['q']++
                day7['calories']      = Number(((day7['calories']      * 100) + (list[i]['calories']      * 100)) / 100)
                day7['protein']       = Number(((day7['protein']       * 100) + (list[i]['protein']       * 100)) / 100)
                day7['fat']           = Number(((day7['fat']           * 100) + (list[i]['fat']           * 100)) / 100)
                day7['carbohydrates'] = Number(((day7['carbohydrates'] * 100) + (list[i]['carbohydrates'] * 100)) / 100)
            }else if(list[i]['date'] < today6){
                day6['q']++
                day6['calories']      = Number(((day6['calories']      * 100) + (list[i]['calories']      * 100)) / 100)
                day6['protein']       = Number(((day6['protein']       * 100) + (list[i]['protein']       * 100)) / 100)
                day6['fat']           = Number(((day6['fat']           * 100) + (list[i]['fat']           * 100)) / 100)
                day6['carbohydrates'] = Number(((day6['carbohydrates'] * 100) + (list[i]['carbohydrates'] * 100)) / 100)
            }else if(list[i]['date'] < today5){
                day5['q']++
                day5['calories']      = Number(((day5['calories']      * 100) + (list[i]['calories']      * 100)) / 100)
                day5['protein']       = Number(((day5['protein']       * 100) + (list[i]['protein']       * 100)) / 100)
                day5['fat']           = Number(((day5['fat']           * 100) + (list[i]['fat']           * 100)) / 100)
                day5['carbohydrates'] = Number(((day5['carbohydrates'] * 100) + (list[i]['carbohydrates'] * 100)) / 100)
            }else if(list[i]['date'] < today4){
                day4['q']++
                day4['calories']      = Number(((day4['calories']      * 100) + (list[i]['calories']      * 100)) / 100)
                day4['protein']       = Number(((day4['protein']       * 100) + (list[i]['protein']       * 100)) / 100)
                day4['fat']           = Number(((day4['fat']           * 100) + (list[i]['fat']           * 100)) / 100)
                day4['carbohydrates'] = Number(((day4['carbohydrates'] * 100) + (list[i]['carbohydrates'] * 100)) / 100)
            }else if(list[i]['date'] < today3){
                day3['q']++
                day3['calories']      = Number(((day3['calories']      * 100) + (list[i]['calories']      * 100)) / 100)
                day3['protein']       = Number(((day3['protein']       * 100) + (list[i]['protein']       * 100)) / 100)
                day3['fat']           = Number(((day3['fat']           * 100) + (list[i]['fat']           * 100)) / 100)
                day3['carbohydrates'] = Number(((day3['carbohydrates'] * 100) + (list[i]['carbohydrates'] * 100)) / 100)
            }else if(list[i]['date'] < today2){
                day2['q']++
                day2['calories']      = Number(((day2['calories']      * 100) + (list[i]['calories']      * 100)) / 100)
                day2['protein']       = Number(((day2['protein']       * 100) + (list[i]['protein']       * 100)) / 100)
                day2['fat']           = Number(((day2['fat']           * 100) + (list[i]['fat']           * 100)) / 100)
                day2['carbohydrates'] = Number(((day2['carbohydrates'] * 100) + (list[i]['carbohydrates'] * 100)) / 100)
            }else if(list[i]['date'] < today1) {
                day1['q']++
                day1['calories']      = Number(((day1['calories']      * 100) + (list[i]['calories']      * 100)) / 100)
                day1['protein']       = Number(((day1['protein']       * 100) + (list[i]['protein']       * 100)) / 100)
                day1['fat']           = Number(((day1['fat']           * 100) + (list[i]['fat']           * 100)) / 100)
                day1['carbohydrates'] = Number(((day1['carbohydrates'] * 100) + (list[i]['carbohydrates'] * 100)) / 100)
            }
        }
        return res.status(200).json([day1,day2,day3,day4,day5,day6,day7])
    })
})

app.post('/api/changeage',(req,res)=>{
    User.findById(req.cookies['user'], (err,user)=>{
        user.age = Number(req.body['age'])
        if (user.gender == 'male') {
            user.dailyCalories = 5 + (10*user.weightNow) + (6.25 * user.height) - (5*user.age)
        }else if(user.gender == 'female'){
            user.dailyCalories = (10 * user.weightNow) + (6.25 * user.height) - (5 * user.age) - 161
        }
        user.save().then(resp=>{
            res.status(200).json({update: true})
        })
    })
})

app.post('/api/changeweight',(req,res)=>{
    User.findById(req.cookies['user'],(err,user)=>{
        user.height = Number(req.body['height'])
        if (user.gender == 'male') {
            user.dailyCalories = 5 + (10*user.weightNow) + (6.25 * user.height) - (5*user.age)
        }else if(user.gender == 'female'){
            user.dailyCalories = (10 * user.weightNow) + (6.25 * user.height) - (5 * user.age) - 161
        }
        user.save().then(resp=>{
        res.status(200).json({update: true})
        })
    })
})

app.post('/api/changeheight',(req,res)=>{
    User.findById(req.cookies['user'],(err,user)=>{
        user.weightNow = Number(req.body['weight'])
        if (user.gender == 'male') {
            user.dailyCalories = 5 + (10*user.weightNow) + (6.25 * user.height) - (5*user.age)
        }else if(user.gender == 'female'){
            user.dailyCalories = (10 * user.weightNow) + (6.25 * user.height) - (5 * user.age) - 161
        }
        user.save().then(resp=>{
        res.status(200).json({update: true})
        })
    })
})


app.post('/api/savemeal',(req,res)=>{
    const meal = new OneMeal({
        quantity: req.body['q'],
        calories: req.body['calories'],
        protein: req.body['protein'],
        fat: req.body['fat'],
        carbohydrates: req.body['carbohydrates'],
        user:req.cookies['user'],
        date: Date.now()
    })
    meal.save(err=>{
        if(err){
            return res.json({
                save:false,
                error:err
            })
        }else{
            return res.json({
                save:true,
            })
        }
    })

})
app.get('/login',(req,res) => {
    res.sendFile(path.resolve(__dirname,'client','login.html'))
})

app.post('/login', (req,res)=>{
    User.findOne({ login: req.body.login }, (err, user) => {
        if (err) return res.status(401).json({
            title: 'user not found',
            login: false,
            error: 'invalid credentials'
        })
        else if (!user) {
            return res.status(401).json({
                title: 'user not found',
                login: false,
                error: 'invalid credentials'
            })
        }
        //incorrect password
        else if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'login failed',
                login: false,
                error: 'invalid credentials'
            })
        }else{
            //IF ALL IS GOOD create a cookie and send to frontend
        res.cookie('user',user._id)
            return res.status(200).json({
                title: 'login sucess',
                login: true
            })
        }
    })
})

app.get('/registration',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'client','register.html'))
})
app.post('/registration', async (req,res)=> {
    let cal = 0.0
    if (req.body.gender == 'male') {
        cal = 5 + (10*req.body.weightNow) + (6.25 * req.body.height) - (5*req.body.age)
    }else {
        cal = (10 * req.body.weightNow) + (6.25 * req.body.height) - (5 * req.body.age) - 161
    }

    const dailycal = Number(req.body.activity)*cal

    const existUser = await User.findOne({email:req.body.email})
        if (!existUser){
            const newUser = new User({
                login: req.body.login,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                weightNow:Number(req.body.weightNow),
                height:Number(req.body.height),
                dailyCalories:Number(dailycal),
                age:Number(req.body.age),
                vip:false,
                registerDate:Date.now()
            })
            newUser.save(err => {
                if (err) {
                    return res.status(200).json({
                        title: 'register failed',
                        registarion: false,
                        error: err.name
                    })
                    }else{
                    return res.status(200).json({
                        title: 'register success',
                        registarion: true,
                        error: 'error'
                    })
                }
                })
        }else{
            return res.status(200).json({
                title: 'register failed',
                registarion: false,
                error: 'account exist'
            })
        }
})

app.get("/", (req,res) =>{
    res.sendFile(path.resolve(__dirname,'client','index.html'))
})

app.post("/", (req,res)=>{

})

app.get("*", (req,res) =>{
    res.sendFile(path.resolve(__dirname,'client','nopage.html'))
})

app.listen(process.env.PORT|| 3000,()=>console.log(colors.green("App is running")))
