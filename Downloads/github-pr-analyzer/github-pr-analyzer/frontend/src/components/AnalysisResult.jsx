function riskClass(level) {
  if (level === 'high') return 'risk-badge risk-high';
  if (level === 'medium') return 'risk-badge risk-medium';
  return 'risk-badge risk-low';
}

function AnalysisResult({ data }) {
  if (!data) return null;

  return (
    <div className="result-card">
      <div className="result-header">
        <h2>{data.title}</h2>
        <span className={riskClass(data.riskLevel)}>{data.riskLevel} risk</span>
      </div>

      <p className="result-meta">
        {data.owner}/{data.repo} · PR #{data.prNumber} · by {data.author}
      </p>

      <div className="result-stats">
        <span>📁 {data.filesChanged} files</span>
        <span className="stat-add">+{data.additions}</span>
        <span className="stat-del">-{data.deletions}</span>
      </div>

      <div className="result-section">
        <h3>Summary</h3>
        <p>{data.summary}</p>
      </div>

      {data.suggestions?.length > 0 && (
        <div className="result-section">
          <h3>Suggestions</h3>
          <ul>
            {data.suggestions.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AnalysisResult;
