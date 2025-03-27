import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const recipes = [
  {
    id: 1,
    name: "Chocolate Cake",
    description: "A rich and moist chocolate cake perfect for all occasions.",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F11%2Ff7%2Ffa%2F11f7fafd92eabff6bfa638350142962b.png&f=1&nofb=1&ipt=8c04bfc19ae42df853e214f0840afc4f49420401969c66489d31c3cc2ca8ab6d&ipo=images",
    difficulty: "Easy",
    time: "1 hr",
  },
  {
    id: 2,
    name: "Pasta Alfredo",
    description: "Creamy Alfredo pasta with parmesan and garlic flavors.",
    image: "https://source.unsplash.com/400x300/?pasta-alfredo",
    difficulty: "Medium",
    time: "30 mins",
  },
  {
    id: 3,
    name: "Grilled Chicken",
    description: "Juicy grilled chicken with a smoky and spicy marinade.",
    image: "https://source.unsplash.com/400x300/?grilled-chicken",
    difficulty: "Intermediate",
    time: "45 mins",
  },
  {
    id: 4,
    name: "Avocado Toast",
    description: "Crunchy toast with creamy avocado and seasonings.",
    image: "https://source.unsplash.com/400x300/?avocado-toast",
    difficulty: "Easy",
    time: "15 mins",
  },
];

const RecipeSlider = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-[#E8B9AB] py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Delicious Recipes
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our curated collection of mouthwatering dishes
          </p>
        </div>

        <div
          className="max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop
            navigation
            autoplay={
              !isHovered
                ? {
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            modules={[Autoplay, Navigation]}
            className="recipe-swiper"
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {recipes.map((recipe) => (
              <SwiperSlide key={recipe.id}>
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center h-full flex flex-col transition-all duration-300 hover:shadow-xl">
                  <div className="relative mb-6">
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {recipe.difficulty}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {recipe.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {recipe.description}
                    </p>
                  </div>

                  <div className="flex justify-center items-center text-sm text-gray-500 border-t pt-4">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {recipe.time}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default RecipeSlider;
