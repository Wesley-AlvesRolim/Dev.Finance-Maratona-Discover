const Modal = {
    open() {
        document.querySelector('.modal-overlay')
            .classList.add('active')
    },
    close() {
        document.querySelector('.modal-overlay')
            .classList.remove('active')
        form.clearFields()
    }
}
const layer = {
    open() {
        document.querySelector('.layerMensage')
            .classList.add('active')
    },
    close() {
        document.querySelector('.layerMensage')
            .classList.remove('active')
    }
}
const storage = {
    get() {
        return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
    },
    set(transactions) {
        localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions))
    }
}
const input = {
    select: document.querySelector('.input-group.actions'),
    clear() {
        this.select.innerHTML = this.originInput()
        app.reload()
    },
    addInput(index) {
        this.select.innerHTML = this.NewInput(index)
    },
    NewInput(index) {
        const html = `
        <a href="#" class="button cancel" onclick="Modal.close();input.clear()">Cancelar</a>
        <button onclick="Transaction.all.splice(${index},1)">Enviar</button>`
        return html
    },
    originInput() {
        const html = `
        <a href="#" class="button cancel" onclick="Modal.close()">Cancelar</a>
        <button>Enviar</button>`
        return html
    }
}
const Transaction = {
    all: storage.get(),
    add(transaction) {
        Transaction.all.push(transaction)
        app.reload()
    },
    remove(index) {
        Transaction.all.splice(
            index, /* elemento que sera usado */
            1 /* quantidade de elementos */
        )
        app.reload() /* o app reload foi usado por causa do cleanUp e para rodar novamente o init() */

    },
    incomes() {
        let income = 0;
        Transaction.all.forEach(
            transaction => {
                if (transaction.amount > 0) {
                    income = income + transaction.amount
                }
            })
        return income
    },
    expenses() {
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0) {
                expense = expense + transaction.amount
            }
        })
        return expense
    },
    total() {
        let total = Transaction.incomes() + Transaction.expenses();
        if (total < 0) {
            document.querySelector('.card.total').classList.add('changeColor')
            layer.open()
        } else {
            document.querySelector('.card.total').classList.remove('changeColor')
        }
        return total
    },
}//responsável pela soma dos valores
const table = {
    tableBody: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = this.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index
        table.tableBody.appendChild(tr)
    },
    edit(index) {
        Modal.open()
        let edit = Transaction.all.slice(index, index + 1)
        let reducer = edit.reduce(totalArray => {
            return totalArray
        })
        let reducerDate = reducer.date
        form.description.value = reducer.description,
            form.amount.value = reducer.amount / 100,
            form.date.value = utils.reverseDate(reducerDate)
        input.addInput(index)
    },
    innerHTMLTransaction(transaction, index) {
        const CSS = transaction.amount > 0 ? 'income' : 'expense';//uso do se e senãp       
        const Amount = utils.formatCurrency(transaction.amount);
        const html = `
        <td class="description">${(transaction.description)}</td>
        <td class= "${CSS}">${Amount}</td>
        <td class="date">${transaction.date}</td>
        <td><img src="./assets/pencil.svg" alt="Modifique esta transação" id="edit" onclick= "table.edit(${index})"></td>
        <td><img src="/assets/minus.svg" alt="Remover esta transação" id="remove" onclick= "Transaction.remove(${index})"></td>`
        return html
    },
    updateBalance() {
        document.getElementById('cardIncome').innerHTML = utils.formatCurrency(Transaction.incomes());
        document.getElementById('cardExpense').innerHTML = utils.formatCurrency(Transaction.expenses());
        document.getElementById('cardTotal').innerHTML = utils.formatCurrency(Transaction.total());
    },
    cleanUp() {
        this.tableBody.innerHTML = ""
    }
}
const utils = {
    formatAmount(amount) {
        amount = amount * 100
        return Math.round(amount)
    },
    format(date) {
        const DATE = date.split('-')
        return `${DATE[2]}/${DATE[1]}/${DATE[0]}`
    },
    reverseDate(reducerDate) {
        const change = reducerDate.split('/')
        return `${change[2]}-${change[1]}-${change[0]}`
    },
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        //o signal recebe um value do tipo number se for <0 entao(? = entao) recebe "-" senao(: = senao) recebe ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
        return signal + value
    }
}
const form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValue() {
        return {
            description: form.description.value,
            amount: form.amount.value,
            date: form.date.value,
        }

    },
    validateField() {
        const description = form.getValue().description;
        const amount = form.getValue().amount;
        const date = form.getValue().date;
        if (description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "") {
            throw new Error('Por favor, preencha todos os campos!')
        }
    },
    formatValues() {
        let { description, amount, date } = this.getValue()
        amount = utils.formatAmount(amount);
        date = utils.format(date);
        return { description, amount, date }
    },
    clearFields() {
        form.description.value = '',
            form.amount.value = '',
            form.date.value = ''
    },
    submit(event) {
        event.preventDefault()
        try {
            form.validateField()
            const transaction = form.formatValues()
            Transaction.add(transaction)
            form.clearFields()
            Modal.close()
        } catch (error) {
            setTimeout(() => {
                document.querySelector('.error').classList.add('active')
                document.querySelector('.error.active span').innerHTML = error.message
                if (form.description.value.trim() == "") {
                    form.description.classList.add('red')
                } else {
                    form.description.classList.remove('red')
                }
                if (form.amount.value.trim() === "") {
                    form.amount.classList.add('red')
                } else {
                    form.amount.classList.remove('red')
                }
                if (form.date.value.trim() === "") {
                    form.date.classList.add('red')
                } else {
                    form.date.classList.remove('red')
                }
            }, 0)
            setTimeout(() => {
                document.querySelector('.error').classList.remove('active')
                const removeBorder = document.querySelectorAll('.border.red')
                removeBorder[0].classList.remove('red')
                removeBorder[1].classList.remove('red')
                removeBorder[2].classList.remove('red')
            }, 3000)
        }
    },
}
const app = {
    init() {
        Transaction.all.forEach(
            (transaction, index) => {
                table.addTransaction(transaction, index)
            })
        table.updateBalance()
        storage.set(Transaction.all)
        /* table.cleanUp() */
    },
    reload() {
        table.cleanUp()
        app.init()
    }
}
app.init()