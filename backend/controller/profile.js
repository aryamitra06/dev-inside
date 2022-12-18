import axios from "axios";
import Profile from "../model/Profile.js";
import User from "../model/User.js";

export const getMyProfile = async (req, res) => {
    try {
        //@desc
        //@"user" is the column name which we are populating
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ['name', 'avatar']);
        if (!profile) {
            return res.status(200).json({ msg: 'No profile found' });
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
        if (error.kind === "ObjectId") {
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

export const createProfile = async (req, res) => {
    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.isProfileCreated = true;
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
        const profile = new Profile(profileFields);
        await profile.save();
        return res.json(profileFields);

    } catch (error) {
        res.status(404).json({ msg: "Server Error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;
        const profileFields = {};
        profileFields.user = req.user.id;
        profileFields.company = company;
        profileFields.website = website;
        profileFields.location = location;
        profileFields.bio = bio;
        profileFields.status = status;
        profileFields.githubusername = githubusername;
        profileFields.skills = skills.split(',').map(skill => skill.trim());

        // Social objects
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (twitter) profileFields.social.twitter = twitter;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;

        await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true })
        return res.status(200).json({ success: true, error: false });
    } catch (error) {
        return res.status(400).json({ success: false, error: true });
    }
}

export const deleteProfile = async (req, res) => {
    try {
        //@todo: remove users post

        //Removing profile
        await Profile.findOneAndRemove({ user: req.user.id });

        //Removing User
        await User.findOneAndRemove({ _id: req.user.id });

        return res.json({ msg: "Profile Deleted" })
    } catch (error) {
        res.status(404).json({ msg: "Server Error" });
    }
}

export const addProfileExperience = async (req, res) => {
    const { title, company, location, from, to, current, description } = req.body;
    const newExp = { title, company, location, from, to, current, description };
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        return res.json({msg: "Success"});
    } catch (error) {
        res.status(404).json({ msg: "Server Error" });
    }
}

export const deleteProfileExperience = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.id);
        if (removeIndex === -1) {
            return res.json({ msg: "Experience not found" });
        }
        else {
            profile.experience.splice(removeIndex, 1);
            await profile.save();
            return res.json({msg: "Success"});
        }
    } catch (error) {
        res.status(404).json({ msg: "Server Error" });
    }
}

export const addProfileEducation = async (req, res) => {
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEdu = { school, degree, fieldofstudy, from, to, current, description };
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.education.unshift(newEdu);
        await profile.save();
        return res.json({msg: "Success"});
    } catch (error) {
        res.status(404).json({ msg: "Server Error" });
    }
}

export const deleteProfileEducation = async (req, res) => {

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.id);
        if (removeIndex === -1) {
            return res.json({ msg: "Education not found" });
        }
        else {
            profile.education.splice(removeIndex, 1);
            await profile.save();
            return res.json({msg: "Success"});
        }
    } catch (error) {
        res.status(404).json({ msg: "Server Error" });
    }
}

export const getGithubRepos = async (req, res) => {
    try {
        axios.get(`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=cc12274ac8bf9f009c44&client_secret=2281750b65113c1f8571ae59768ddab6ec0a497c`,
            { headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' }, params: { trophies: true } })
            .then((response) => {
                return res.json(response.data);
            }).catch((error) => {
                return res.json({ msg: "Github profile not found" });
            })

    } catch (error) {
        res.status(404).json({ msg: "Server Error" });
    }
}