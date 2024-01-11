import { check, validationResult } from "express-validator";
import normalizeUrl from "normalize-url";
import Profile from "../models/ProfileModel.js";

const createProfile =
  (check("status", "Status is required").notEmpty(),
  check("skills", "Skills are required").notEmpty(),
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuring the request
    const {
      website,
      skills,
      youtube,
      twitter,
      facebook,
      instagram,
      linkedin,
      ...rest
    } = req.body;
    // build the profile
    const profileFields = {
      user: req.user.id,
      website:
        website && website !== ""
          ? normalizeUrl(website, { forceHttps: true })
          : "",
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => " " + s.trim()),
      ...rest,
    };
    // to build social fields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };
    // normalize the social fields

    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0)
        socialFields[key] = normalizeUrl(value, { forceHttps: true });
    }
    profileFields.social = socialFields;
    try {
      // actual insertion if there is no profile then create a new profile else if it exists then update the existing profile
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("server error");
    }
  });

export { createProfile };
