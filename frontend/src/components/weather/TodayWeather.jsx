export default function TodayWeather(){

return(

<div className="rounded-3xl bg-white p-6 shadow">

<h2 className="mb-6 text-2xl font-bold text-green-700">

Today's Weather

</h2>

<div className="grid grid-cols-2 gap-6">

<div>

<p className="text-gray-500">Sunrise</p>

<h3 className="text-2xl font-bold">

6:02 AM

</h3>

</div>

<div>

<p className="text-gray-500">Sunset</p>

<h3 className="text-2xl font-bold">

7:11 PM

</h3>

</div>

<div>

<p className="text-gray-500">Rain Chance</p>

<h3 className="text-2xl font-bold">

25%

</h3>

</div>

<div>

<p className="text-gray-500">Pressure</p>

<h3 className="text-2xl font-bold">

1012 hPa

</h3>

</div>

</div>

</div>

);

}