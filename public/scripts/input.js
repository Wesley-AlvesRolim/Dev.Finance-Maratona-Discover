import { Modal } from "./index";
import { app } from "./app";
import { Transaction } from "./transaction";
export const input = {
    select: document.querySelector('.input-group.actions'),
    clear() {
        document.querySelector('button').removeEventListener('click', e => { Transaction.remove(e.target.className); });
        this.select.innerHTML = this.originInput();
        app.reload();
    },
    addInput(index) {
        this.select.innerHTML = this.NewInput(index);
        document.querySelector('button').addEventListener('click', e => { Transaction.remove(e.target.className); });
        document.querySelector('.button.cancel.in-modal').addEventListener('click', () => {
            this.clear();
            Modal.close();
        });
    },
    NewInput(index) {
        return `
        <a href="#" class="button cancel in-modal">Cancelar</a>
        <button class="${index}">Enviar</button>`
    },
    originInput() {
        return `
        <a href="#" class="button cancel">Cancelar</a>
        <button>Enviar</button>`
    }
}