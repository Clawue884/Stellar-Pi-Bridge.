const stellarService = require('../services/stellarService');
const piNetworkService = require('../services/piNetworkService');

// Memulai transfer dari Pi Network ke Stellar
exports.initiateTransfer = async (req, res) => {
    const { amount, sender, receiver } = req.body;
    
    try {
        // Langkah 1: Validasi dan hold aset di jaringan Pi
        const piTransactionId = await piNetworkService.holdAsset(amount, sender);

        // Langkah 2: Setelah validasi, hold aset di escrow Stellar
        const stellarTransactionId = await stellarService.holdAsset(amount, receiver);

        res.json({
            message: 'Transfer initiated',
            piTransactionId,
            stellarTransactionId
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to initiate transfer', details: error.message });
    }
};

// Memeriksa status transaksi
exports.getTransactionStatus = async (req, res) => {
    const { id } = req.params;
    
    try {
        const status = await stellarService.getTransactionStatus(id);
        res.json({ status });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transaction status', details: error.message });
    }
};

// Melepaskan aset di jaringan Stellar setelah verifikasi lintas rantai
exports.releaseAsset = async (req, res) => {
    const { amount, receiver } = req.body;
    
    try {
        const result = await stellarService.releaseAsset(amount, receiver);
        res.json({ message: 'Asset released', result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to release asset', details: error.message });
    }
};
