const express = require('express');
const transferController = require('./controllers/transferController');
const router = express.Router();

// Endpoint untuk memulai transfer lintas rantai
router.post('/transfer', transferController.initiateTransfer);

// Endpoint untuk memeriksa status transaksi
router.get('/transaction/:id', transferController.getTransactionStatus);

// Endpoint untuk merilis aset setelah verifikasi lintas rantai
router.post('/release', transferController.releaseAsset);

module.exports = router;
