import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  color: string;
  textColor?: string;
  icon: React.ReactNode;
}

const Card: React.FC<StatCardProps> = ({ title, value, color, textColor = "text-white", icon }) => {
  return (
    <div className={`flex items-center p-4 rounded-xl shadow-md ${color}`}>
      <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">{icon}</div>
      <div className="ml-3">
        <p className={`text-sm ${textColor}`}>{title}</p>
        <p className={`text-2xl font-bold ${textColor}`}>{value.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Card;
