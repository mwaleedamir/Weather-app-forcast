import React from "react";
import googlePlayBadge from "../assets/images/en_badge_web_generic.png";
import appleStoreBadge from "../assets/images/app-store-icons-apple-app-store.png";
import { Link } from "react-router-dom";
import Portal from "../dashboard/Portal";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center px-6 md:px-16 lg:px-40 py-5">
        {/* Text Section */}
        <div className="w-full md:w-1/2 pt-5 text-center md:text-left">
          <h6 className="text-lg py-3 text-blue-500">
            Easy way to know daily weather
          </h6>
          <Link
            to="/user/weatherSearching"
            className="text-3xl md:text-4xl pb-5 font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent"
          >
            Smart app for getting weather update.
          </Link>
          <p className="text-md md:text-lg mb-4">
            Share your thoughts with us and make sure your nice journey
            anywhere.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <Link to="#">
              <img
                className="w-48 md:w-64 mt-2"
                src={googlePlayBadge}
                alt="Google Play Store Badge"
              />
            </Link>
            <Link to="#">
              <img
                className="w-48 md:w-64"
                src={appleStoreBadge}
                alt="Apple Store Badge"
              />
            </Link>
          </div>
        </div>

        {/* Image/Weather Section */}
        <div className="w-full md:w-1/2 img-container mb-6 md:mb-0">
          <div className="flex justify-center">
            <Portal />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
