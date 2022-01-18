import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'


new Vue({
    el:'#app',
    data(){
        return{
            form:{
                name:'',
                quantity:'',
            },
            allFood: [],
            foodNow: [],
            sugFood:[],
            chosenFood:{},
            sumFood:{},
            saveRes:'',
            prevDaysStat:[],
            progrBar:0,
            maxCal:0,
            barWidth:'',
            auth:true,
            newAge:'',
            newWeight:'',
            newHeight:'',
        }
    },
    computed: {
        canAdd(){
            return this.form.quantity.trim() && this.form.name.trim()
        },
    },
    methods:{
        addFood() {
            let f = {id:0,name:'',v:0,cal:0,prot:0,fat:0,carb:0}
            let id
            if (this.foodNow[this.foodNow.length - 1])id = this.foodNow[this.foodNow.length - 1]['id'] + 1
            else id = 0
            if (this.chosenFood) {
                const q = this.form.quantity
                f['id']   = id
                f['name'] =  this.chosenFood['name']
                f['v']    = Number(q)
                f['cal']  = parseFloat((this.chosenFood['calories']  * q / 100).toFixed(2))
                f['prot'] = parseFloat((this.chosenFood['protein']  * q / 100).toFixed(2))
                f['fat']  = parseFloat((this.chosenFood['fat'] * q / 100).toFixed(2))
                f['carb'] = parseFloat((this.chosenFood['carbohydrates'] * q / 100).toFixed(2))
                this.foodNow.push(f)
                this.countRes()
            }
        this.form.name = this.form.quantity = ''
        },

        removeFood(id){
            this.foodNow = this.foodNow.filter(c=>c.id !== id )
            this.countRes()
        },
        clearFood(){
            this.foodNow = []
            this.countRes()
        },
        saveMeal(){
            const obj = {
                q:this.sumFood['q'],
                calories:this.sumFood['cal'],
                protein:this.sumFood['prot'],
                fat:this.sumFood['fat'],
                carbohydrates:this.sumFood['carb'],
            }
            request('/api/savemeal','POST',obj).then(resp=>{
                if(resp.save){
                    this.saveRes = 'Save success'
                    this.showNotification('Save success',1)
                    this.clearFood()
                }else{
                    this.showNotification(resp.error,0)
                }
            })
            this.getStat()
        },
        updateAge(){
            const obj = {'age':this.newAge}
            request('/api/changeage','POST',obj).then(resp=>{
                if(resp.update){
                    this.saveRes = 'Save success'
                    this.showNotification('Save success',1)
                    this.clearFood()
                }else{
                    this.showNotification(resp.error,0)
                }
            })
        },
        updateHeight(){
            const obj = {'height':this.newHeight}
            request('/api/changeweight','POST',obj).then(resp=>{
                if(resp.update){
                    this.saveRes = 'Save success'
                    this.showNotification('Save success',1)
                    this.clearFood()
                }else{
                    this.showNotification(resp.error,0)
                }
            })
        },
        updateWeight(){
            const obj = {'weight':this.newWeight}
            request('/api/changeheight','POST',obj).then(resp=>{
                if(resp.update){
                    this.saveRes = 'Save success'
                    this.showNotification('Save success',1)
                    this.clearFood()
                }else{
                    this.showNotification(resp.error,0)
                }
            })
        },

        countRes(){
            this.sumFood = {q:0,v:0,cal:0,prot:0,fat:0,carb:0}
            const arr = this.foodNow
            for(let i in arr){
                this.sumFood['v']    += arr[i]['v']
                this.sumFood['cal']  = Number(((this.sumFood['cal']  * 100) + (arr[i]['cal']  * 100))/100)
                this.sumFood['prot'] = Number(((this.sumFood['prot'] * 100) + (arr[i]['prot'] * 100))/100)
                this.sumFood['fat']  = Number(((this.sumFood['fat']  * 100) + (arr[i]['fat']  * 100))/100)
                this.sumFood['carb'] = Number(((this.sumFood['carb'] * 100) + (arr[i]['carb'] * 100))/100)
            }
            this.sumFood['q'] = this.foodNow.length
        },

        search(){
            const searchWrapper = document.querySelector(".food-form")
            const userData = this.form.name
            if(userData){
                this.sugFood = this.allFood.filter((data)=>{
                    //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
                    return data['name'].toLowerCase().startsWith(userData.toLowerCase());
                })
                searchWrapper.classList.add("active");

            }else{
                searchWrapper.classList.remove("active"); //hide autocomplete box
            }
        },
        select(id){
            this.chosenFood = this.allFood[id]
            this.form.name = this.chosenFood['name']
            const searchWrapper = document.querySelector(".food-form")
            searchWrapper.classList.remove("active");
        },
        deleteCookie(){
            console.log("delete")
            request('/api/logout').then(res=>{
                if (res.logout){
                    document.location.reload();
                }
            })
        },
        getStat(){
            request('/api/loadstat').then(list=>{
                this.prevDaysStat = list
                const a = this.maxCal
                this.progrBar = this.prevDaysStat[0]['calories']
                let barWidth;
                if(this.progrBar === 0){
                    barWidth = '1%'
                }else if(a>this.progrBar){
                    barWidth = Math.round(this.progrBar / a * 100)+'%'
                }else{
                    barWidth = '100%'
                }

                const b = document.querySelector('#cal-progr-done')
                b.style.width = barWidth
            })
        },showNotification(text, c){
            const color = c ? "rgb(146, 253, 155)" : "rgb(255, 132, 132)"
            let chips = document.createElement('div')
            chips.classList.add('chips')
            chips.innerText = text
            chips.style.backgroundColor = color

            if(!document.querySelector('#chips-field')){
                const chipsField = document.createElement('div')
                chipsField.id = 'chips-field'
                document.body.appendChild(chipsField)
            }
            document.querySelector('#chips-field').appendChild(chips)
                setTimeout(()=>{
                    chips.remove()
                    removeChipsField()
                },3000)
        },
    },
    async mounted() {
        const temtFood = await request('/api/food')
        for (let i in temtFood['all_food']){
            this.allFood.push({id: i, name:temtFood['all_food'][i][0], calories:temtFood['all_food'][i][1], protein:temtFood['all_food'][i][2], fat:temtFood['all_food'][i][3], carbohydrates:temtFood['all_food'][i][4]})
        }
        this.auth = temtFood['auth']
        this.maxCal = temtFood['cal']
        this.getStat()
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error' + e.message)
    }
}
function removeChipsField(){
    const chips = document.querySelectorAll('#chips-field .chips')
    if(chips.length == 0){
        document.querySelector('#chips-field').remove()
    }
}