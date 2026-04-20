import Criminal from '../../models/criminal/criminal.models.js';

export const getCriminal = async (req, res) => {
  try {
    const { id } = req.params;
    const criminal = await Criminal.findById(id);
    if (!criminal) {
      return res.status(404).json({ message: 'Criminal not found' });
    }
    return res.status(200).json(criminal);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
