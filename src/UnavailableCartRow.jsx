import { ImageOff } from "lucide-react";

function UnavailableCartRow({ id, onRemove }) {
  return (
    <div className="border-b p-5">

      <div className="flex gap-5">

        {/* Image */}
        <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-gray-100 border">

          <ImageOff
            size={48}
            className="text-gray-400"
          />

        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col justify-center">

          <h2 className="text-xl font-semibold text-gray-700">
            Product Unavailable
          </h2>

          <p className="mt-2 text-gray-500">
            This product is no longer available.
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Product ID : {id}
          </p>

        </div>

      </div>

      <hr className="my-4" />

      <div className="flex justify-end">

        <button
          onClick={() => onRemove(Number(id))}
          className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700"
        >
          Remove
        </button>

      </div>

    </div>
  );
}

export default UnavailableCartRow;