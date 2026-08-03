import { useEffect, useState } from "react";

import {
  TrendingUp,
  Bot,
  CloudRain,
  IndianRupee,
  Warehouse,
} from "lucide-react";

import api from "../../services/api";


function RecommendationCard({ selectedPlot }) {

  const [decision, setDecision] = useState(null);
  const [recommendation, setRecommendation] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);



  useEffect(() => {


    const fetchData = async () => {

      try {


        let storedPrediction = null;


        try {

          storedPrediction =
            JSON.parse(
              localStorage.getItem("cropPrediction")
            );

        } catch(error){

          console.log(
            "No crop prediction found"
          );

        }



        setPrediction(storedPrediction);



        const crop =
          selectedPlot?.crop ||
          storedPrediction?.crop ||
          "Wheat";



        // AI Market Decision

        const decisionResponse =
          await api.post(
            "/ai/market-decision",
            {

              crop,

              predictedPrice:
                storedPrediction?.predictedPrice ||
                2500,

              weather:
                "Sunny",

              farmHealth:
                selectedPlot?.health ||
                95,

            }
          );



        if(decisionResponse.data.success){

          setDecision(
            decisionResponse.data
          );

        }




        // Gemini Recommendation

        const recommendationResponse =
          await api.post(
            "/recommendation",
            {

              crop,

              temperature:
                selectedPlot?.temp ||
                29,


              humidity:65,


              moisture:
                selectedPlot?.moisture ||
                68,


              weather:
                "Sunny",

            }
          );



        if(recommendationResponse.data.success){

          setRecommendation(
            recommendationResponse.data.recommendation
          );

        }



      }
      catch(error){


        console.error(
          "Recommendation Error:",
          error
        );


        setRecommendation(
          "Monitor crop health, maintain moisture levels and check market conditions before selling."
        );


      }
      finally{

        setLoading(false);

      }

    };


    fetchData();


  },[selectedPlot]);





  if(loading){

    return (

      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-xl font-bold text-green-700">

          🤖 AI Advisor Loading...

        </h2>

      </div>

    );

  }




  const currentPrice = 2450;


  const predictedPrice =
    prediction?.predictedPrice ||
    2500;


  const quantity = 145;


  const todayProfit =
    currentPrice * quantity;


  const futureProfit =
    predictedPrice * quantity;


  const extraProfit =
    futureProfit - todayProfit;



  const confidence =
    decision?.confidence || "85%";



  return (

    <div className="bg-white rounded-3xl shadow-xl border p-6">


      {/* Header */}

      <div className="flex justify-between items-center mb-6">


        <div className="flex gap-3 items-center">

          <Bot
            size={32}
            className="text-green-600"
          />


          <div>

            <h2 className="text-2xl font-bold">

              AI Selling Advisor

            </h2>


            <p className="text-gray-500">

              Predictive Market Intelligence

            </p>


          </div>

        </div>



        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">

          {confidence}

        </span>


      </div>





      {/* Confidence */}

      <div className="mb-6">


        <div className="flex justify-between mb-2">

          <span>
            AI Confidence
          </span>


          <b className="text-green-700">

            {confidence}

          </b>


        </div>



        <div className="h-3 bg-gray-200 rounded-full">

          <div

            className="h-3 bg-green-600 rounded-full"

            style={{

              width:

              typeof confidence === "number"

              ? `${confidence}%`

              : confidence

            }}

          />


        </div>


      </div>





      {/* Cards */}

      <div className="grid md:grid-cols-2 gap-4">


        <div className="bg-green-50 rounded-xl p-4">

          <IndianRupee className="text-green-600"/>

          <p>
            Today's Price
          </p>


          <h2 className="text-2xl font-bold">

            ₹{currentPrice}

          </h2>


        </div>




        <div className="bg-blue-50 rounded-xl p-4">

          <TrendingUp className="text-blue-600"/>


          <p>
            Predicted Price
          </p>


          <h2 className="text-2xl font-bold text-blue-700">

            ₹{predictedPrice}

          </h2>


        </div>




        <div className="bg-yellow-50 rounded-xl p-4">

          <Warehouse className="text-yellow-600"/>


          <p>
            Stored Crop
          </p>


          <h2 className="text-xl font-bold">

            {quantity} Qtl

          </h2>


        </div>




        <div className="bg-cyan-50 rounded-xl p-4">

          <CloudRain className="text-cyan-600"/>


          <p>
            Weather Risk
          </p>


          <h2 className="text-xl font-bold">

            Low

          </h2>


        </div>


      </div>





      {/* AI Decision */}

      <div className="mt-6 rounded-xl bg-green-50 border border-green-300 p-5">


        <h3 className="text-xl font-bold text-green-700">

          AI Decision : {decision?.decision || "HOLD"}

        </h3>


        <p className="mt-2">

          {decision?.reason ||
          "Market analysis unavailable"}

        </p>


      </div>





      {/* Recommendation */}

      <div className="mt-6 bg-slate-50 rounded-xl p-5 border">


        <h3 className="font-bold mb-3">

          🤖 Gemini AI Recommendation

        </h3>


        <p className="whitespace-pre-line leading-7">

          {recommendation ||
          "No recommendation available."}

        </p>


      </div>





      {/* Profit */}

      <div className="grid md:grid-cols-2 gap-4 mt-6">


        <div className="bg-red-50 rounded-xl p-5">

          <p className="text-red-600">

            Sell Today

          </p>


          <h2 className="text-2xl font-bold">

            ₹{todayProfit.toLocaleString("en-IN")}

          </h2>

        </div>



        <div className="bg-green-50 rounded-xl p-5">


          <p className="text-green-700">

            Sell After Prediction

          </p>


          <h2 className="text-2xl font-bold">

            ₹{futureProfit.toLocaleString("en-IN")}

          </h2>


        </div>


      </div>





      <div className="mt-6 flex justify-between items-center">


        <div>

          <p className="text-gray-500">

            Expected Extra Profit

          </p>


          <h2 className="text-3xl font-bold text-green-700">

            +₹{extraProfit.toLocaleString("en-IN")}

          </h2>


        </div>



        <div className="bg-green-600 text-white px-5 py-3 rounded-xl font-semibold">

          {decision?.decision || "HOLD"}

        </div>


      </div>


    </div>

  );

}


export default RecommendationCard;