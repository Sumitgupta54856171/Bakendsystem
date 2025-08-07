const claim = require("../model/claim");
const getClaim = async (req, res) => {
    try {
        const claims = await claim.find();
        res.json(claims);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch claims' });
    }
}
const updateClaim = async (req, res) => {
    try {
        const { id } = req.params;
        const { status,adminpass } = req.body;
        const claim = await claim.findByIdAndUpdate(id, { status:status,adminpass:true });
        if (!claim) {
            return res.status(404).json({ error: 'Claim not found' });
        }
        res.json(claim);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update claim' });
    }
}
module.exports = { getClaim,updateClaim };