import React, { useState, useEffect } from 'react';

// --- SVG Icons ---
const BrainIcon = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
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

const HeartIcon = ({ className = "w-8 h-8" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

// --- Emotion to Emoji Mapping ---
const emotionToEmoji = {
    joy: '😄',
    sadness: '😢',
    anger: '😠',
    fear: '😨',
    love: '❤️',
    surprise: '😲',
    neutral: '😐'
};

// --- Main App Component ---
function App() {
    // State management
    const [text, setText] = useState('');
    const [history, setHistory] = useState([]);
    const [currentResult, setCurrentResult] = useState(null); // State for the latest result
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Load Tailwind CSS via a script tag in the head
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.tailwindcss.com';
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);

    // Handler for text area changes
    const handleTextChange = (e) => {
        setText(e.target.value);
        if (error) setError(''); // Clear error on new input
    };

    // Handler for the analysis button click
    const handleAnalyze = async () => {
        // Basic validation
        if (!text.trim()) {
            setError('Please type your feelings before analyzing.');
            return;
        }
        if (text.trim().length < 10) {
            setError('Please share a bit more (at least 10 characters).');
            return;
        }

        setLoading(true);
        setError('');
        setCurrentResult(null); // Clear previous result before new analysis

        try {
            // API call - this part is unchanged as requested
            const response = await fetch("https://mindfulme-3.onrender.com/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const data = await response.json();
            
            const newEntry = {
                ...data,
                id: new Date().toISOString(), // Unique key for rendering
                originalText: text, // Save the text that was analyzed
            };
            
            setCurrentResult(newEntry); // Set the new result to be displayed in detail
            setHistory(prevHistory => [newEntry, ...prevHistory]); // Add to history
            setText(''); // Clear the text area

        } catch (err) {
            console.error("Fetch error:", err);
            setError('Unable to connect to the analysis server. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen w-full font-sans text-gray-800 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            {/* Header Section */}
            <header className="text-center mb-8 w-full max-w-6xl">
                <div className="flex items-center justify-center gap-3">
                    <BrainIcon className="w-9 h-9 text-indigo-500" />
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">Mindful Me</h1>
                    <HeartIcon className="w-9 h-9 text-pink-500" />
                </div>
                <p className="text-lg text-gray-600 mt-2">Your personal mental wellness companion</p>
            </header>

            {/* Main Content Area */}
            <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Input and Result */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    {/* Input Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
                        <h2 className="text-2xl font-semibold text-gray-700">How are you feeling today?</h2>
                        <p className="text-gray-500 mb-6">Share your thoughts and emotions. I'll help you understand and process them.</p>
                        
                        <textarea
                            className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200 placeholder-gray-400"
                            placeholder="Type your feelings here... What's on your mind?"
                            value={text}
                            onChange={handleTextChange}
                            disabled={loading}
                        />
                        
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        
                        <button 
                            onClick={handleAnalyze} 
                            disabled={loading}
                            className="w-full mt-4 bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition duration-200 shadow-md"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analyzing...
                                </>
                            ) : ( 'Analyze My Feelings' )}
                        </button>
                    </div>

                    {/* Current Result Card */}
                    {currentResult && (
                         <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 animate-fade-in">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your Latest Result</h2>
                            <div className="flex items-center gap-4 mb-3">
                                <span className="text-4xl">{emotionToEmoji[currentResult.prediction] || '😊'}</span>
                                <h3 className="font-bold text-3xl capitalize text-gray-800">{currentResult.prediction}</h3>
                            </div>
                            <p className="text-gray-600 text-md italic mb-4">Based on: "{currentResult.originalText}"</p>
                            <div className="border-t border-gray-200 pt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Insights & Advice:</h4>
                                <p className="text-gray-700 leading-relaxed">{currentResult.advice}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: History Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 h-full">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your History</h2>
                        <p className="text-gray-500 mb-6">{history.length} {history.length === 1 ? 'entry' : 'entries'} recorded</p>
                        
                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                            {history.length === 0 ? (
                                <p className="text-gray-500 text-center py-10">No entries yet. Share your feelings to get started!</p>
                            ) : (
                                history.map(entry => (
                                    <div key={entry.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 animate-fade-in-fast cursor-pointer hover:bg-indigo-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{emotionToEmoji[entry.prediction] || '😊'}</span>
                                            <div className="flex-grow overflow-hidden">
                                                <h3 className="font-semibold capitalize text-gray-800">{entry.prediction}</h3>
                                                <p className="text-gray-500 text-sm truncate">"{entry.originalText}"</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Add keyframes for animation in a style tag
const AnimationStyles = () => (
    <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeInFast {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-fast {
            animation: fadeInFast 0.4s ease-out forwards;
        }
    `}</style>
);

// We need to render AnimationStyles along with App
const AppWrapper = () => (
    <>
        <AnimationStyles />
        <App />
    </>
);

export default AppWrapper;
