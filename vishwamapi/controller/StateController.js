const State = require('../modal/State');

exports.getAllStates = async (req, res) => {
    try {
        const states = await State.find();
        res.json(states);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createState = async (req, res) => {
    try {
        const { name, abbreviation } = req.body;
        const newState = new State({ name, abbreviation });
        await newState.save();
        res.status(201).json(newState);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
