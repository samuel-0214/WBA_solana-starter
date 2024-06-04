import { Commitment, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import wallet from "../wba-wallet.json"
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

// Mint address
const mint = new PublicKey("8nNxsoxkBQBcwsLs8owKWKfbibs22nGknbHj2DpCvCmx");

// Recipient address
const to = new PublicKey("2xYCgbTc5qvc4Z6Mj5Kpeiee3XJmpSwBSztiofTmaDk5");

(async () => {
    try {
        // Get the token account of the fromWallet address, and if it does not exist, create it
        const fromTokenAddress = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey,
          );
          // Get the token account of the toWallet address, and if it does not exist, create it
          const toTokenAddress = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            to,
          );
        // Transfer the new token to the "toTokenAccount" we just created
        const tx = await transfer(connection,keypair,fromTokenAddress.address,toTokenAddress.address,keypair.publicKey,1000000)
        console.log(`Tx =`,tx)
    } catch(e) {
        console.error(`Oops, something went wrong: ${e}`)
    }
})();