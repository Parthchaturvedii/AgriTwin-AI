const calculateProfit = ({
    currentPrice,
    predictedPrice,
    quantity
}) => {


    const currentValue =
        currentPrice * quantity;


    const predictedValue =
        predictedPrice * quantity;


    const extraProfit =
        predictedValue - currentValue;



    return {

        currentValue,

        predictedValue,

        extraProfit

    };

};


module.exports = {
    calculateProfit
};