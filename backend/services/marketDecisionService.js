const generateMarketDecision = async ({
    crop,
    predictedPrice,
    weather,
    farmHealth
}) => {


    let decision = "HOLD";

    let confidence = 85;

    let reason = "Market conditions are stable.";



    if (predictedPrice > 3000 && farmHealth > 80) {

        decision = "SELL";

        confidence = 92;

        reason =
            "High expected price with healthy crop condition.";

    }



    if (weather === "Rainy") {

        decision = "WAIT";

        confidence = 88;

        reason =
            "Rain forecast may affect market supply and crop quality.";

    }



    return {

        crop,

        decision,

        confidence: `${confidence}%`,

        reason

    };

};



module.exports = {
    generateMarketDecision
};