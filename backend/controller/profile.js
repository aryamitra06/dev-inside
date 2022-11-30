import Profile from "../model/Profile.js";

export const getMyProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ['name', 'avatar']);
        if (!profile) {
            return res.status(400).json({ msg: 'No profile found' });
        }
        return res.json(profile);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
}

export const getProfileById = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.id }).populate("user", ['name', 'avatar']);
        if (!profile) return res.status(400).json({ msg: "No profile found" });
        return res.json(profile);
    } catch (error) {
        if(error.kind === "ObjectId"){
            return res.status(400).json({ msg: "No profile found" });
        }
        res.status(500).json({ msg: "Server Error" });
    }
}

export const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ['name', 'avatar']);
        return res.json(profiles);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
}

export const createUpdateProfile = async (req, res) => {
    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Social objects
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
        // If the profile is available only that case user can update otherwise make new one
        if (Profile.findOne({ user: req.user.id })) {
            await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true })
            return res.json(profileFields);
        }
        else {
            const profile = new Profile(profileFields);
            await profile.save();
            return res.json(profileFields);
        }

    } catch (error) {
        res.status(404).json({ msg: "Server Error" });
    }
}