const currencyList = ['USD', 'VND', 'EUR', 'KRW']
const rateCurrency = [
    [1, 23200, 0.88, 1192.84],
    [1 / 23200, 1, 1 / 26240.64, 1 / 19.45],
    [1 / 0.88, 26240.64, 1, 1349.01],
    [1 / 1192.84, 19.45, 1 / 1349.01, 1192.84]
];

function convert() {
    let currencyFrom = document.getElementById("selectFrom").value;
    let currencyTo = document.getElementById("selectTo").value;
    let amount = document.getElementById("inputAmount").value;
    if (isNaN(amount)) {
        document.getElementById("inputAmount").focus();
        document.getElementById('result-text').innerHTML = ''
        return 0
    }
    let indexCurrencyFrom = currencyList.indexOf(currencyFrom);
    let indexCurrencyTo = currencyList.indexOf(currencyTo);
    let result = changeMoney(indexCurrencyFrom, indexCurrencyTo, amount)
    document.getElementById('result-text').innerHTML = `${formatCurrency(currencyFrom, amount)} ${currencyFrom} is same amount with ${formatCurrency(currencyTo, result)} ${currencyTo}`
    if (currencyFrom === 'VND') {
        countAmountVnd(amount)
        return 0
    }
    if (currencyTo === 'VND') {
        countAmountVnd(result)
        return 0
    }
    // Initiaize table
    document.getElementById('labelTableCurrency').innerHTML = ''
    document.getElementById('tableCurrency').innerHTML = '';

}
function countAmountVnd(amount) {
    amount = Math.round(parseInt(amount) / 1000) * 1000;
    let listVndType = [500000, 200000, 100000, 50000, 20000, 10000, 5000, 2000, 1000]
    let listVndTypeString = ['500k', '200k', '100k', '50k', '20k', '10k', '5k', '2k', '1k']
    let countVndType = [];
    let remender = amount;
    let count = 0;
    for (let i = 0; i < 9; i++) {
        count = parseInt(remender / listVndType[i])
        countVndType.push(count);
        remender %= listVndType[i]
    }

    document.getElementById('labelTableCurrency').innerHTML = `With ${formatCurrency('VND', amount)} VND, you can have:`
    // Insert into the table
    let table = document.getElementById('tableCurrency').getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    // Insert a cell in the row at index 0
    let newCell = newRow.insertCell(0);
    // Append a text node to the cell
    let newText = document.createTextNode(listVndTypeString[0]);
    newCell.appendChild(newText);
    newCell = newRow.insertCell(1);
    // Append a text node to the cell
    newText = document.createTextNode(countVndType[0]);
    newCell.appendChild(newText);

    for (let i = 1; i < 9; i++) {
        let newRow = table.insertRow();
        let newCell = newRow.insertCell(0);
        // Append a text node to the cell
        let newText = document.createTextNode(listVndTypeString[i]);
        newCell.appendChild(newText);

        newCell = newRow.insertCell(1);
        // Append a text node to the cell
        newText = document.createTextNode(countVndType[i]);
        newCell.appendChild(newText);
    }
}

function controlAmount() {
    let inputAmount = document.getElementById('inputAmount');
    let amountNotify = document.getElementById('amountNotify');
    if (isNaN(inputAmount.value)) {
        amountNotify.innerHTML = 'Amount must be a number'
        amountNotify.classList.add('text-danger')
        inputAmount.classList.add('is-invalid')

    } else {
        amountNotify.innerHTML = ''
        amountNotify.classList.remove('text-danger')
        inputAmount.classList.remove('is-invalid')
    }
}

function swapCurrency() {
    let from = document.getElementById('selectFrom').value
    let to = document.getElementById('selectTo').value
    document.getElementById('selectFrom').value = to
    document.getElementById('selectTo').value = from
}

function changeMoney(indexCurrencyFrom, indexCurrencyTo, amount) {
    let result = 0;
    result = parseFloat((amount * rateCurrency[indexCurrencyFrom][indexCurrencyTo]).toFixed(2));
    return result
}

function formatCurrency(type, value) {
    const formatter = new Intl.NumberFormat(type, {
        currency: type,
        style: "currency",
        minimumFractionDigits: 2,
    });
    return formatter.format(value);
}
