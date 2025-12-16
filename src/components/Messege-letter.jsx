import React from 'react';

const Card = () => {
  return (
    <div className="card">
      <div
        className="relative w-full sm:w-[350px] group transition-all duration-700 aspect-video flex items-center justify-center rounded-xl"
        style={{
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 0 12px #00ddeb",
        }}
      >
        {/* Inner Content */}
        <div className=" inner-msg transition-all flex flex-col items-center py-5 justify-start duration-300 group-hover:duration-1000 bg-white w-full h-full absolute group-hover:-translate-y-16">
          <p className=" text-gray-500 ">
            Thank You
          </p>
          <p className="px-10 text-[10px] sm:text-[12px] text-gray-700">
            It’s so nice that you had the time to view this idea
          </p>
          <p className="text-[8px] sm:text-[10px] lg:text-[12px] text-gray-700">
            Wishing you a fantastic day ahead!
          </p>
          <p className=" text-[10px] text-gray-700 pt-5">Soumadip Dhara</p>
        </div>

        {/* Seal Button */}
        <button className="seal bg-rose-500 text-red-800 w-8 sm:w-10 lg:w-12 text-[8px] sm:text-[10px] lg:text-[12px] aspect-square rounded-full z-40  flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] group-hover:opacity-0 transition-all duration-1000 group-hover:scale-0 group-hover:rotate-180 border-4 border-rose-900">
          S.Dhara
        </button>

        {/* Envelope Animation Parts */}
        <div className="tp transition-all duration-1000 group-hover:duration-100 bg-neutral-800 absolute group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)] w-full h-full [clip-path:polygon(50%_50%,_100%_0,_0_0)]" />
        <div className="lft transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_0_0,_0_100%)]" />
        <div className="rgt transition-all duration-700 absolute w-full h-full bg-neutral-800 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]" />
        <div className="btm transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]" />
      </div>
    </div>
  );
};

export default Card;
