import { BlockData, BlockTransaction, Transaction, TransactionData } from "./models"

export const getLatestBlockNumber: () => Promise<number> = async () => {
    const latestBlockData = await fetch('https://free-rpc.nethermind.io/mainnet-juno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "jsonrpc":"2.0",
            "method":"starknet_blockNumber",
            "params":[],
            "id":1
        })
    })
    return (await latestBlockData.json()).result as number
}

export const getBlockData: (a: number) => Promise<BlockData> = async (latestBlock: number) => {
    const blockResponse = await fetch('https://free-rpc.nethermind.io/mainnet-juno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "starknet_getBlockWithTxs",
            "params": [
                {
                    "block_number": latestBlock
                }
            ],
            "id": 1
        })
    })
    return (await blockResponse.json()).result as BlockData
}

export const getTransactionData: (a: BlockTransaction) => Promise<TransactionData> = async (t: BlockTransaction) => {
    const transactionData = await fetch('https://free-rpc.nethermind.io/mainnet-juno', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "method": "starknet_getTransactionReceipt",
            "params": [t.transaction_hash],
            "id": 1
        })
    })
    return (await transactionData.json()).result as TransactionData
}

export const getETHPrice: () => Promise<number> = async () => {
    const ethPriceData = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    return (await ethPriceData.json()).ethereum.usd as number
}