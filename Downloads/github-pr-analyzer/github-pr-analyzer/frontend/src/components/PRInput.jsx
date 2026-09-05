import { useState } from 'react';

function PRInput({ onAnalyze, loading }) {
  const [prUrl, setPrUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!prUrl.trim()) return;
    onAnalyze(prUrl.trim());
  };

  return (
    <form className="pr-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="https://github.com/owner/repo/pull/123"
        value={prUrl}
        onChange={(e) => setPrUrl(e.target.value)}
        className="pr-input"
      />
      <button type="submit" className="pr-submit-btn" disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze PR'}
      </button>
    </form>
  );
}

export default PRInput;
