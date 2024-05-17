const router = require("express").Router();
const { UserStadium, Stadium } = require("../../models");
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
router.get("/", withAuth, async (req, res) => {
  try {
    const userStadiumData = await UserStadium.findAll(req.params.id, {});

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
    const userStadiumData = await UserStadium.findByPk(req.params.id);

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
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const userStadiumData = await UserStadium.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    console.log("deleting", userStadiumData);

    res.status(200).json(userStadiumData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // Extract the stadium ID from the request parameters
    const userStadiumId = req.params.id;

    // Retrieve the details of the specific stadium being edited
    const stadiumData = await UserStadium.findByPk(userStadiumId);

    // Check if the stadium exists
    if (!stadiumData) {
      // If the stadium doesn't exist, return a 404 Not Found response
      return res.status(404).json({ message: "UserStadium not found" });
    }
    const stadium = stadiumData.get({plain: true});
    // Render the edit page with the details of the specific stadium
    console.log(stadium);
    res.render("editStadium", { stadium, logged_in: true });
  } catch (err) {
    // Handle any errors that occur during the database query or rendering process
    res.status(500).json(err);
  }
});

// Handle update
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

module.exports = router;
