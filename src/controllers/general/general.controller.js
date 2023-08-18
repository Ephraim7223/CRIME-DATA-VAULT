import Criminal from "../../models/criminal/criminal.models.js";


export const getCriminal = async (req, res) => {
    try {
        const { id } = req.params;
        const criminal = await Criminal.findById(id);
        res.status(200).json(criminal);
    } catch (err) {

    }
};