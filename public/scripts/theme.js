const storageTheme = {
    getTheme() {
        return JSON.parse(localStorage.getItem('currentTheme')) || [];
    },
    setTheme(newTheme) {
        localStorage.setItem('currentTheme', JSON.stringify(newTheme));
    }
};

const Icon = {
    swithTheme: document.querySelector('#swithTheme'),
    lightOn() {
        setTimeout(() => {
            this.swithTheme.innerHTML = `
            <label for="" onclick="Icon.darkOn()">
            <img class="light off" src="https://img.icons8.com/color/344/sun--v1.png" alt="Light" loading="lazy" style="height: 50px"></img>
            <img class ="dark" src="https://img.icons8.com/clouds/344/bright-moon.png" alt="Dark" loading="lazy" style="height: 60px"></img>
            </label>`;
        }, 100);
        storageTheme.setTheme(['light']);
        document.documentElement.removeAttribute('data-theme', '');
    },
    darkOn() {
        setTimeout(() => {
            this.swithTheme.innerHTML = `<label for="" onclick="Icon.lightOn()">
            <img class="light" src="https://img.icons8.com/color/344/sun--v1.png" alt="Light" loading="lazy" style="height: 60px"></img>
            <img class ="dark off" src="https://img.icons8.com/clouds/344/bright-moon.png" alt="Dark" loading="lazy" style="height: 50px"></img>
            </label>`;
            storageTheme.setTheme(['dark']);
            document.documentElement.setAttribute('data-theme', 'dark');
        }, 100);
    }
};

const initTheme = {
    load() {
        let check = storageTheme.getTheme();
        switch (check[0]) {
            case 'dark':
                Icon.darkOn();
                break;
            case 'light':
                Icon.lightOn();
                break;
            default:
                Icon.lightOn();
                break;
        }
    }
};

initTheme.load();