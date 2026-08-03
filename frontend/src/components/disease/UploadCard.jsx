import { Upload, ImagePlus, Trash2 } from "lucide-react";

function UploadCard({
  image,
  handleImage,
  removeImage,
}) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-green-700">
        Upload Crop Image
      </h2>

      <label className="flex h-96 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-green-400 bg-green-50 transition hover:bg-green-100">

        {image ? (
          <img
            src={image}
            alt="Preview"
            className="h-full w-full rounded-3xl object-cover"
          />
        ) : (
          <>
            <Upload
              size={70}
              className="mb-4 text-green-600"
            />

            <h3 className="text-2xl font-bold">
              Drag & Drop Image
            </h3>

            <p className="mt-2 text-gray-500">
              or click to browse
            </p>

            <div className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white">
              <ImagePlus size={18} className="mr-2 inline" />
              Browse Image
            </div>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="hidden"
        />

      </label>

      {image && (
        <button
          onClick={removeImage}
          className="mt-6 flex items-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600"
        >
          <Trash2 size={18} />
          Remove Image
        </button>
      )}

    </div>
  );
}

export default UploadCard;