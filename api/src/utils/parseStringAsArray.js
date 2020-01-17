module.exports = function parseStringAsArray(arrayAsString) {
    const techsArr = arrayAsString.split(",").map(tech => tech.trim());

    return techsArr;
};
