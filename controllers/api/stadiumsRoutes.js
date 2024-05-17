const router = require("express").Router();
const { Stadium } = require("../../models");
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const stadiumData = await Stadium.findAll({
      attributes: [
        "stadium_id",
        "stadium",
        "team",
        "league",
        "division",
        "city",
        "state",
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

router.get("/api/stadiums/:id", async (req, res) => {
  try {
    const stadiumData = await Stadium.findByPk(req.params.id, {
      attributes: [
        "stadium_id",
        "stadium",
        "team",
        "league",
        "division",
        "city",
        "state",
        "image",
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
router.get("/:league", async (req, res) => {
  try {
    // Find a single stadium by its ID
    const stadiumData = await Stadium.findByPk(req.params.league, {
      attributes: ["stadium", "team"],
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
