#! /usr/bin/env node
import inquirer from "inquirer";
// Bank Account class
class BankAccount {
    accountNumber;
    blance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.blance = balance;
    }
    // Debit Mony 
    withdraw(amount) {
        if (this.blance >= amount) {
            this.blance -= amount;
            console.log(`withdrawal of $${amount} successful.Remaining balance: $${this.blance}`);
        }
        else {
            console.log("Insufficient balance.");
        }
    }
    // Credit Money 
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fees charged if more than $100 is deposited
        }
        this.blance += amount;
        console.log(`Deposit of $${amount} successful.Remaining balance: $${this.blance}`);
    }
    // Check Balance 
    checkBalance() {
        console.log(`Current balance: $${this.blance}`);
    }
}
// Customer Class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Credit Bank Accounts
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// Creat Customers
const customers = [
    new Customer("Imran", "khan", "Male", 35, 3453489230, accounts[0]),
    new Customer("Sakina", "Bano", "Female", 28, 3432472050, accounts[1]),
    new Customer("Afshan", "Bano", "Female", 25, 3153186573, accounts[2])
];
//Function to interact with Bank Account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber);
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                    name: "select",
                    type: "list",
                    message: "Select an operation",
                    choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
                }]);
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the acmount to withdraw:"
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        }
        else {
            console.log("Invalid account number. Please try again.");
        }
    } while (true);
}
service();
