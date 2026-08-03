const getWeather = async (city) => {

    // Temporary AI demo data
    // Later we can connect OpenWeather API

    const weatherData = {

        city,

        temperature: 29,

        condition: "Sunny",

        humidity: 68,

        rainfall: 10

    };


    return weatherData;

};



module.exports = {
    getWeather
};