const router = require("express").Router();

const withAuth = require("../utils/auth");

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
  res.render("homepage", { cardData });
});

// Route to handle stadium listing for a specific sport (placeholder)
router.get("/:sport/stadiums", withAuth, async (req, res) => {
  const sport = req.params.sport;
  // Replace this with your logic to fetch and display stadiums associated with the sport
  // This is just a placeholder for now
  const stadiums = []; // Placeholder data
  res.render("stadiums", { sport, stadiums }); // Pass sport and stadiums data to the template
});

router.get("/login", withAuth, async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
