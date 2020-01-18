//const axios = require("axios");
const Dev = require("../models/Dev");
const parseArrayAsString = require("../utils/parseStringAsArray");

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query;

    const techsArr = parseArrayAsString(techs);

    const devs = Dev.find({
      techs: {
        $in: techsArr
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });
    
    return res.json(devs);
  }
};
