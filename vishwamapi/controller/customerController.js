const { customer } = require("../modal/customerModal")


exports.addcustomer = async (req, res) => {
    try {
        const data = await customer.create(req.body)
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getcustomer = async (req, res) => {
    try {
        const data = await customer.find().populate('ocupation')
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getcustomerbyId = async (req, res) => {
    try {
        const data = await customer.findById({ _id: req.params.id })
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.deletecustomer = async (req, res) => {
    try {
        const data = await customer.deleteOne({ _id: req.params.id })
        res.status(200).json({
            success: true,
            data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.updatecustomer = async(req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Find and update the customer
        const data = await customer.findByIdAndUpdate(id, updateData, { new: true });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found'
            });
        }

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while updating the customer',
            error: error.message
        });
    }
}









