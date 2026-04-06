const express = require("express");
const router = express.Router();
const { getUser, updateUser, deleteUser } = require("../controllers/userController");
const { requireAuth } = require("../middleware/auth");

router.get("/:id", requireAuth, getUser);
router.put("/:id", requireAuth, updateUser);
router.delete("/:id", requireAuth, deleteUser);

module.exports = router;