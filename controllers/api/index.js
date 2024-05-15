const router = require('express').Router();
const userRoutes = require('./userRoutes');
const stadiumRoutes = require('./stadiumsRoutes');
const userStadiumRoutes = require('./userStadiumRoutes');

router.use('/users', userRoutes);
router.use('/stadiums', stadiumRoutes);
router.use('/userStadium', userStadiumRoutes);

module.exports = router;
