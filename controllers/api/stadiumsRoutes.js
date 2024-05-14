const router = require('express').Router();
const { Stadium } = require('../../models');
const { getStadiumImages } = require('../../utils/wiki');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const stadiumData = await Stadium.findAll({
      attributes: ['stadium_id', 'stadium', 'team', 'league', 'division', 'city', 'state'],
    });

    // Serialize data so the template can read it
    const stadiums = stadiumData.map((stadium) => stadium.get({ plain: true }));

    // Send the serialized data as JSON
    res.json(stadiums);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/stadium/:id', async (req, res) => {
  try {
    // Find a single stadium by its ID
    const stadiumData = await Stadium.findByPk(req.params.id, {
      attributes: ['stadium_id', 'stadium', 'team', 'league', 'division', 'city', 'state'],
    });

    // Serialize the data so the template can read it
    const stadium = stadiumData.get({ plain: true });

    // Send the serialized data as JSON
    res.json(stadium);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/stadium-images/:name', async (req, res) => {
  const stadiumName = req.params.name;

  try {
    const stadium = await Stadium.findOne({ where: { stadium: stadiumName } });
    if (!stadium) {
      return res.status(404).json({ message: 'Stadium not found' });
    }

    const images = await getStadiumImages(stadiumName);

    if (images.length > 0) {
      console.log(images[0].url);
      res.json({ selectedImage: images[0].url });
    } else {
      res.status(404).json({ message: 'Not enough images found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error });
  }
});

module.exports = router;

