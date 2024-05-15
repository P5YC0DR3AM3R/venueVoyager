const router = require('express').Router();
const userRoutes = require('./userRoutes');
const stadiumsRoutes = require('./stadiumsRoutes');

router.use('/users', userRoutes);
router.use('/stadiums', stadiumsRoutes);

module.exports = router;
