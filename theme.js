const storageTheme = {
    getTheme() {
        return JSON.parse(localStorage.getItem('currentTheme')) || []
    },
    setTheme(newTheme) {
        localStorage.setItem('currentTheme', JSON.stringify(newTheme))
    }
}
const Icon = {
    swithTheme: document.querySelector('#swithTheme'),
    lightOn() {
        setTimeout(() => {
            this.swithTheme.innerHTML = `
            <label for="" onclick="Icon.darkOn()">
            <img class="light off" src="https://img.icons8.com/color/344/sun--v1.png" alt="Light" loading="lazy" style="height: 50px"></img>
            <img class ="dark" src="https://img.icons8.com/fluent-systems-filled/344/fog-night.png" alt="Dark" loading="lazy" style="height: 50px"></img>
            </label>`
        }, 100);
        darkTheme.body.innerHTML = '' 
        storageTheme.setTheme(['light'])
    },
    darkOn() {
        setTimeout(() => {
            this.swithTheme.innerHTML = `<label for="" onclick="Icon.lightOn()">
            <img class="light" src="https://img.icons8.com/color/344/sun--v1.png" alt="Light" loading="lazy" style="height: 50px"></img>
            <img class ="dark off" src="https://img.icons8.com/fluent-systems-filled/344/fog-night.png" alt="Dark" loading="lazy" style="height: 50px"></img>
            </label>`
            storageTheme.setTheme(['dark'])
            darkTheme.css()
        }, 100);
    }
}
const darkTheme = {
    body: document.body.appendChild(document.createElement('style')),
    css(){
        const cssRules = `
        body{
            background-color: #222222;
            transition: .5s;
        }
        body header{
            background-image: linear-gradient(180deg, #1d480d 80%, #2c6816 90%, #2d8d07 100%);
        }
        .dark{
            border-radius: 15rem;
            background: radial-gradient(circle, #0909c3 45%, #0559a6 70%);
        }
        .card{
            color: #bababa;
            background-color: #383838;
        }
        .card:hover{
            box-shadow: -5px 6px 20px #211a1a;
        }
        .card.total{
            background: linear-gradient(360deg, #368b32 0%, #41b114 57%, #00fb10 87%);
        }
        .card.total.changeColor{
            background: #d8011e;
        }
        #data-table{
            color: #f1fff1;
            font: 700;
            transition: .5s;
        }
        #data-table thead th{
            background-color: #3c3c3c;
            transition: .5s;
        }
        #data-table td{
            background-color: #3c3c3c;
        }
        td.description{
            color: #d8e4d8;
        }
        td.expense{
            color: #FF0800;
        }
        .modal {
            background: #3c3c3c;
            color: #f5fff6;
            font-weight: 400;
        }
        h2{
            font-weight: 700;
            color: #f1fff1;
        }
        input{    
            background-color: #f5fff6;
        }
        input:hover{
            border: none;
            border-radium: 1rem;
            box-shadow: .9px .9px 10px #e3cce6;
        }
        input:focus{
            border: none;
        }
        .newTransaction{
            background-image: linear-gradient(225deg, #F400A1 0%, #720e9e 50%, #2B86C5 100%);
        }
        footer{    
            background: #3c3c3c;
            color: #b6b6b6;
        }
        `
        this.body.innerHTML = cssRules
    },
}
const initTheme = {
    load(){
        let check = storageTheme.getTheme()
        switch (check[0]) {
            case 'dark':
                Icon.darkOn()
                break;
            case 'light':
                Icon.lightOn()
                break;
            default: 
                Icon.lightOn()
                break;
        }
    }
}
initTheme.load()