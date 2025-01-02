import { Film } from 'lucide-react';
import { MovieGallery } from './components/MovieGallery';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <Film className="w-8 h-8 text-blue-500 mr-2" />
            <h1 className="text-3xl font-bold text-white">MOVIE APP</h1>
          </div>
        </div>
      </header>
      <main className="container mx-auto py-8">
        <MovieGallery />
      </main>
    </div>
  );
}

export default App;