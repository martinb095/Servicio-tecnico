"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require('nodemailer');
// crear un objeto de transporte reutilizable usando SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: 'softwaremarbal_soporte@outlook.com',
        pass: '39022428mar'
    }
});
exports.default = transporter;
