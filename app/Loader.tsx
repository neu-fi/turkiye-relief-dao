import React from "react";

const Loader = () => (
  <div className="bg-white w-full h-96 z-10 flex justify-center items-center">
    <div className="w-12 h-12 border-l-4 border-r-2 border-t-2 border-b-2 animate-spin bg-white border-b-stone-700 border-r-inherit border-l-inherit border-t-inherit rounded-full" />
  </div>
);

export default Loader;
