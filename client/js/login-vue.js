import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js'

new Vue({
    el:'#login-form',
    data(){
        return{
            login:'',
            pass:'',
        }
    },
    methods:{
        login_me(){
            let user = {
                login: this.login,
                password: this.pass
            }

            const res = request('/login','POST', user)
                res.then(res =>{
                    //if successfull
                    console.log(res.login)
                        if (res.login) {
                            window.location.href = '/'
                        } else {
                            this.showNotification(res.error,0)
                        }
                })
        },
        showNotification(text, c){
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
            headers['Content-Type'] = 'application/json'
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