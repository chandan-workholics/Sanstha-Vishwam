const City = require('../modal/City');

exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find().populate('stateId');
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createCity = async (req, res) => {
    try {
        const { name, stateId } = req.body;
        const newCity = new City({ name, stateId });
        await newCity.save();
        res.status(201).json(newCity);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getCitiesByState = async (req, res) => {
    try {
        const { stateId } = req.params;
        const cities = await City.find({ stateId }).populate('stateId');
        res.json(cities);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
