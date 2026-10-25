const eventModel = require("../models/eventModel");

const createEvent = async (req, res) => {

    try {

        const {
            title,
            description,
            venue,
            category,
            event_date,
            event_time,
            
        } = req.body;
        const created_by = req.user.id;

        // Validation
        if (
            !title ||
            !description ||
            !venue ||
            !category ||
            !event_date ||
            !event_time 
           
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        await eventModel.createEvent(
            title,
            description,
            venue,
            category,
            event_date,
            event_time,
            created_by
        );

        res.status(201).json({
            message: "Event Created Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

const getAllEvents = async (req, res) => {

    try {

        const events = await eventModel.getAllEvents();

        res.status(200).json(events);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
const updateEvent = async (req, res) => {

    try {

        const id = req.params.id;

        const {
            title,
            description,
            venue,
            category,
            event_date,
            event_time
        } = req.body;

        // Validation
        if (
            !title ||
            !description ||
            !venue ||
            !category ||
            !event_date ||
            !event_time
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        await eventModel.updateEvent(
            id,
            title,
            description,
            venue,
            category,
            event_date,
            event_time
        );

        res.status(200).json({
            message: "Event Updated Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};
const deleteEvent = async (req, res) => {

    try {

        const id = req.params.id;

        await eventModel.deleteEvent(id);

        res.status(200).json({
            message: "Event Deleted Successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Internal Server Error"
        });

    }

};

module.exports = {
    createEvent,
    getAllEvents,updateEvent,deleteEvent
};
