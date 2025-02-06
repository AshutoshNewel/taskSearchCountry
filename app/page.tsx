// app/page.js

import SearchComponent from "./searchComponent/page";
import SearchCountry from "./searchCountry/page";


export default function Home() {
  return (
    <div className="container mx-auto p-6 bg-gradient-to-r from-indigo-50 via-blue-50 to-teal-50 rounded-lg shadow-xl">
    <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
      Country Search
    </h1>
    <SearchCountry />
  </div>
  
  );
}