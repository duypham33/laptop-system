import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import RecommendPage from './pages/RecommendPage/RecommendPage';
import PredictPage from './pages/PredictPage/PredictPage';

function App() {
  const [page, setPage] = useState(0);

  return (
    <div className="App">
      <Navbar val={page} onChange={setPage} />
      {
        page === 0 ? <RecommendPage /> : <PredictPage />
      }
    </div>
  );
}

export default App;
