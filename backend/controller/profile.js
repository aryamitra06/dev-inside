import Profile from "../model/Profile.js";
export const getMyProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'No profile found' });
        }
        return res.json(profile);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
}