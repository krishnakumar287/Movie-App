import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="relative max-w-xl mx-auto mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl rounded-lg"></div>
      <div className="relative flex items-center bg-white bg-opacity-10 rounded-lg border border-white border-opacity-20 backdrop-blur-lg">
        <Search className="w-5 h-5 text-gray-400 ml-4" />
        <input
          type="text"
          placeholder="Search for movies..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full py-3 px-4 bg-transparent text-white placeholder-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
}