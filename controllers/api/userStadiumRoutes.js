const router = require("express").Router();
const { UserStadium, Stadium } = require("../../models");
const withAuth = require("../../utils/auth");

// POST route to create a new UserStadium
router.post("/", withAuth, async (req, res) => {
  try {
    const userStadiumData = await UserStadium.create({
      date_visited: req.body.date,
      rating: req.body.rating,
      review: req.body.review,
      user_id: req.session.user_id,
      stadium_id: req.body.id,
    });
    res.status(200).json(userStadiumData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET route to retrieve all UserStadiums
router.get("/", withAuth, async (req, res) => {
  try {
    const userStadiumData = await UserStadium.findAll({
      where: { user_id: req.session.user_id },
    });

    const userStadiums = userStadiumData.map((userStadium) =>
      userStadium.get({ plain: true })
    );

    res.json(userStadiums);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to render the edit form for a specific UserStadium
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const stadiumData = await UserStadium.findByPk(req.params.id);

    if (!stadiumData) {
      return res.status(404).json({ message: "UserStadium not found" });
    }

    const stadium = stadiumData.get({ plain: true });
    res.render("editStadium", { stadium, logged_in: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to retrieve a specific UserStadium by id
router.get("/:id", async (req, res) => {
  try {
    const userStadiumData = await UserStadium.findByPk(req.params.id);

    const userStadium = userStadiumData.get({ plain: true });

    res.json(userStadium);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT route to update a specific UserStadium by id
router.put("/:id", withAuth, async (req, res) => {
  try {
    const userStadiumData = await UserStadium.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!userStadiumData[0]) {
      res.status(404).json({ message: "UserStadium not found." });
      return;
    }

    res.status(200).json({ message: "UserStadium updated successfully." });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to delete a specific UserStadium by id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const userStadiumData = await UserStadium.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    res.status(200).json(userStadiumData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
