import React, { useState } from "react";
import VoiceProfileModule from "../components/VoiceProfileModule";
import AdsCarousel from "../components/ads-carousel";
import Footer from "../components/footer";
import ReviewCard from "../components/ReviewCard";
import CategoryCard from "../components/CategoriesCard";

export default function Home() {
  const [activeModule] = useState(null);

  const servicesData = [
    {
      id: 1,
      title: "Home Cleaning",
      subtitle: "2 Pax",
      distance: "2.2 km",
      time: "5 min away",
      price: "RM25-50",
      provider: "Kunafa",
      rating: 4.3,
      reviews: 277,
      verified: true,
      image: "🏠",
    },
    {
      id: 2,
      title: "Plumbing Repair",
      subtitle: "1 Pax",
      distance: "1.8 km",
      time: "3 min away",
      price: "RM40-80",
      provider: "Plumbix",
      rating: 4.8,
      reviews: 342,
      verified: true,
      image: "🚰",
    },
    {
      id: 3,
      title: "Electrical Service",
      subtitle: "2 Pax",
      distance: "3.1 km",
      time: "8 min away",
      price: "RM50-100",
      provider: "ElectroFix",
      rating: 4.5,
      reviews: 198,
      verified: true,
      image: "⚡",
    },
    {
      id: 4,
      title: "House Painting",
      subtitle: "3 Pax",
      distance: "2.5 km",
      time: "6 min away",
      price: "RM150-300",
      provider: "PaintPro",
      rating: 4.6,
      reviews: 215,
      verified: true,
      image: "🎨",
    },
    {
      id: 5,
      title: "Deep Cleaning",
      subtitle: "4 Pax",
      distance: "2.9 km",
      time: "7 min away",
      price: "RM80-150",
      provider: "CleanTeam",
      rating: 4.4,
      reviews: 521,
      verified: true,
      image: "🧹",
    },
  ];

  const categories = [
    { name: "Home Maintenance", icon: "🏠" },
    { name: "Plumbing", icon: "🔧" },
    { name: "Electrical", icon: "⚡" },
    { name: "Cleaning Services", icon: "🧹" },
    { name: "Pest Control", icon: "🐜" },
    { name: "Air Conditioning", icon: "❄️" },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#F6F7FC] overflow-x-hidden">
      {/* HEADER SECTION */}
      <div
        className="rounded-b-[2rem] px-4 pt-4 pb-6 shadow-md"
        style={{ backgroundColor: "#5C85D6" }}
      >
        <div className="flex flex-nowrap items-center justify-between w-full gap-3 mb-4">
          {/* Left Group */}
          <div className="flex items-center gap-2 min-w-0 overflow-hidden">
            <svg
              className="w-7 h-7 text-white flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <div className="text-white min-w-0">
              <p className="text-xs opacity-75">Your Location</p>
              <div className="flex items-center gap-1 cursor-pointer">
                <div className="font-bold text-lg truncate">
                  Gamuda Ai Academy
                </div>
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          {/* Profile */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 bg-gray-100 flex-shrink-0">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Search Bar */}
        <div
          className="bg-white rounded-full flex flex-nowrap items-center px-4 py-2 shadow-sm w-full"
          style={{ minHeight: "56px" }}
        >
          <svg
            className="flex-shrink-0"
            style={{ width: "24px", height: "24px", color: "#5C85D6" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            type="text"
            className="border-0 bg-transparent w-full text-lg px-3 outline-none"
            placeholder="Search..."
          />
          <div className="flex flex-nowrap items-center gap-10 flex-shrink-0">
            {/* Microphone */}
            <svg
              className="cursor-pointer"
              style={{ width: "24px", height: "24px", color: "#5C85D6" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>

            {/* Camera */}
            <svg
              className="cursor-pointer"
              style={{
                marginRight: "20px",
                width: "24px",
                height: "24px",
                color: "#5C85D6",
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M3 7a2 2 0 012-2h2l1-2h8l1 2h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
              />

              <circle cx="12" cy="12" r="3.5" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Categories */}

        <section className="px-5 mt-5">
          {/* Main Heading */}

          <h2 className="text-2xl font-bold text-[#4E80E6] mb-4">
            Search by categories
          </h2>

          {/* Sub Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>

            <button className="flex items-center gap-1 text-[#4E80E6] font-semibold">
              View All
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((item, index) => (
              <CategoryCard key={index} item={item} />
            ))}
          </div>
        </section>

        {/* Horizontal Ads */}
        <section className="mt-8 px-5 w-full">
          <div className="overflow-x-auto">
            <div className="flex gap-4 px-5 w-max">
              <AdsCarousel />
            </div>
          </div>
        </section>

        {/* Voice Module */}
        {activeModule === "voiceProfile" && (
          <div className="px-5 mt-8">
            <VoiceProfileModule />
          </div>
        )}

        {/* Recommended */}
        <section className="mt-8 px-5">
          <h2 className="text-2xl font-bold text-[#4E80E6] mb-5">
            Recommended for you
          </h2>
        </section>

        {/* Reviews Section */}
        <div className="px-5 mt-6">
          <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
          <ReviewCard />
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] z-50">
        <Footer />
      </div>
    </div>
  );
}
