const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getInbox,
  getChat,
  sendMessage,
  counterOffer,
  markRead,
} = require("../controllers/chatController");

/* =====================================================
   INBOX
===================================================== */

router.get(
  "/",
  protect,
  getInbox
);

/* =====================================================
   SINGLE CHAT
===================================================== */

router.get(
  "/:chatId",
  protect,
  getChat
);

/* =====================================================
   SEND MESSAGE
===================================================== */

router.post(
  "/:chatId",
  protect,
  sendMessage
);

/* =====================================================
   COUNTER OFFER
===================================================== */

router.post(
  "/:chatId/counter-offer",
  protect,
  counterOffer
);

/* =====================================================
   MARK READ
===================================================== */

router.put(
  "/read/:chatId",
  protect,
  markRead
);

module.exports = router;