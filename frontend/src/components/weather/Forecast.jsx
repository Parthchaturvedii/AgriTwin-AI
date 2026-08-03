export default function Forecast(){

const forecast=[

["Mon","30°","☀️"],
["Tue","29°","🌤"],
["Wed","27°","🌧"],
["Thu","28°","⛅"],
["Fri","31°","☀️"],
["Sat","30°","🌤"],
["Sun","28°","🌧"]

];

return(

<div className="rounded-3xl bg-white p-6 shadow">

<h2 className="mb-6 text-2xl font-bold text-green-700">

7 Day Forecast

</h2>

<div className="space-y-4">

{forecast.map((day,index)=>(

<div
key={index}
className="flex items-center justify-between rounded-xl border p-4"
>

<h3>{day[0]}</h3>

<h3 className="text-xl">{day[2]}</h3>

<h3 className="font-bold">{day[1]}</h3>

</div>

))}

</div>

</div>

);

}