import { useState } from 'react';
import PRInput from './components/PRInput.jsx';
import AnalysisResult from './components/AnalysisResult.jsx';
import Loader from './components/Loader.jsx';
import { analyzePR } from './api.js';
import './styles/App.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (prUrl) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzePR(prUrl);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>GitHub PR Analyzer</h1>
        <p>Paste a GitHub Pull Request link to get an AI-powered review summary.</p>
      </header>

      <PRInput onAnalyze={handleAnalyze} loading={loading} />

      {error && <p className="error-message">{error}</p>}

      {loading && <Loader />}

      {!loading && result && <AnalysisResult data={result} />}
    </div>
  );
}

export default App;
