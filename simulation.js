const axios = require('axios');

// URL API untuk Pi Network dan Stellar
const PI_API_URL = "https://api.pinetwork.com"; // Ganti dengan URL Pi Network yang valid
const STELLAR_API_URL = "http://localhost:5000/api"; // API server lokal yang telah disiapkan

// Fungsi untuk menahan aset di Pi Network
async function holdAssetInPi(amount, sender) {
    try {
        const response = await axios.post(`${PI_API_URL}/hold`, { amount, sender });
        return response.data.transactionId;
    } catch (error) {
        console.error("Error holding asset in Pi Network:", error.message);
        throw error;
    }
}

// Fungsi untuk menahan aset di Stellar
async function holdAssetInStellar(amount, receiver) {
    try {
        const response = await axios.post(`${STELLAR_API_URL}/transfer`, { amount, receiver });
        return response.data.stellarTransactionId;
    } catch (error) {
        console.error("Error holding asset in Stellar:", error.message);
        throw error;
    }
}

// Fungsi untuk memeriksa status transaksi di Stellar
async function getStellarTransactionStatus(transactionId) {
    try {
        const response = await axios.get(`${STELLAR_API_URL}/transaction/${transactionId}`);
        return response.data.status;
    } catch (error) {
        console.error("Error fetching Stellar transaction status:", error.message);
        throw error;
    }
}

// Fungsi untuk merilis aset di Stellar
async function releaseAssetInStellar(amount, receiver) {
    try {
        const response = await axios.post(`${STELLAR_API_URL}/release`, { amount, receiver });
        console.log("Asset released in Stellar:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error releasing asset in Stellar:", error.message);
        throw error;
    }
}

// Simulasi proses transfer lintas jaringan
async function simulateTransfer() {
    const amount = 1000; // Jumlah token yang akan ditransfer
    const sender = 'pi_sender_address'; // Alamat pengirim Pi Network
    const receiver = 'stellar_receiver_address'; // Alamat penerima Stellar

    try {
        console.log("Starting transfer simulation...");

        // Step 1: Hold asset in Pi Network
        console.log("Holding asset in Pi Network...");
        const piTransactionId = await holdAssetInPi(amount, sender);

        // Step 2: Hold asset in Stellar
        console.log("Holding asset in Stellar...");
        const stellarTransactionId = await holdAssetInStellar(amount, receiver);

        // Step 3: Check Stellar transaction status
        console.log("Checking Stellar transaction status...");
        const stellarStatus = await getStellarTransactionStatus(stellarTransactionId);

        // Step 4: If Stellar transaction is successful, release asset
        if (stellarStatus === 'success') {
            console.log("Stellar transaction successful. Releasing asset...");
            await releaseAssetInStellar(amount, receiver);
            console.log("Transfer completed successfully!");
        } else {
            console.log("Stellar transaction failed. Please check the status.");
        }
    } catch (error) {
        console.error("Error during transfer simulation:", error.message);
    }
}

// Menjalankan simulasi transfer
simulateTransfer();
