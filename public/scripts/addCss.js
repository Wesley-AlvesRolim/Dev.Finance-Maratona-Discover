import { Transaction } from './transaction';
export const addCss = {
    Css() {
        let sizeTable = Transaction.all.length;
        let styleElement = document.body.appendChild(document.createElement('style'));
        let cssRules = `
        .new.button{
            opacity: 1;
            visibility: visible;
        }
        #newTransaction{
            width: 1px;
            height: 1px;
            opacity: 0;
            visibility: hidden;
        }
        `;
        if (sizeTable >= 4) {
            styleElement.innerHTML = cssRules;
        } else {
            styleElement.innerHTML = '';
        }
    }
};