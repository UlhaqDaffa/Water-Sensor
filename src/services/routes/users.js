const express = require('express');
const router = express.Router();
import { dirname } from "path";
import { fileURLToPath } from "url";

router.put('/:id', (req, res) => {
    res.json({
        message: 'User updated successfully'})
});


router.delete('/:id', (req, res) => {
    res.json({
        message: 'User deleted successfully'
    });
});

module.exports = router;
