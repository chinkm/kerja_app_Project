import React from "react";

export default function CategoryCard({ item }) {
  return (
    <div className="p-3 bg-[#EAF2F9] rounded-[16px] min-h-[110px] flex flex-col items-center justify-center">
      <div className="text-[28px] mb-2">{item.icon}</div>
      <div className="text-[14px] font-semibold text-[#2C3E50] text-center">
        {item.name}
      </div>
    </div>
  );
}
