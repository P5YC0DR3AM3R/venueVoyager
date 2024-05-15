const router = require("express").Router();
const { Stadium, User } = require("../models");
const withAuth = require("../utils/auth");
const wiki = require('wikipedia');

router.get("/", async (req, res) => {
  const cardData = [
    {
      title: "MLB",

      logo: "https://wordsabovereplacement.com/wp-content/uploads/2020/06/mlb.png",
    },
    {
      title: "NFL",

      logo: "https://1000logos.net/wp-content/uploads/2017/05/NFL-logo-500x338.png",
    },
    {
      title: "NBA",

      logo: "https://1000logos.net/wp-content/uploads/2017/04/Logo-NBA-500x313.png",
    },
    {
      title: "NHL",

      logo: "https://1000logos.net/wp-content/uploads/2017/05/NHL-Logo-500x333.png",
    },
  ];
  res.render("homepage", { cardData, logged_in: req.session.logged_in });
});

router.get("/stadiums/:league", withAuth, async (req, res) => {
  try {
    const league = req.params.league;

    // Find all stadiums for the chosen league
    const stadiums = await Stadium.findAll({
      where: { league },
    });

    // Serialize all stadiums for template rendering
    const serializedStadiums = stadiums.map((stadium) =>
      stadium.get({ plain: true })
    );
    // const page = await wiki.page(stadium.stadium);
    // const images = await page.images();
    // stadium.image = images[1];
    // console.log(`${images[1]} image should be here`);
    // console.log(page.images());

    res.render("leagueStadiums", {
      stadiums: serializedStadiums, // Pass array of serialized stadiums
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Error fetching stadiums" }); // Provide user-friendly error message
  }
});

router.get('/api/stadiums/:id', withAuth, async (req, res) => {
  try {
    const stadiumData = await Stadium.findByPk(req.params.id, {
          attributes: ['stadium', 'team', 'league', 'division', 'city', 'state', 'image']
    });

    const stadium = stadiumData.get({ plain: true });

    const page = await wiki.page(stadium.stadium);
    const images = await page.images();
    stadium.image = images[4].url;
    console.log(`${images[4].url} image should be here`);

    res.render("stadiumId", {
      ...stadium,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      // include: [{ model: Stadium, through: "user_stadiums" }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Route to handle stadium listing for a specific sport (placeholder)

router.get("/login", async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;