const router = require('express').Router();
const { Stadium } = require('../../models');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const stadiumData = await Post.findAll({
      include: [
          { model: User, attributes: ['name'] },
          { model: Stadium, attributes: ['stadium', 'league', 'city', 'state', 'team', 'image'] }, // Include existing columns
      ],
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
      const stadiumData = await Stadium.findByPk(req.params.id, {
          include: [
              { model: Post, include: [{ model: User, attributes: ['name'] }] },
          ],
      });

    // Serialize the data so the template can read it
    const stadium = stadiumData.get({ plain: true });

    // Send the serialized data as JSON
    res.json(stadium);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
