import axios from "axios";
import { useState } from "react"
import { GoSearch } from 'react-icons/go';
import { toast } from 'react-toastify';
import WeatherReceived from "./components/WeatherReceived";

interface Weather {
  current_condition: [
    {
      lang_pt: [
        {
          value: string;
        }
      ],
      temp_C: string;
    }
    ]
}


export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleSearch = () => {
    axios.get<Weather>(`https://wttr.in/${searchTerm}?lang=pt&format=j1`)
      .then(response => {
        toast.success(`Lugar: ${searchTerm}\n\n Clima: ${response.data.current_condition[0].lang_pt[0].value}\n\nTemperatura: ${response.data.current_condition[0].temp_C} °C`);        
      })
      .catch((e) => {
        console.log(searchTerm)
        toast.error("Cidade/Estado não existente!");
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search" className="sr-only">
          Search City/State
        </label>

        <div className="relative">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Name of city/state"
            className="w-full max-w-md p-4 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-4">
            <GoSearch className="text-gray-400" />
          </div>
        </div>

        <button
          type="submit"
          className="ml-20 px-5 py-2 relative top-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>

        <WeatherReceived />
      </form>
    </div>
  );
}