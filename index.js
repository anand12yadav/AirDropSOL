const{Connection, 
        PublicKey, 
        clusterApiUrl, 
        Keypair,
        LAMPORTS_PER_SOL, 
        Transaction, 
        Account}= require("@solana/web3.js")

const newPair = new Keypair()
console.log(newPair);

const publickey = new PublicKey(newPair._keypair.publicKey).toString()
const secretKey = newPair._keypair.secretKey

const getWalletBalance = async ()=>{
    try {
        const connection = new Connection(clusterApiUrl("devnet"),"confirmed")
        const myWallet = await Keypair.fromSecretKey(secretKey) 
        const walletBalance = await connection.getBalance(new PublicKey(myWallet.publicKey)) 
        console.log(`=> for wallet address ${publickey}`)
        console.log(`   Wallet balance : ${parseInt((walletBalance)/LAMPORTS_PER_SOL)}SOL`)  
        //console.log(`   Wallet balance : ${walletBalance} SOL`)   
    } catch (error) {
       console.log(error) 
    }
}

const airDropSol = async ()=> {
    try {
        const connection = new Connection(clusterApiUrl("devnet"),"Confirmed")
        const walletKeyPair = await Keypair.fromSecretKey(secretKey)
        console.log(`-- AirDropping 5 SOL -- `)
        const fromAirdropSignature = await connection.requestAirdrop(new PublicKey(walletKeyPair.publicKey), 5 * LAMPORTS_PER_SOL) 
        await connection.confirmTransaction(fromAirdropSignature)      
    } catch (error) {
       console.log(error) 
    }
    
}

const driverFunction= async()=>{
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}
driverFunction()

