document.addEventListener('DOMContentLoaded', function() {
    const balanceElement = document.getElementById('balance');
    const transactionsList = document.getElementById('transactionsList');
    const sendMoneyButton = document.getElementById('sendMoneyButton');

    let balance = 0; 
    let transactions = []; 

    function updateUI() {
        balanceElement.textContent = balance.toFixed(2) + ' $';
        transactionsList.innerHTML = ''; 
        transactions.forEach(transaction => {
            const li = document.createElement('li');
            li.textContent = `${transaction.date}: ${transaction.amount} € - ${transaction.note}`;
            transactionsList.appendChild(li);
        });
    }

    function addTransaction(amount, note) {
        const date = new Date().toLocaleDateString();
        transactions.push({date, amount, note});
        balance += amount;
        updateUI();
    }

    sendMoneyButton.addEventListener('click', function() {
        const recipientNumber = document.getElementById('recipientNumber').value;
        const amountToSend = parseFloat(document.getElementById('amountToSend').value);
        
        if (!recipientNumber || isNaN(amountToSend) || amountToSend <= 0) {
            alert('Veuillez entrer un numéro valide et un montant positif.');
            return;
        }

        addTransaction(-amountToSend, `Envoyé à ${recipientNumber}`);
    });

    updateUI();
});
