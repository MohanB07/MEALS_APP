const db = require('../db.js');


exports.walletAmount = async (req, res) => {
    try {
        const userName = "Jane Smith";

        console.log("invoked");

        db.query('SELECT amount FROM wallet WHERE name = ?', [userName], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        
        if (results.length === 0) {
            console.log('No wallet found for user:', userName);
            return res.status(404).json({ error: 'Wallet not found' });
        }

        const balance = results[0].amount;
        console.log(`Wallet balance for ${userName}: ${balance}`);
        res.json({ balance });
    });
    } catch (error) {
        console.error(error);
    }
}