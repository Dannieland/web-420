/*
taplin-customer.js
Danielle Taplin
9/22/2023
customer.js for composer api
 */



//declare variable requiring mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//declare new line items schema
let lineItemSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
});



//declare new invoice schema
let invoiceSchema = new Schema({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [lineItemSchema]
});

//declare new customer schema
let customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String },
    invoices: [invoiceSchema]
});



//export finished user model
module.exports = mongoose.model('Customer', customerSchema);