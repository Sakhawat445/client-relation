import React from "react";
import { useDeviceStats } from "./useDeviceStats";

const DeviceStats = () => {
  const { desktopUsers = 0, mobileUsers = 0 } = useDeviceStats();

  return (
    <div className="p-4 bg-white rounded-xl shadow-md mb-7 w-full">
      {/* Labels */}
      <div className="flex justify-between mb-2 text-sm text-gray-700 font-semibold">
        <div>
          <p className="text-xs text-gray-500">Desktop Users</p>
          <p>{desktopUsers}%</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Mobile Users</p>
          <p>{mobileUsers}%</p>
        </div>
      </div>

      {/* Combined bar */}
      <div className="flex w-full h-6 bg-gray-200 rounded-md overflow-hidden">
        {/* Desktop bar */}
        <div
          className={`h-full bg-blue-500 transition-all duration-300 ${
            desktopUsers === 100 ? "rounded-md" : "rounded-l-md"
          }`}
          style={{ width: `${desktopUsers}%` }}
        ></div>

        {/* Mobile bar */}
        <div
          className={`h-full bg-green-600 transition-all duration-300 ${
            mobileUsers === 100 ? "rounded-md" : "rounded-r-md"
          }`}
          style={{ width: `${mobileUsers}%` }}
        ></div>
      </div>
    </div>
  );
};

export default DeviceStats;
