import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
// import { bundlrUploader, createBundlrUploader } from "@metaplex-foundation/umi-uploader-bundlr"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://arweave.net/gFAmjcKKSF6rwHqPO3r7vTQpTYQR6iO5yqyq0AJqRp0"
        const metadata = {
            name: "Dolly's RUG",
            symbol: "DOL",
            description: "Cranky",
            image: "https://arweave.net/gFAmjcKKSF6rwHqPO3r7vTQpTYQR6iO5yqyq0AJqRp0",
            attributes: [
                {trait_type: 'rectangle', value: 'true'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: "https://arweave.net/gFAmjcKKSF6rwHqPO3r7vTQpTYQR6iO5yqyq0AJqRp0"
                    },
                ]
            },
            creators: [{address: keypair.publicKey, share: 100}]
        };
        const myUri = await umi.uploader.uploadJson(metadata);  
        console.log("Your image URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();

