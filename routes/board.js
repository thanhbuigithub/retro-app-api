const router = require("express").Router();
const Board = require("../model/Board");
router.get("/", async (req, res) => {
  const boards = await Board.find();
  const result = boards.map((board) => ({
    name: board.name,
    _id: board._id,
  }));
  res.send(result);
});

module.exports = router;
