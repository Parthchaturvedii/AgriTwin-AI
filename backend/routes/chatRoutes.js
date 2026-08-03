const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getInbox,
  getChat,
  sendMessage,
  markRead,
} = require("../controllers/chatController");
router.get("/", protect, getInbox);

router.get("/:chatId", protect, getChat);

router.post("/:chatId", protect, sendMessage);


router.put(
  "/read/:chatId",
  protect,
  markRead
);

module.exports = router;