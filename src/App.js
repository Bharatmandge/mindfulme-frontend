import React, { useState } from 'react';

// --- SVG Icons ---
const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7h-3A2.5 2.5 0 0 1 4 4.5v0A2.5 2.5 0 0 1 6.5 2h3Z" />
    <path d="M14.5 2A2.5 2.5 0 0 1 17 4.5v0A2.5 2.5 0 0 1 14.5 7h-3A2.5 2.5 0 0 1 9 4.5v0A2.5 2.5 0 0 1 11.5 2h3Z" />
    <path d="M12 7.5c-2 0-2 2-4 2-2 0-2.5-2-4-2" />
    <path d="M12 7.5c2 0 2 2 4 2 2 0 2.5-2 4-2" />
    <path d="M4.5 9.5A2.5 2.5 0 0 1 7 12v0a2.5 2.5 0 0 1-2.5 2.5h-2A2.5 2.5 0 0 1 0 12v0A2.5 2.5 0 0 1 2.5 9.5h2Z" />
    <path d="M19.5 9.5A2.5 2.5 0 0 1 22 12v0a2.5 2.5 0 0 1-2.5 2.5h-2a2.5 2.5 0 0 1-2.5-2.5v0A2.5 2.5 0 0 1 17.5 9.5h2Z" />
    <path d="M9.5 14.5A2.5 2.5 0 0 1 12 17v0a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 4 17v0a2.5 2.5 0 0 1 2.5-2.5h3Z" />
    <path d="M14.5 14.5A2.5 2.5 0 0 1 17 17v0a2.5 2.5 0 0 1-2.5 2.5h-3a2.5 2.5 0 0 1-2.5-2.5v0A2.5 2.5 0 0 1 11.5 14.5h3Z" />
    <path d="M12 14.5c-2 0-2 2-4 2-2 0-2.5-2-4-2" />
    <path d="M12 14.5c2 0 2 2 4 2 2 0 2.5-2 4-2" />
    <path d="M12 22.5c-2 0-2-2-4-2-2 0-2.5-2-4-2" />
    <path d="M12 22.5c2 0 2 2 4 2 2 0 2.5-2 4-2" />
  </svg>
);

const AnalyzeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </svg>
);

const EmotionIcon = ({ emotion }) => {
  const emotionIcons = {
    joy: '',
    sadness: '',
    anger: '',
    fear: '',
    love: '',
    surprise: '',
    neutral: ''
  };
  
  return <span className="emotion-icon">{emotionIcons[emotion] || '😊'}</span>;
};

// --- Main App Component ---
function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);
    setCharCount(inputText.length);
  };

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please describe how you are feeling.');
      return;
    }

    if (text.length < 10) {
      setError('Please provide more details (at least 10 characters).');
      return;
    }

    setLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await fetch("https://mindfulme-3.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);

    } catch (err) {
      console.error("Fetch error:", err);
      setError('Unable to connect to the analysis server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // CSS styles as a template literal
  const AppStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    :root {
      --primary: #2563eb;
      --primary-light: #3b82f6;
      --primary-dark: #1d4ed8;
      --secondary: #6366f1;
      --text-dark: #1f2937;
      --text-light: #6b7280;
      --text-lighter: #9ca3af;
      --bg-light: #f9fafb;
      --bg-white: #ffffff;
      --border: #e5e7eb;
      --error: #ef4444;
      --success: #10b981;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      --radius: 8px;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: var(--bg-light);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      color: var(--text-dark);
      line-height: 1.5;
    }
    
    .container {
      max-width: 600px;
      width: 100%;
    }
    
    .card {
      background: var(--bg-white);
      border-radius: 12px;
      padding: 2rem;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border);
    }
    
    .header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      font-size: 1.875rem;
      font-weight: 700;
      color: var(--text-dark);
      margin-bottom: 0.5rem;
    }
    
    .subtitle {
      font-size: 1rem;
      color: var(--text-light);
    }
    
    .input-container {
      margin-bottom: 1.5rem;
    }
    
    .textarea {
      width: 100%;
      min-height: 140px;
      padding: 1rem;
      border-radius: var(--radius);
      border: 1px solid var(--border);
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      resize: none;
      box-sizing: border-box;
      background: var(--bg-white);
      color: var(--text-dark);
      transition: all 0.2s ease;
      line-height: 1.5;
    }
    
    .textarea:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
    
    .textarea::placeholder {
      color: var(--text-lighter);
    }
    
    .char-count {
      font-size: 0.75rem;
      color: var(--text-lighter);
      text-align: right;
      margin-top: 0.5rem;
    }
    
    .button {
      background: var(--primary);
      color: white;
      border: none;
      border-radius: var(--radius);
      padding: 0.875rem 1.5rem;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
    }
    
    .button:hover:not(:disabled) {
      background: var(--primary-dark);
    }
    
    .button:active:not(:disabled) {
      transform: translateY(1px);
    }
    
    .button:disabled {
      background: var(--text-lighter);
      cursor: not-allowed;
    }
    
    .spinner {
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top: 2px solid #fff;
      width: 18px;
      height: 18px;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .error {
      color: var(--error);
      margin-top: 1rem;
      font-size: 0.875rem;
      padding: 0.75rem;
      background: rgba(239, 68, 68, 0.05);
      border-radius: var(--radius);
      border-left: 3px solid var(--error);
    }
    
    .result-card {
      margin-top: 2rem;
      background: var(--bg-white);
      border-radius: var(--radius);
      overflow: hidden;
      border: 1px solid var(--border);
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .result-header {
      padding: 1.25rem;
      background: var(--primary-light);
      color: white;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .result-emotion {
      font-size: 1.25rem;
      font-weight: 600;
      text-transform: capitalize;
    }
    
    .emotion-icon {
      font-size: 1.5rem;
    }
    
    .result-content {
      padding: 1.5rem;
    }
    
    .result-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .result-text {
      font-size: 1rem;
      color: var(--text-dark);
      line-height: 1.6;
    }
    
    /* Emotion-specific colors */
    .joy { color: #f59e0b; }
    .sadness { color: #3b82f6; }
    .anger { color: #ef4444; }
    .fear { color: #8b5cf6; }
    .love { color: #ec4899; }
    .surprise { color: #06b6d4; }
    .neutral { color: #6b7280; }
    
    /* Responsive adjustments */
    @media (max-width: 640px) {
      .card {
        padding: 1.5rem;
      }
      
      .title {
        font-size: 1.5rem;
      }
    }
  `;

  return (
    <>
      <style>{AppStyles}</style>
      <div className="container">
        <div className="card">
          <div className="header">
            <h1 className="title">
              <BrainIcon />
              Mindful Me
            </h1>
            <p className="subtitle">Understand and reflect on your emotional patterns</p>
          </div>
          
          <div className="input-container">
            <textarea
              className="textarea"
              placeholder="Describe how you're feeling today..."
              value={text}
              onChange={handleTextChange}
              disabled={loading}
              maxLength={500}
            />
            <div className="char-count">{charCount}/500 characters</div>
          </div>
          
          <button className="button" onClick={handleAnalyze} disabled={loading}>
            {loading ? (
              <>
                <div className="spinner"></div>
                Analyzing...
              </>
            ) : (
              <>
                <AnalyzeIcon />
                Analyze Emotions
              </>
            )}
          </button>
          
          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {result && (
            <div className="result-card">
              <div className="result-header">
                <EmotionIcon emotion={result.prediction} />
                <div className={`result-emotion ${result.prediction}`}>{result.prediction}</div>
              </div>
              
              <div className="result-content">
                <div className="result-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Insights & Advice
                </div>
                <p className="result-text">{result.advice}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;