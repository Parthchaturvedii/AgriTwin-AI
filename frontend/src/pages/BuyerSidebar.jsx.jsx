import BuyerSidebar from "../components/buyer/BuyerSidebar";
import BuyerNavbar from "../components/buyer/BuyerNavbar";

import BuyerStatCard from "../components/buyer/BuyerStatCard";
import MarketTrendChart from "../components/buyer/MarketTrendChart";
import CropListingTable from "../components/buyer/CropListingTable";
import TopFarmers from "../components/buyer/TopFarmers";
import PurchaseRequests from "../components/buyer/PurchaseRequests";
import AIInsights from "../components/buyer/AIInsights";

import {
    Wheat,
    TrendingUp,
    Users,
    ShoppingBag
} from "lucide-react";

function BuyerDashboard(){

    return(

        <div className="flex min-h-screen bg-slate-100">

            <BuyerSidebar/>

            <div className="flex-1 p-8">

                <BuyerNavbar/>

                <div className="grid mt-8 gap-6 md:grid-cols-2 xl:grid-cols-4">

                    <BuyerStatCard
                        title="Available Crops"
                        value="126"
                        icon={<Wheat size={26}/>}
                        color="green"
                    />

                    <BuyerStatCard
                        title="Market Trend"
                        value="+8.5%"
                        icon={<TrendingUp size={26}/>}
                        color="blue"
                    />

                    <BuyerStatCard
                        title="Nearby Farmers"
                        value="42"
                        icon={<Users size={26}/>}
                        color="orange"
                    />

                    <BuyerStatCard
                        title="Orders"
                        value="18"
                        icon={<ShoppingBag size={26}/>}
                        color="purple"
                    />

                </div>

                <div className="grid xl:grid-cols-2 gap-6 mt-8">

                    <MarketTrendChart/>

                    <AIInsights/>

                </div>

                <div className="mt-8">

                    <CropListingTable/>

                </div>

                <div className="grid xl:grid-cols-2 gap-6 mt-8">

                    <TopFarmers/>

                    <PurchaseRequests/>

                </div>

            </div>

        </div>

    )

}

export default BuyerDashboard;