import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

new Vue({
    el:'#register_app',
    data() {
        return {
            login: '',
            email: '',
            password: '',
            password_again: '',
            activity: '',
            height: '',
            age: '',
            weightNow: '',
            sex: '',
            status: '',
            error: '',
            resp:'',
        }
    },
    computed:{
        canRegister() {
            const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(!reg.test(this.email.toLowerCase())){
                return true
            }else if(this.password_again != this.password){
                return true
            }else if(isNaN(this.weightNow) || isNaN(this.height) || isNaN(this.age)){
                return true
            }else if(this.status){
                return true
            }else{
                return false
            }
        }
    },
    methods:{
        makeRegistration(){

            const newUser = {
                login: this.login,
                email: this.email,
                password: this.password,
                weightNow:Number(this.weightNow),
                height:Number(this.height),
                age:Number(this.age),
                activity:this.activity,
                vip:false,
                gender:this.sex
            }
            request('/registration','POST', newUser).then(res=>{
                if(res.registarion == true){
                    this.showNotification('Registration success',1)
                    setTimeout(()=>{window.location.href = '/login'},3000)
                }else{
                    this.showNotification(res.error,0)
                }
            })
        },showNotification(text, c){
            const color = c ? "rgb(146, 253, 155)" : "rgb(255, 132, 132)"
            let chips = document.createElement('div')
            chips.classList.add('chips')
            chips.style.backgroundColor = color
            chips.innerText = text


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
        console.warn('Error', e.message)
    }
}

function removeChipsField(){
    const chips = document.querySelectorAll('#chips-field .chips')
    if(chips.length == 0){
        document.querySelector('#chips-field').remove()
    }
}