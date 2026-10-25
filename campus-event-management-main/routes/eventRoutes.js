const express = require("express");

const router = express.Router();

const eventController = require("../controllers/eventController");
const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

// Create Event
router.post(
    "/",
    verifyToken,
    checkRole("organizer"),
    eventController.createEvent
);

// Get All Events
router.get("/", eventController.getAllEvents);

// Update Event
router.put(
    "/:id",
    verifyToken,
    checkRole("organizer"),
    eventController.updateEvent
);

// Delete Event
router.delete(
    "/:id",
    verifyToken,
    checkRole("organizer"),
    eventController.deleteEvent
);

module.exports = router;