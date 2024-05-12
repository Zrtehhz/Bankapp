// Simulated data and initial configuration
const settings = { airplaneMode: false, MaxTransferAmount: 100000, CurrencyFormat: "$%s" };
const walletData = {
    balance: 1200,
    transactions: [{ amount: -150, company: "Coffee Shop", logo: "logo1.png", timestamp: new Date() }],
    bills: []
};

// Utility functions
function formatCurrency(amount) {
    return settings.CurrencyFormat.replace('%s', amount.toFixed(2));
}

function canAfford(amount) {
    console.log(`Can afford? ${walletData.balance >= amount} Balance: ${walletData.balance}, Amount: ${amount}`);
    return walletData.balance >= amount;
}

// Main app functionality
function WalletApp() {
    let currentNumber = '';
    let currentScreen = 0; // 0: number input, 1: amount input, 2: transaction confirmation
    let errorMessage = null;

    function updateNumberInput(input) {
        currentNumber = input.replace(/[^0-9]/g, '');
        displayCurrentState();
    }

    function processTransaction(amount) {
        if (!canAfford(amount)) {
            errorMessage = 'Not enough money';
            displayCurrentState();
            return;
        }
        if (amount > settings.MaxTransferAmount) {
            errorMessage = 'Max transfer amount reached';
            displayCurrentState();
            return;
        }
        if (settings.airplaneMode) {
            alert('Transaction cannot be processed in airplane mode.');
            return;
        }
        walletData.balance -= amount;
        walletData.transactions.unshift({
            amount: -amount,
            company: 'Transfer',
            timestamp: new Date()
        });
        currentScreen = 2;
        displayCurrentState();
    }

    function displayCurrentState() {
        console.clear();
        if (currentScreen === 0) {
            console.log('Enter Number:', currentNumber);
        } else if (currentScreen === 1) {
            console.log('Enter Amount for:', currentNumber);
        } else if (currentScreen === 2) {
            console.log('Transaction Successful:', formatCurrency(walletData.balance));
        }
        if (errorMessage) {
            console.error(errorMessage);
            errorMessage = null;
        }
    }

    // Initial display
    displayCurrentState();

    // Mock user interactions
    updateNumberInput('123456789');
    currentScreen = 1;
    displayCurrentState();
    processTransaction(200);
}

WalletApp();
