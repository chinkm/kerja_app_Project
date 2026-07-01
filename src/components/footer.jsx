import React from "react";

const footer = () => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
      style={{
        height: "78px",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.05)",
      }}
    >
      <div className="flex justify-around items-center h-full">
        {/* Home */}
        <button className="flex flex-col items-center justify-center text-[#4E80E6]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 11.5L12 4l9 7.5M5 10v10h5v-6h4v6h5V10"
            />
          </svg>

          <span className="text-xs mt-1 font-medium">Home</span>
        </button>

        {/* Activity */}
        <button className="flex flex-col items-center justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12h4l2-5 4 10 2-5h6"
            />
          </svg>

          <span className="text-xs mt-1">Activity</span>
        </button>

        {/* Messages */}
        <button className="relative flex flex-col items-center justify-center text-gray-500">
          <span className="absolute top-1 right-2 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
            1
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h8M8 14h5M5 20l2-2h12a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          <span className="text-xs mt-1">Messages</span>
        </button>

        {/* Profile */}
        <button className="flex flex-col items-center justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 5h14c0-3-3-5-7-5z"
            />
          </svg>

          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default footer;
