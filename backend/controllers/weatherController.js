const axios = require("axios");


const getWeather = async (req, res) => {

    try {

        const {
            lat,
            lon
        } = req.query;


        if (!lat || !lon) {

            return res.status(400).json({

                success:false,

                message:"Latitude and Longitude are required"

            });

        }



        const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;



        const { data } = await axios.get(url);



        let condition = "Sunny";


        const code =
        data.current.weather_code;



        if(code >= 50 && code <= 67){

            condition = "Rainy";

        }


        if(code >= 80){

            condition = "Storm";

        }



        res.json({

            success:true,


            weather:{

                temperature:
                data.current.temperature_2m,


                humidity:
                data.current.relative_humidity_2m,


                wind:
                data.current.wind_speed_10m,


                condition

            }


        });



    }
    catch(error){


        console.error(error.message);


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};



module.exports = {
    getWeather
};