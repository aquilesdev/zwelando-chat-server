const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) =>{
    res.send(`Server is up and running`);

    next();
});

module.exports = router;