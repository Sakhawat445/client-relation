import React from "react";
import { useDeviceStats } from "./useDeviceStats";

const DeviceStats = () => {
  const { desktopUsers, mobileUsers } = useDeviceStats();

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between">
        {/* Desktop Users */}
        <div className="w-1/2 pr-2">
          <p className="text-sm text-gray-500">Desktop Users</p>
          <p className="text-lg font-bold">{desktopUsers}%</p>
          <div className="w-full bg-gray-200 h-3 rounded-md">
            <div className="h-3 bg-blue-500 rounded-md" style={{ width: `${desktopUsers}%` }}></div>
          </div>
        </div>

        {/* Mobile Users */}
        <div className="w-1/2 pl-2">
          <p className="text-sm text-gray-500">Mobile Users</p>
          <p className="text-lg font-bold">{mobileUsers}%</p>
          <div className="w-full bg-gray-200 h-3 rounded-md">
            <div className="h-3 bg-green-600 rounded-md" style={{ width: `${mobileUsers}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceStats;
