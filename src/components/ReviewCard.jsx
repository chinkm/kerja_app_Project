import React, { useState } from "react";

export default function ReviewCard() {
  // Tab state tracking: 'service' or 'review'
  const [activeTab, setActiveTab] = useState("service");

  // Service View Mock Data
  const services = [
    {
      title: "Plumbing",
      price: "Rm25-50",
      time: "5min above",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Roofing",
      price: "Rm25-50",
      time: "5min above",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Lawn care",
      price: "Rm25-50",
      time: "5min above",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Delivery services",
      price: "Rm25-50",
      time: "5min above",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Moving services",
      price: "Rm25-50",
      time: "5min above",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Pest Control",
      price: "Rm25-50",
      time: "5min above",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=300&q=80",
    },
  ];

  // Review View Mock Data
  const reviews = Array(3).fill({
    username: "YANG3345",
    timeAgo: "3 days ago",
    rating: 4,
    text: "Home cleaning, or domestic cleaning, is the process of tidying, sanitizing, and organizing a private residence to maintain a hygienic and comfortable living environment.",
    service: "Carpet Cleaning · RM35/h",
    thumbnails: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=150&q=80",
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=150&q=80",
    ],
  });

  return (
    <section className="w-full max-w-4xl mx-auto bg-white font-sans text-gray-800">
      {/* Banner / Header Background Section */}
      <div className="px-6 pt-6">
        <div
          className="relative h-64 bg-cover bg-center rounded-2xl overflow-hidden"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80')`,
          }}
        >
          {/* Back Button */}
          <button className="absolute top-6 left-6 w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Profile Info Row (Shifted upward over banner) */}
      <div className="px-12 -mt-16 relative z-10 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Options Menu Dot */}
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75 0 010 1.5z"
              />
            </svg>
          </button>

          <div className="flex flex-col sm:flex-row items-start gap-5">
            {/* Avatar */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Kunafa"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />

            {/* Profile Details */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-green-500">
                  Active now
                </span>
              </div>
              <div className="flex flex-wrap items-baseline gap-3">
                {/* Changed text-slate-850 to text-slate-900 for dark blue rendering */}
                <h2 className="text-3xl font-bold text-emerald-600 flex items-center gap-1.5">
                  Kunafa{" "}
                  <span className="w-5 h-5 bg-cyan-400 rounded-full flex items-center justify-center text-white text-[10px]">
                    ✓
                  </span>
                </h2>
                <span className="text-sm text-gray-400 font-medium">
                  Joined{" "}
                  <strong className="text-gray-700 font-semibold">
                    8 years
                  </strong>
                </span>
              </div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-0.5 bg-[#dcd7cb] text-gray-700 text-xs font-medium rounded-full">
                  Plumber
                </span>
                <span className="px-3 py-0.5 bg-[#fde199] text-amber-700 text-xs font-medium rounded-full">
                  5 years experience
                </span>
                <span className="px-3 py-0.5 bg-[#3b72f6] text-white text-xs font-medium rounded-full">
                  JPSM
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3 w-full md:w-auto md:pr-6">
            <button className="flex-1 md:flex-none py-2.5 px-8 bg-cyan-400 hover:bg-cyan-500 text-white font-semibold text-sm rounded-full shadow-sm transition text-center min-w-[140px]">
              Chat Now
            </button>
            <button className="p-2.5 border border-cyan-200 rounded-full text-cyan-400 hover:bg-cyan-50 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l5.574-3.137a2.25 2.25 0 111.024 1.83l-5.574 3.137m0 0l5.574 3.13a2.25 2.25 0 11-1.024 1.83l-5.574-3.13a2.25 2.25 0 000-2.186z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center px-12 border-b border-gray-200 mb-6 gap-6">
        <button
          onClick={() => setActiveTab("service")}
          className="py-3 text-xl font-bold transition focus:outline-none"
        >
          <span
            className={`inline-block pb-1 border-b-2 ${activeTab === "service" ? "text-slate-900 border-cyan-400" : "text-gray-300 border-transparent hover:text-gray-400"}`}
          >
            Service
          </span>
        </button>

        <span className="text-gray-300 text-xl font-light">|</span>

        <button
          onClick={() => setActiveTab("review")}
          className="py-3 text-xl font-bold transition focus:outline-none"
        >
          <span
            className={`inline-block pb-1 border-b-2 ${activeTab === "review" ? "text-slate-900 border-cyan-400" : "text-gray-300 border-transparent hover:text-gray-400"}`}
          >
            Review
          </span>
        </button>
      </div>

      {/* Dynamic Content Panel View Toggler */}
      {activeTab === "service" ? (
        /* --- SERVICE VIEWS PANEL --- */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-12 pb-12">
          {services.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col text-left"
            >
              <div className="p-2">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-xl"
                />
              </div>
              <div className="px-4 pb-4 pt-1 space-y-0.5">
                {/* Changed text-slate-850 to text-slate-900 here too */}
                <h3 className="font-bold text-base text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  {item.price}
                </p>
                <p className="text-xs text-gray-400">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* --- REVIEW VIEWS PANEL --- */
        <div className="space-y-12 px-12 pb-12">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="border-b border-gray-100 pb-10 last:border-none last:pb-0"
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <div className="flex-1 w-full flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt=""
                    className="w-12 h-12 rounded-full object-cover shadow-sm flex-shrink-0"
                  />

                  <div className="flex-1 space-y-2.5 text-left">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-slate-900">
                          {review.username}
                        </span>
                        <span className="w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                          ✓
                        </span>
                        <span className="text-xs text-gray-400">
                          {review.timeAgo}
                        </span>
                      </div>

                      <div className="flex items-center gap-0.5 mt-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className={`w-4 h-4 ${i < review.rating ? "text-amber-400" : "text-gray-200"}`}
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                      {review.text}
                    </p>

                    <div>
                      <span className="text-xs font-semibold text-blue-500 hover:underline cursor-pointer">
                        {review.service}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {review.thumbnails.map((src, thumbIdx) => (
                        <img
                          key={thumbIdx}
                          src={src}
                          alt="Attachment"
                          className="w-16 h-16 rounded-xl object-cover border border-gray-200 hover:opacity-90 transition cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-6 items-center pt-2 md:pt-4 self-start pl-16 md:pl-0">
                  <button className="flex flex-col items-center group">
                    <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-green-500 bg-white group-hover:bg-green-50 transition shadow-sm">
                      ☺
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">
                      helpful
                    </span>
                  </button>
                  <button className="flex flex-col items-center group">
                    <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-red-400 bg-white group-hover:bg-red-50 transition shadow-sm">
                      ☹
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">
                      not helpfull
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
