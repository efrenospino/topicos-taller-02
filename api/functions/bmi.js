const bmi = (weight, height) => {
    return height === 0 ? "Error" : weight / height ** 2;
}
module.exports = bmi;