import {
  Warehouse,
  Wheat,
  PackageCheck,
} from "lucide-react";


function StorageCard() {

  const storage = {
    crop: "Wheat",
    quantity: 145,
    status: "Ready for Sale",
  };


  return (

    <div className="rounded-2xl bg-white p-6 shadow-lg">


      <div className="mb-5 flex items-center gap-3">

        <Warehouse
          size={32}
          className="text-amber-600"
        />


        <div>

          <h2 className="text-xl font-bold text-green-700">
            Storage
          </h2>

          <p className="text-sm text-gray-500">
            Warehouse Monitoring
          </p>

        </div>

      </div>



      <div className="space-y-4">


        <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4">

          <div className="flex items-center gap-3">

            <Wheat
              className="text-amber-600"
            />

            <span>
              Crop
            </span>

          </div>


          <strong>
            {storage.crop}
          </strong>

        </div>




        <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">


          <div className="flex items-center gap-3">

            <Warehouse
              className="text-green-600"
            />

            <span>
              Quantity
            </span>

          </div>


          <strong>
            {storage.quantity} Qtl
          </strong>


        </div>




        <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4">


          <div className="flex items-center gap-3">

            <PackageCheck
              className="text-blue-600"
            />

            <span>
              Status
            </span>

          </div>


          <strong className="text-green-700">
            {storage.status}
          </strong>


        </div>


      </div>


    </div>

  );

}


export default StorageCard;