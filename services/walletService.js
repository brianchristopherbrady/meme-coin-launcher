const { Connection, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');

class WalletService {
  constructor() {
    this.connection = new Connection(process.env.SOLANA_RPC_URL);
  }

  async createWallet() {
    const wallet = Keypair.generate();
    return {
      publicKey: wallet.publicKey.toString(),
      secretKey: Buffer.from(wallet.secretKey).toString('base64')
    };
  }

  async fundWallet(publicKey, amount) {
    // Implementation for funding wallet
    // This will depend on your funding source
    throw new Error('Not implemented');
  }
}

module.exports = new WalletService(); 