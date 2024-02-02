document.addEventListener('DOMContentLoaded', function () {
    const appElement = document.getElementById('app');
    let balanceInfo = { balance: 0, transactions: [], bills: [] };
    let isSending = false;
    let recipient = "";
    let step = 0;
    let amount = "";
    let isValid = false;
    let errorMessage = null;

    function render() {
        appElement.innerHTML = `
            <div class="${isSending ? '' : 'hidden'}">
                <p>Balance: ${balanceInfo.balance}</p>
                <p>Transactions:</p>
                <ul>
                    ${balanceInfo.transactions.map(t => `<li>${t.description}: ${t.amount}</li>`).join('')}
                </ul>
                <input type="text" id="inputValue" placeholder="${step === 0 ? 'Recipient' : 'Amount'}">
                <button id="nextStep" ${isValid ? '' : 'disabled'}>Suivant</button>
                ${errorMessage ? `<div class="error-message">${errorMessage}</div>` : ''}
            </div>
            <div class="${isSending ? 'hidden' : ''}">
                <button id="sendMoney">Envoyer de l'argent</button>
            </div>
        `;

        document.getElementById('sendMoney')?.addEventListener('click', function () {
            isSending = true;
            render();
        });

        document.getElementById('nextStep')?.addEventListener('click', function () {
            proceedToNextStep();
        });

        document.getElementById('inputValue')?.addEventListener('input', function (e) {
            if (step === 0) {
                recipient = e.target.value;
                validate();
            } else {
                amount = e.target.value;
                validate();
            }
        });
    }

    function validate() {
        // Simplified validation logic
        isValid = true;
        render();
    }

    function proceedToNextStep() {
        // Simplified logic for proceeding to the next step
        console.log('Proceeding to next step...');
        // Update your state variables and UI accordingly
        render();
    }

    // Initial render
    render();
});
