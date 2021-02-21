const Icon = {
    swithTheme: document.querySelector('#swithTheme'),
    swap() {
        setTimeout(() => {
            this.swithTheme.innerHTML = `
            <label for="" onclick="Icon.swap2()">
            <img class="light" src="https://img.icons8.com/color/344/sun--v1.png" alt="Light" loading="lazy" style="height: 50px"></img>
            <img class ="dark off" src="https://img.icons8.com/fluent-systems-filled/344/fog-night.png" alt="Dark" loading="lazy" style="height: 50px"></img>
            </label>`
        }, 100);
        darkTheme.body.classList.remove('darkTheme')
        darkTheme.body.innerHTML = ''
    },
    swap2() {
        setTimeout(() => {
            this.swithTheme.innerHTML = `<label for="" onclick="Icon.swap()">
            <img class="light off" src="https://img.icons8.com/color/344/sun--v1.png" alt="Light" loading="lazy" style="height: 50px"></img>
            <img class ="dark" src="https://img.icons8.com/fluent-systems-filled/344/fog-night.png" alt="Dark" loading="lazy" style="height: 50px"></img>
            </label>`
            darkTheme.css()
        }, 100);
    }
}
const darkTheme = {
    body: document.body.appendChild(document.createElement('style')),
    css(){ 
        const cssRules = `
        .darkTheme{
            background-color: #222222;
            transition: .5s;
        }
        .darkTheme header{
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
            background: #5e5c5c;
        }
        h2{
            color: #191a38; 
        }
        input{    
            background-color: #cecece;
        }
        input:hover{
            border: none;
            box-shadow: .9px .9px .9rem #f7f7f7e0;
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
        document.body.classList.add('darkTheme')
        this.body.innerHTML = cssRules
    }
}