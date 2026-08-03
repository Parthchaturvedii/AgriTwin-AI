import {
Cloud,
Droplets,
Wind,
Thermometer
} from "lucide-react";

function Card({icon,title,value,color}){

return(

<div className="rounded-2xl bg-white p-6 shadow">

<div className="flex items-center justify-between">

<div>

<p className="text-gray-500">{title}</p>

<h2 className="mt-2 text-3xl font-bold">{value}</h2>

</div>

<div className={`rounded-xl p-4 ${color}`}>
{icon}
</div>

</div>

</div>

);

}

export default function WeatherOverview(){

return(

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

<Card
title="Temperature"
value="29°C"
icon={<Thermometer/>}
color="bg-red-100 text-red-600"
/>

<Card
title="Humidity"
value="68%"
icon={<Droplets/>}
color="bg-blue-100 text-blue-600"
/>

<Card
title="Wind"
value="15 km/h"
icon={<Wind/>}
color="bg-green-100 text-green-700"
/>

<Card
title="Condition"
value="Cloudy"
icon={<Cloud/>}
color="bg-slate-200 text-slate-700"
/>

</div>

);

}