const router = require("express").Router();
const { UserStadium } = require("../../models");
const withAuth = require("../../utils/auth");
// POST route to create a new UserStadium
router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const userStadiumData = await UserStadium.create({
      date_visited: req.body.date,
      rating: req.body.rating,
      review: req.body.review,
      user_id: req.session.user_id,
      stadium_id: req.body.id,
    });
    res.status(200).json(userStadiumData);
    console.log(userStadiumData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userStadiumData = await UserStadium.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(userStadiumData);
    console.log(userStadiumData);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});
// GET route to retrieve all UserStadiums
router.get("/", async (req, res) => {
  try {
    const userStadiumData = await UserStadium.findAll({
      // attributes: ["id", "date_visited", "rating", "review"],
      // include: [
      //   {
      //     model: Stadium,
      //     attributes: ["stadium_id"],
      //   },
      //   {
      //     model: User,
      //     attributes: ["user_id"],
      //   },
      // ],
    });

    const userStadiums = userStadiumData.map((userStadium) =>
      userStadium.get({ plain: true })
    );

    res.json(userStadiums);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to retrieve a specific UserStadium by id
router.get("/:id", async (req, res) => {
  try {
    const userStadiumData = await UserStadium.findByPk(req.params.id, {
      // attributes: ["id", "date_visited", "rating", "review"],
      // include: [
      //   {
      //     model: Stadium,
      //     attributes: ["stadium_id"],
      //   },
      //   {
      //     model: User,
      //     attributes: ["user_id"],
      //   },
      // ],
    });

    const userStadium = userStadiumData.get({ plain: true });

    res.json(userStadium);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT route to update a specific UserStadium by id
router.put("/:id", async (req, res) => {
  try {
    const userStadiumData = await UserStadium.update(req.body, {
      where: {
        id: req.params.id,
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
router.delete("/:id", async (req, res) => {
  try {
    const userStadiumData = await UserStadium.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userStadiumData) {
      res.status(404).json({ message: "UserStadium not found." });
      return;
    }

    res.status(200).json(userStadiumData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
