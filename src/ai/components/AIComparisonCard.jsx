import AIProductCard from "./AIProductCard";

export default function AIComparisonCard({
  products,
  comparison,
}) {

  if (!products || products.length < 2) return null;

  const [left, right] = products;

  const rows = [
    ["Processor", comparison?.processor],
    ["Display", comparison?.display],
    ["Battery", comparison?.battery],
    ["Camera", comparison?.camera],
    ["RAM", comparison?.ram],
    ["Storage", comparison?.storage],
  ];

  return (
    <div className="space-y-4">

      <div className="grid grid-cols-2 gap-4">

        <AIProductCard product={left} />

        <AIProductCard product={right} />

      </div>

      <div className="overflow-hidden rounded-xl border bg-white">

        <table className="w-full text-sm">

          <tbody>

            {rows.map(([label, value]) => (

              <tr
                key={label}
                className="border-b"
              >

                <td className="bg-gray-50 p-3 font-semibold">
                  {label}
                </td>

                <td className="p-3">
                  {value?.product1 || "-"}
                </td>

                <td className="p-3">
                  {value?.product2 || "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}