import React from "react";

export default function ServiceCarousel() {
  const services = [
    {
      id: 1,

      title: "Home Cleaning",

      pax: "2 Pax",

      distance: "2.2km",

      eta: "5min",

      price: "RM25-50",

      provider: "Kunafa",

      rating: "4.3",

      reviews: "277",

      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800",

      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
    },

    {
      id: 2,

      title: "Plumbing Service",

      pax: "1 Pax",

      distance: "3.5km",

      eta: "10min",

      price: "RM50-120",

      provider: "Ahmad",

      rating: "4.8",

      reviews: "192",

      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800",

      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    },

    {
      id: 3,

      title: "Electrical Repair",

      pax: "1 Pax",

      distance: "1.8km",

      eta: "8min",

      price: "RM60-150",

      provider: "Jason",

      rating: "4.9",

      reviews: "321",

      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800",

      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300",
    },
  ];

  return (
    <div className="w-full py-4">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="min-w-[850px] bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden snap-center"
          >
            <div className="flex h-[260px]">
              {/* Left Image */}

              <div className="w-[35%]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Content */}

              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-5xl font-bold text-slate-700">
                      {service.title}
                    </h2>

                    <span className="text-2xl text-gray-400 font-semibold">
                      ({service.pax})
                    </span>
                  </div>

                  <p className="text-gray-500 font-medium mt-2 text-xl">
                    Ad • {service.distance} ({service.eta} away)
                  </p>

                  <h3 className="text-4xl font-bold text-slate-700 mt-3">
                    {service.price}
                  </h3>
                </div>

                {/* Provider */}

                <div className="flex items-center gap-4">
                  <img
                    src={service.avatar}
                    alt={service.provider}
                    className="w-24 h-24 rounded-full object-cover"
                  />

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-3xl font-bold text-slate-700">
                        {service.provider}
                      </h4>

                      <div className="w-4 h-4 rounded-full bg-sky-400"></div>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-500 text-xl">★</span>

                      <span className="text-gray-500 text-xl font-medium">
                        {service.rating} ({service.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hide Scrollbar */}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;

          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
