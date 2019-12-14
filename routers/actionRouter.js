const router = require("express").Router();
const actionModel = require("../data/helpers/actionModel");
const middleware = require("../middleware/middleware");

router.get("/", (req, res) => {
  actionModel
    .get()
    .then(actions => res.status(200).json(actions))
    .catch(error => res.status(500).json("Could not get actions"));
});

router.get("/:id", middleware.validateActionID, (req, res) => {
  res.status(200).json(req.action);
});

router.post(
  "/",
  middleware.validateProjectID,
  middleware.validateAction,
  (req, res) => {
    actionModel
      .insert(req.body)
      .then(action => res.status(200).json(action))
      .catch(err => res.status(500).json("Could not get actions"));
  }
);

// updates specific
router.put(
  "/:id",
  middleware.validateActionID,
  middleware.validateAction,
  (req, res) => {
    actionModel
      .update(req.params.id, req.body)
      .then(action =>
        res.status(200).json({ message: `Action ${id} has been updated.` })
      )
      .catch(err => res.status(500).json("Could not update actions."));
  }
);

// deleting specific ID requires validation that there is an action with that ID

router.delete("/:id", middleware.validateActionID, (req, res) => {
  actionModel
    .remove(req.params.id)
    .then(action => {
      res.status(202).json({ message: `Action ${id} has been removed` });
    })
    .catch(err =>
      res.status(500).json({ error: "Action could not be deleted." })
    );
});

module.exports = router;
