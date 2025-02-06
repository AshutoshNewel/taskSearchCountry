"use client";

import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";

type Search = {
  cca3: string;
  name: {
    common: string;
  };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  languages: { [key: string]: string };
  flags: { png: string };
};

export default function SearchCountry() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //   const [countries, setCountries] = useState<Search[]>([]);
  //   const [capitals, setCapitals] = useState<Search[]>([]);
  const [results, setResults] = useState<Search[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Search | null>(null);

  //   console.log(searchTerm);

  const fetchCountries = async (query: string) => {
    if (query.length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);

    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const countryResponse = await fetch(
        `https://restcountries.com/v3.1/name/${query}`
      );
      if (!countryResponse.ok) {
        throw new Error("Couldn't find the country");
      }
      const countryData = await countryResponse.json();
      setResults(countryData);
      console.log(countryData);
    } catch (err) {
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => fetchCountries(query), 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, debouncedSearch]);

  const handleCountryClick = (country: Search) => {
    setSelectedCountry(country);
    setResults([]);
    setSearchTerm("");
  };

  const highlightText = (text: string, query: string): JSX.Element | string => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-bold text-blue-600">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <div className="max-w-md mx-auto relative">
        <div className="flex items-center border border-gray-300 rounded-lg p-2">
          <input
            type="text"
            placeholder="Enter country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-sm text-gray-500"
            >
              clear
            </button>
          )}
        </div>
        {loading && (
          <div className="mt-2 text-gray-500 text-sm" aria-live="polite">
            Loading...
          </div>
        )}

        {results.length > 0 && (
          <ul className="mt-2 border border-gray-300 rounded-lg max-h-48 overflow-y-auto absolute w-full bg-white z-10">
            {results.map((item) => (
              <li
                className="p-2 hover:bg-gray-300 cursor-pointer"
                key={item.cca3}
                onClick={() => handleCountryClick(item)}
              >
                <div className="font-medium">
                  {highlightText(item.name.common, searchTerm)}
                </div>
                <div className="text-sm text-gray-500">
                  Capital: {item.capital}
                </div>
              </li>
            ))}
          </ul>
        )}

        {!loading && searchTerm.length >= 3 && results.length === 0 && (
          <div className="mt-2 text-gray-500 text-sm">No results found</div>
        )}

        {selectedCountry && (
          <div className="mt-6 p-6 text-center border border-gray-200 rounded-lg bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-extrabold text-gray-900">
              {selectedCountry.name.common}
            </h2>
            <img
              src={selectedCountry.flags.png}
              alt={`Flag of ${selectedCountry.name.common}`}
              className="w-36 my-4 block mx-auto rounded-lg shadow-md"
            />
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong className="font-medium">Capital:</strong>{" "}
                {selectedCountry.capital.join(", ")}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="font-medium">Population:</strong>{" "}
                {selectedCountry.population.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="font-medium">Region:</strong>{" "}
                {selectedCountry.region}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="font-medium">Subregion:</strong>{" "}
                {selectedCountry.subregion}
              </p>
              <p className="text-sm text-gray-600">
                <strong className="font-medium">Languages:</strong>{" "}
                {Object.values(selectedCountry.languages).join(", ")}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
