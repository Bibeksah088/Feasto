import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../assets/frontend_assets/assets";

const PopularPicks = () => {
  const { food_list, url } = useContext(StoreContext);

  // Pick one item from each major category
  const categories = [
    "Starters",
    "Chicken Dishes",
    "Biriyani",
    "Paneer",
    "Vegetarian Delights",
    "Drinks",
    "Desserts",
    "Rolls",
  ];

  const picks = [];
  const seenCategories = new Set();

  for (const item of food_list) {
    // Match category loosely
    const matchedCat = categories.find(
      (cat) =>
        item.category === cat ||
        item.category?.toLowerCase().includes(cat.toLowerCase()) ||
        cat.toLowerCase().includes(item.category?.toLowerCase())
    );
    if (matchedCat && !seenCategories.has(matchedCat)) {
      seenCategories.add(matchedCat);
      picks.push({ ...item, displayCategory: matchedCat });
    }
    if (picks.length >= 8) break;
  }

  // Fallback: if we got fewer than 4, take first items
  if (picks.length < 4) {
    for (const item of food_list) {
      if (!picks.find((p) => p._id === item._id)) {
        picks.push({ ...item, displayCategory: item.category });
      }
      if (picks.length >= 6) break;
    }
  }

  if (picks.length === 0) return null;

  // Determine image src — backend images use url+"/images/"+image, static imports are objects
  const getImageSrc = (image) => {
    if (typeof image === "string" && !image.startsWith("http") && !image.startsWith("data:") && !image.startsWith("/")) {
      return url + "/images/" + image;
    }
    return image;
  };

  return (
    <div className="px-4 md:px-[30px] py-8">
      <div className="flex flex-col gap-2 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          🔥 Popular Picks
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-[600px]">
          Handpicked favorites from every category — discover what everyone's
          ordering!
        </p>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
        {picks.map((item) => (
          <div
            key={item._id}
            onClick={() =>
              document
                .getElementById("FoodDisplay")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex-shrink-0 w-[240px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group bg-white"
          >
            {/* Image */}
            <div className="relative h-[160px] overflow-hidden">
              <img
                src={getImageSrc(item.image)}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#f7983f] text-white text-xs font-semibold px-3 py-1 rounded-full">
                {item.displayCategory || item.category}
              </div>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                <img
                  src={assets.rating_starts}
                  className="w-[60px]"
                  alt="rating"
                />
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">
                {item.description}
              </p>
              <p className="text-lg font-bold text-[#f7983f]">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPicks;
