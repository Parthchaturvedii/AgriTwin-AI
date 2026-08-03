const {
    calculateProfit
} = require("../services/profitService");



exports.getProfit = async(req,res)=>{


    try{


        const result =
        calculateProfit(req.body);



        res.json({

            success:true,

            ...result

        });


    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};