import { NextFunction, Request, Response, Router } from 'express'
import { HttpError } from './models'

const router = Router()

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    let response
    try {
        response = await fetch('https://free-rpc.nethermind.io/mainnet-juno', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "jsonrpc":"2.0",
                "method":"starknet_blockNumber",
                "params":[],
                "id":1
            })
        })
        response = await response.json()
    } catch(err) {
        return next(new HttpError('Could not get response', 500))
    }
    return res.status(200).json(response)
})

export default router