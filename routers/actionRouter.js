const router = require("express").Router();
const actionModel = require("../data/helpers/actionModel");
const middleware = require("../middleware/middleware");

router.get("/", (req, res) => {
  actionModel
    .get()
    .then(actions => res.status(200).json(actions))
    .catch(error => res.status(500).json("Could not get actions."));
});

router.get("/:id", middleware.validateActionID, (req, res) => {
  res.status(200).json(req.action);
});

router.post(
  "/",
  middleware.validateProjectID,
  middleware.validateAction,
  (req, res) => {
    console.log("post req.body", req.body);
    actionModel
      .insert(req.body)
      .then(action => res.status(200).json(action))
      .catch(err => res.status(500).json("Could not create action"));
  }
);

// updates specific
router.put(
  "/:id",
  middleware.validateActionID,
  middleware.validateAction,
  (req, res) => {
    const { id } = req.params;
    const body = req.body;
    console.log("req.params.id value", id);
    console.log("req.body value", body);
    actionModel
      .update(id, body)
      .then(action =>
        res.status(200).json({ message: `Action ${id} has been updated.` })
      )
      .catch(err => res.status(500).json("Could not update actions."));
  }
);

// deleting specific ID requires validation that there is an action with that ID

// router.delete("/:id", middleware.validateActionID, (req, res) => {
//   console.log("action ID in delete request", req.params.id);
//   actionModel
//     .remove(req.params.id)
//     .then(action => {
//       res.status(202).json({ message: `Action ${id} has been removed` });
//     })
//     .catch(err =>
//       res.status(500).json({ error: "Action could not be deleted." })
//     );
// });

router.delete("/:id", middleware.validateActionID, (req, res) => {
  actionModel
    .remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res
          .status(200)
          .json({ message: "The action has been successfully removed." });
      } else {
        res
          .status(404)
          .json({ message: "The action could not be found in the data base" });
      }
    })
    .catch(error => {
      res.status(500).json(Error_Message);
    });
});

module.exports = router;
