import { NextFunction, Request, Response, Router } from 'express'
import { HttpError } from './models'
import { MongoClient } from 'mongodb'
import { DB_NAME, MONGO_CONNECT_STRING, TRANSACTIONS } from './env'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    // try {
        // const latestBlock = await fetch('https://free-rpc.nethermind.io/mainnet-juno', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         "jsonrpc":"2.0",
        //         "method":"starknet_blockNumber",
        //         "params":[],
        //         "id":1
        //     })
        // })
        // const latestBlockData = await latestBlock.json()
        // const response = await fetch('https://free-rpc.nethermind.io/mainnet-juno', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         "jsonrpc": "2.0",
        //         "method": "starknet_getBlockWithTxs",
        //         "params": [
        //             {
        //                 "block_number": latestBlockData.result
        //             }
        //         ],
        //         "id": 1
        //     })
        // })
        // const responseData = await response.json()
        
        const client = new MongoClient(MONGO_CONNECT_STRING)
        let result
        try {
            await client.connect()
            const db = client.db(DB_NAME)
            result = await db.collection(TRANSACTIONS).insertOne({sample: 'abcd'})
        } catch (error) {
            return next(new HttpError('Could not add task.', 500))
        }
        client.close()

    // } catch(err) {
    //     return next(new HttpError('Could not get response', 500))
    // }
    return res.status(200).json(result)
})

export default router