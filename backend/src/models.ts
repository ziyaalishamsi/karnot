export class HttpError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

export interface Block {
    number: number
    timestamp: number
    latest: boolean
    transactions: {
        hash: string
        type: 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER'
        execution_status: string
        finality_status: string
        version: number 
    }[]
}

export interface Transaction {
    hash: string
    type: 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER'
    timestamp: number
    block_number: number
    actual_fee: {
        eth: number
        dollar: number
    }
    max_fee: {
        eth: number
        dollar: number
    }
    gas_consumed: number
    sender_address: string
    nonce: number
    position: number
    version: number
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
    events: number
}

export interface BlockTransaction {
    transaction_hash: string
    type: 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER'
    version: string
    nonce: string
    max_fee: string
    sender_address: string
    signature: string[]
    calldata: string[]
}

export interface BlockData {
    status: string
    block_hash: string
    parent_hash: string
    block_number: number
    new_root: string
    timestamp: number
    sequencer_address: string
    l1_gas_price: {
        price_in_fri: string
        price_in_wei: string
    }
    l1_data_gas_price: {
        price_in_fri: string
        price_in_wei: string
    },
    l1_da_mode: string
    starknet_version: string
    transactions: BlockTransaction[]
}

export interface TransactionData {
    type: 'DECLARE' | 'DEPLOY' | 'DEPLOY_ACCOUNT' | 'INVOKE' | 'L1_HANDLER'
    transaction_hash: string
    actual_fee: {
        amount: string
        unit: 'WEI' | 'FRI'
    }
    execution_status: string
    finality_status: string
    block_hash: string
    block_number: number
    messages_sent: []
    events: {
        from_address: string
        keys: string[]
        data: string[]
    }[]
    revert_reason?: string
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
}