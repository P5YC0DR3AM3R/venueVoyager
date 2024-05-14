const router = require('express').Router();
const userRoutes = require('./userRoutes');
const stadiumRoutes = require('./stadiumsRoutes');

router.use('/users', userRoutes);
router.use('/stadiums', stadiumRoutes);

module.exports = router;
