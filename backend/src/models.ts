export class HttpError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

export interface Block {
    block_number: string
    timestamp: number
    transactions: {
        hash: string
        type: 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER'
        status: string
    }[]
}

export interface Transaction {
    hash: string
    type: 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER'
    timestamp: number
    block_number: number
    actual_fee: {
        amount: string
        unit: string
    }
    max_fee: string
    l1_gas_price: {
        price_in_fri: string
        price_in_wei: string
    }
    sender_address: string
    nonce: string
    position: number
    version: string
    execution_resources: {
        steps: number
        pedersen_builtin_applications: number
        range_check_builtin_applications: number
        ec_op_builtin_applications: number
        data_availability: {
            l1_gas: number
            l1_data_gas: number
        }
    }
    calldata: string[]
    signature: string[]
    execution_status: string
    finality_status: string    
    events: {
        from_address: string
        keys: string[]
        data: string[]
    }[]
}