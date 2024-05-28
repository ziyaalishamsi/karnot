import { NextFunction, Request, Response, Router } from 'express'
import { HttpError } from './models'
import { MongoClient } from 'mongodb'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const latestBlock = await fetch('https://free-rpc.nethermind.io/mainnet-juno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "jsonrpc":"2.0",
                "method":"starknet_blockNumber",
                "params":[],
                "id":1
            })
        })
        const latestBlockData = await latestBlock.json()
        const response = await fetch('https://free-rpc.nethermind.io/mainnet-juno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "method": "starknet_getBlockWithTxs",
                "params": [
                    {
                        "block_number": latestBlockData.result
                    }
                ],
                "id": 1
            })
        })
        const responseData = await response.json()
        
        // const client = new MongoClient(process.env['MONGO_CONNECT_STRING']!)
        // let result
        // try {
        //     await client.connect()
        //     const db = client.db('pesto')
        //     result = await db.collection<Task>('tasks').insertOne(newTask)
        // } catch (error) {
        //     return next(new HttpError('Could not add task.', 500))
        // }
        // client.close()

    } catch(err) {
        return next(new HttpError('Could not get response', 500))
    }
})

export default router