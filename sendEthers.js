const ethers = require("ethers");
require("dotenv").config();

async function main() {
  // Ganache RPC server URL
  const url = process.env.GANACHE_URL;

  // connect to our local Ganache blockchain
  const provider = new ethers.providers.JsonRpcProvider(url);

  // copy-paste a private key from a Ganache account!
  const privateKey = process.env.PRIVATE_KEY;

  // let's create a Wallet instance so that our sender can... send!
  const wallet = new ethers.Wallet(privateKey, provider);

  // getting the accounts + balances
  const signer1 = provider.getSigner(1); // account we will send eth to
  const addr1 = await signer1.getAddress();
  const walletBalance = await wallet.getBalance();

  console.log(
    "Balance of sender address before tx: " +
      ethers.utils.formatEther(walletBalance)
  );

  console.log("Sending ether from " + wallet.address + " to " + addr1);

  const tx = await wallet.sendTransaction({
    to: addr1,
    value: ethers.utils.parseEther("22.0"),
  });

  // waits for the tx to be mined so that any subsequent queries are accurate
  const receipt = await tx.wait();
  const balanceAfter = await wallet.getBalance();
  console.log(
    "Balance of sender address after tx: " +
      ethers.utils.formatEther(balanceAfter)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
