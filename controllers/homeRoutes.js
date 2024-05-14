const router = require('express').Router();
const { Post, User, Stadium } = require('../models');
const withAuth = require('../utils/auth');

// Render the homepage with posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
          { model: User, attributes: ['name'] },
          { model: Stadium, attributes: ['stadium', 'league', 'city', 'state', 'team', 'image'] },
      ],
  });   

    const posts = postData.map((post) => post.get({ plain: true }));
    console.log("Posts data:", posts);

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.error("Error rendering homepage:", err);
    res.status(500).json(err);
  }
});

// Render a specific stadium page
router.get('/stadium/:id', async (req, res) => {
  try {
    const stadiumData = await Stadium.findByPk(req.params.id, {
      include: [
        {
          model: Post,
          include: [{ model: User, attributes: ['name'] }]
        },
      ],
    });

    if (!stadiumData) {
      res.status(404).json({ message: 'No stadium found with this id' });
      return;
    }

    const stadium = stadiumData.get({ plain: true });
    console.log("Stadium data:", stadium);

    res.render('stadium', {
      ...stadium,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error("Error rendering stadium page:", err);
    res.status(500).json(err);
  }
});

// Render the profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post, include: [{ model: Stadium, attributes: ['stadium', 'location', 'image'] }] }],
    });

    if (!userData) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = userData.get({ plain: true });
    console.log("User data:", user);

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.error("Error rendering profile page:", err);
    res.status(500).json(err);
  }
});

// Render the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  console.log("Rendering login page");
  res.render('login');
});

module.exports = router;
