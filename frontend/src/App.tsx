import { useState, useEffect } from "react";
import {
  Brain,
  Zap,
  BarChart3,
  Users,

  ArrowRight,
  Play,
  Heart,
  Smile,
  Frown,
  Meh,
} from "lucide-react";

import "./App.css";

const emotionColorMap = {
  joy: "bg-yellow-500",
  sadness: "bg-gray-500",
  anger: "bg-red-500",
  fear: "bg-blue-500",
  surprise: "bg-pink-500",
  disgust: "bg-green-500",
  love: "bg-purple-500",
  neutral: "bg-gray-400",
};

const defaultEmotions = [
  { emotion: "joy", score: 0, color: emotionColorMap.joy },
  { emotion: "sadness", score: 0, color: emotionColorMap.sadness },
  { emotion: "anger", score: 0, color: emotionColorMap.anger },
  { emotion: "fear", score: 0, color: emotionColorMap.fear },
  { emotion: "surprise", score: 0, color: emotionColorMap.surprise },
  { emotion: "disgust", score: 0, color: emotionColorMap.disgust },
  { emotion: "love", score: 0, color: emotionColorMap.love },
  { emotion: "neutral", score: 0, color: emotionColorMap.neutral },
];

function App() {
  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [demoText, setDemoText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(defaultEmotions);

  const emotions = [
    {
      icon: <Smile className="w-8 h-8" />,
      name: "Happy",
      color: "text-yellow-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      name: "Excited",
      color: "text-pink-500",
    },
    {
      icon: <Frown className="w-8 h-8" />,
      name: "Sad",
      color: "text-blue-500",
    },
    {
      icon: <Meh className="w-8 h-8" />,
      name: "Neutral",
      color: "text-gray-500",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmotion((prev) => (prev + 1) % emotions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleDemo = async () => {
    if (!demoText.trim()) return;

    setIsAnalyzing(true);
    setShowResults(false);

    const res = await fetch("http://127.0.0.1:5000/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message : demoText }),
    });

    const data = await res.json();
    const updated = defaultEmotions.map((item) => {
      const found = data.emotion_scores.find((e:any) => e.label === item.emotion);
      return {
        ...item,
        score: found ? Math.round(found.score) : 0,
      };
    });

    setResults(updated);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Smile className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold">Emotion AI</span>
          </div>
          <div className="hidden md:flex space-x-8"></div>
          <button className="bg-white text-purple-900 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition-colors">
            Get Started
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm">AI-Powered Emotion Analysis</span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Understand Your
                <span className="block text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                  Emotions
                </span>
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Discover the depth of your emotional landscape with our advanced
                AI. Get detailed emotion scores and insights to better
                understand yourself and improve your well-being.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Try Demo</span>
                </button>
                <button className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <span className="mr-3">Live Demo</span>
                    {emotions[currentEmotion].icon}
                  </h3>
                  <div className="bg-white/10 rounded-lg p-4 mb-4">
                    <textarea
                      value={demoText}
                      onChange={(e) => setDemoText(e.target.value)}
                      placeholder="Type how you're feeling... (e.g., 'I'm feeling amazing today, everything is going perfectly!')"
                      className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none resize-none h-20"
                    />
                  </div>
                  <button
                    onClick={handleDemo}
                    disabled={!demoText.trim() || isAnalyzing}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-5 h-5" />
                        <span>Analyze Emotions</span>
                      </>
                    )}
                  </button>
                </div>

                {showResults && (
                  <div className="space-y-3 animate-fade-in">
                    <h4 className="text-lg font-semibold mb-4">
                      Emotion Scores:
                    </h4>
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm font-medium">
                          {result.emotion}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-white/10 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${result.color} transition-all duration-1000`}
                              style={{ width: `${result.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-bold w-8">
                            {result.score}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Powerful Features for
              <span className="block text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                Emotional Intelligence
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our advanced AI analyzes your text to provide detailed emotional
              insights and help you understand your feelings better.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Brain className="w-12 h-12 text-purple-400" />,
                title: "AI-Powered Analysis",
                description:
                  "Advanced machine learning algorithms analyze your text to identify and quantify multiple emotions simultaneously.",
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-blue-400" />,
                title: "Detailed Scoring",
                description:
                  "Get precise percentage scores for happiness, sadness, anger, excitement, and 20+ other emotions.",
              },
              {
                icon: <Users className="w-12 h-12 text-green-400" />,
                title: "Personal Insights",
                description:
                  "Track your emotional patterns over time and gain valuable insights into your mental well-being.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all transform hover:scale-105"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Understand Your
            <span className="block text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Emotional World?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who are already gaining deeper insights into
            their emotions
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-12 py-4 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto">
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <footer className="relative z-10 px-4 py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Smile className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold">Emotion AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
