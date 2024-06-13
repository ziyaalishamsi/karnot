import { NextFunction, Request, Response, Router } from 'express'
import { Block, BlockData, HttpError, Transaction, TransactionData } from './models'
import { MongoClient } from 'mongodb'
import { BLOCKS, DB_NAME, MONGO_CONNECT_STRING, TRANSACTIONS } from './env'
import { getBlockData, getETHPrice, getFee, getGasConsumed, getLatestBlockNumber, getTransactionData } from './utilities'

const router = Router()

router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    let result
    try {
        const latestBlock: number = await getLatestBlockNumber()
        const blockData: BlockData = await getBlockData(latestBlock)
        const ethPrice: number = await getETHPrice()

        const newBlock: Block = {
            number: blockData.block_number,
            timestamp: blockData.timestamp,
            latest: true,
            transactions: []
        }

        blockData.transactions.forEach(async (t, index) => {
            const transactionData: TransactionData = await getTransactionData(t)
            const newTransaction: Transaction = {
                hash: t.transaction_hash,
                type: t.type,
                timestamp: blockData.timestamp,
                block_number: blockData.block_number,
                actual_fee: getFee(transactionData.actual_fee.amount, transactionData.actual_fee.unit, blockData.l1_gas_price, ethPrice),
                max_fee: t.max_fee ? getFee(t.max_fee, transactionData.actual_fee.unit, blockData.l1_gas_price, ethPrice) : null,
                gas_consumed: getGasConsumed(transactionData.actual_fee.amount, transactionData.actual_fee.unit, blockData.l1_gas_price),
                sender_address: t.sender_address,
                nonce: parseInt(t.nonce),
                position: index,
                version: parseInt(t.version),
                execution_resources: transactionData.execution_resources,
                calldata: t.calldata,
                signature: t.signature,
                execution_status: transactionData.execution_status,
                finality_status: transactionData.finality_status,   
                events: transactionData.events.length
            }

            const client = new MongoClient(MONGO_CONNECT_STRING)
            await client.connect()
            const db = client.db(DB_NAME)

            await db.collection<Transaction>(TRANSACTIONS).insertOne(newTransaction)

            client.close()

            newBlock.transactions.push({
                hash: t.transaction_hash,
                type: t.type,
                execution_status: transactionData.execution_status,
                finality_status: transactionData.finality_status,
                version: parseInt(t.version)
            })
        })

        const client = new MongoClient(MONGO_CONNECT_STRING)
        await client.connect()
        const db = client.db(DB_NAME)

        result = await db.collection<Block>(BLOCKS).insertOne(newBlock)

        client.close()
        
    } catch(err) {
        return next(new HttpError('Could not get Block Information', 500))
    }
    return res.status(200).json(result)
})

export default router