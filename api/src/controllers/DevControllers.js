const axios = require("axios");
const Dev = require("../models/Dev");
const parseArrayAsString = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const devs = Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { user, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ user });

    if (dev) {
      return res.json(dev);
    }

    const result = await axios.get(`https://api.github.com/users/${user}`);

    const { name = login, avatar_url, bio } = result.data;

    const techsArr = parseArrayAsString(techs);

    const location = {
      type: "Point",
      coordinates: [longitude, latitude]
    };

    dev = await Dev.create({
      user,
      name,
      avatar_url,
      bio,
      techs: techsArr,
      location
    });

    return res.json(dev);
  }
};
