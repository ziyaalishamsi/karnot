"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("./models");
const router = (0, express_1.Router)();
router.get('/', async (req, res, next) => {
    let response;
    try {
        response = await fetch('https://free-rpc.nethermind.io/mainnet-juno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "starknet_blockNumber",
                "params": [],
                "id": 1
            })
        });
        response = await response.json();
    }
    catch (err) {
        return next(new models_1.HttpError('Could not get response', 500));
    }
    return res.status(200).json(response);
});
exports.default = router;
