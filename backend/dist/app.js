"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const body_parser_1 = require("body-parser");
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
app.use(router_1.default);
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'An unknown error occured.' });
});
app.listen(8000, '127.0.0.1', () => {
    console.log('My server is running on port 8000');
});
