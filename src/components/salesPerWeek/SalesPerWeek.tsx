// import { ResponsiveHeatMap } from "@nivo/heatmap";
// import useSalesPerWeek from "./useSalesPerWeek";

// const SalesPerWeek = () => {
//   const rawData = useSalesPerWeek();

//   // ✅ Transform data to match Nivo's `ResponsiveHeatMap`
//   const data = rawData.map((item) => ({
//     id: `${item.hour}PM`, // Use hour as the id
//     data: Object.entries(item)
//       .filter(([key]) => key !== "hour")
//       .map(([day, value]) => ({ x: day, y: value })), // Transform to { x, y } format
//   }));

//   return (
//     <div className="h-96 w-full">
//       <h2 className="text-lg font-semibold mb-4">Sales per Week</h2>
//       {data.length > 0 ? (
//         <ResponsiveHeatMap
//           data={data}
//           keys={["1 Jul", "2 Jul", "3 Jul", "4 Jul", "5 Jul", "6 Jul", "7 Jul"]} // Ensure date keys match data
//           indexBy="hour" // Y-axis → Hour
//           margin={{ top: 40, right: 40, bottom: 40, left: 60 }}
//           colors={{ type: "sequential", scheme: "purple_red" }}
//           axisTop={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//           }}
//           axisLeft={{
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//           }}
//           labelTextColor={{ from: "color", modifiers: [["darker", 1.8]] }}
//           motionConfig="wobbly"
//           enableLabels={false} // Hide labels for a clean look
//           cellOpacity={1}
//           cellBorderWidth={1}
//           cellBorderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
//         />
//       ) : (
//         <p className="text-center text-gray-500">No sales data available</p>
//       )}
//     </div>
//   );
// };

// export default SalesPerWeek;
