const db = require("../database/db");

// Create Event
const createEvent = async (
    title,
    description,
    venue,
    category,
    event_date,
    event_time,
    created_by
) => {

    const query = `
        INSERT INTO events
        (title, description, venue, category, event_date, event_time, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [
        title,
        description,
        venue,
        category,
        event_date,
        event_time,
        created_by
    ]);

    return result;
};

// Get All Events
const getAllEvents = async () => {

    const query = `
        SELECT * FROM events
        ORDER BY event_date ASC
    `;

    const [rows] = await db.execute(query);

    return rows;
};

// Update Event
const updateEvent = async (
    id,
    title,
    description,
    venue,
    category,
    event_date,
    event_time
) => {

    const query = `
        UPDATE events
        SET
            title=?,
            description=?,
            venue=?,
            category=?,
            event_date=?,
            event_time=?
        WHERE id=?
    `;

    const [result] = await db.execute(query, [
        title,
        description,
        venue,
        category,
        event_date,
        event_time,
        id
    ]);

    return result;
};

// Delete Event
const deleteEvent = async (id) => {

    const query = `
        DELETE FROM events
        WHERE id = ?
    `;

    const [result] = await db.execute(query, [id]);

    return result;
};

module.exports = {
    createEvent,
    getAllEvents,updateEvent,deleteEvent
};