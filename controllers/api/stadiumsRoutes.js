const router = require('express').Router();
const { Stadium } = require('../../models');
const wiki = require('wikipedia');

router.get('/', async (req, res) => {
  try {
    const stadiumData = await Stadium.findAll({
      attributes: ['stadium_id', 'stadium', 'team', 'league', 'division', 'city', 'state', 'image'],
    });

    const stadiums = stadiumData.map((stadium) => stadium.get({ plain: true }));
    res.json(stadiums);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const stadiumData = await Stadium.findByPk(req.params.id, {
      attributes: ['stadium_id', 'stadium', 'team', 'league', 'division', 'city', 'state', 'image'],
    });

    if (!stadiumData) {
      res.status(404).json({ message: 'No stadium found with this id' });
      return;
    }

    const stadium = stadiumData.get({ plain: true });

    // Fetch image from Wikipedia
    try {
      const page = await wiki.page(stadium.stadium);
      const images = await page.images();
      const mainImage = images.length > 0 ? images[0].url : null;
      stadium.image = mainImage;
    } catch (error) {
      console.log('Error fetching image from Wikipedia:', error);
      stadium.image = null;
    }

    res.render('stadium', {
      ...stadium,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error('Error rendering stadium page:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
