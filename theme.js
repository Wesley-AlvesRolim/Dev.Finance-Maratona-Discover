const Icon = {
    swithTheme: document.querySelector('#swithTheme'),
    swap() {
        this.swithTheme.innerHTML = `
        <label for="" onclick="Icon.swap2()">
        <img class="light" src="https://img.icons8.com/color/344/sun--v1.png" alt="Light" loading="lazy" style="height: 50px"></img>
        <img class ="dark off" src="https://img.icons8.com/fluent-systems-filled/344/fog-night.png" alt="Dark" loading="lazy" style="height: 50px"></img>
        </label>`
    },
    swap2() {
        this.swithTheme.innerHTML = `<label for="" onclick="Icon.swap()">
        <img class="light off" src="https://img.icons8.com/color/344/sun--v1.png" alt="Light" loading="lazy" style="height: 50px"></img>
        <img class ="dark" src="https://img.icons8.com/fluent-systems-filled/344/fog-night.png" alt="Dark" loading="lazy" style="height: 50px"></img>
        </label>`
        
    }
}