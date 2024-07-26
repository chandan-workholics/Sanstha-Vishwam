const { Ocupation } = require("../modal/ocupationModal")
 
exports.addOcupation = async (req, res) => {
    try {
        const data = await Ocupation.create(req.body)
        res.status(200).json({
            success: true,
            Ocupation: data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getOcupation = async (req, res) => {
    try {
        const data = await Ocupation.find()
        res.status(200).json({
            success: true,
            Ocupation: data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getOcupationbyId = async (req, res) => {
    try {
        const data = await Ocupation.findById({ _id: req.params.id })
        res.status(200).json({
            success: true,
            Ocupation: data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.updateOcupation = async (req, res) => {
    try {
        const data = await Ocupation.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        )
        res.status(200).json({
            success: true,
            Ocupation: data
        })
    } catch (error) {
        res.send(error)
    }
}

exports.deleteOcupation = async (req, res) => {
    try {
        const data = await Ocupation.deleteOne({ _id: req.params.id })
        res.status(200).json({
            success: true,
            Ocupation: data
        })
    } catch (error) {
        res.send(error)
    }
}