import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

interface CharactersResponse {
  results: Character[];
}

async function fetchCharacters() {
  const { data } = await axios.get<CharactersResponse>( 
    // The fetchCharacters function is an asynchronous function that uses axios 
    // to make a GET request to the Star Wars API (SWAPI) to retrieve a list of characters.
    "https://swapi.dev/api/people/"
  );
  return data.results; // The function returns the results property from the API response, which contains an array of character objects.
}

export default function Home() {
  const {
    data: characters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["characters"],
    queryFn: fetchCharacters,
  }); // The useQuery hook from React Query is used to fetch the list of Star Wars characters from the API.
  // It takes a query key (["characters"]) and a query function (fetchCharacters) that performs the API call. 
  // The hook returns the fetched data (characters), a loading state (isLoading), and any error that occurred during the fetch (error).


  if (isLoading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <p className="text-xl">Loading Star Wars characters...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <p className="text-xl text-red-500">
          Error loading characters: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Star Wars Characters
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters?.map((character) => (
          <div
            key={character.name}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow text-gray-800"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {character.name}
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium text-gray-700">Height:</span>{" "}
                <span className="text-gray-600">{character.height} cm</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Mass:</span>{" "}
                <span className="text-gray-600">{character.mass} kg</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Hair Color:</span>{" "}
                <span className="text-gray-600">{character.hair_color}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Skin Color:</span>{" "}
                <span className="text-gray-600">{character.skin_color}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Eye Color:</span>{" "}
                <span className="text-gray-600">{character.eye_color}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Birth Year:</span>{" "}
                <span className="text-gray-600">{character.birth_year}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Gender:</span>{" "}
                <span className="text-gray-600">{character.gender}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
