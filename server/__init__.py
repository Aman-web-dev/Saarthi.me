from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import pipeline



emotion_model = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None,
)
sentiment_model = pipeline(
    "sentiment-analysis",
    model="bhadresh-savani/distilbert-base-uncased-emotion",
    top_k=None,
)


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app,origins=["http://localhost:5173"])


    @app.route("/hello", methods=["POST"])
    def hello():
        data = request.get_json()
        print(data)

        input_message = data.get("message")
        emotions_raw = emotion_model(input_message)[0]
        sentiment_raw = sentiment_model(input_message)[0]

        print(emotions_raw,sentiment_raw)

        emotions = [
            {"label": e["label"], "score": round(e["score"] * 100, 2)} for e in emotions_raw
        ]
        sentiment = [
            {"label": s["label"], "score": round(s["score"] * 100, 2)}
            for s in sentiment_raw
        ]

        return jsonify({"emotion_scores": emotions, "sentiment": sentiment})

    return app
