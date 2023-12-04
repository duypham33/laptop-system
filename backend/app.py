from flask import Flask, request, jsonify
from flask_cors import CORS
from util.recommend import recommend_laptops
from util.predict import predictPriceRange

app = Flask(__name__)
CORS(app, resources = {"*": {"origins": "http://localhost:4002"}})

@app.route('/', methods=['GET'])
def index():
    return 'Laptop Recommendation System', 200



@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    recDf, _ = recommend_laptops(data["description"])
    
    return jsonify(recDf.to_dict('records')), 200



@app.route('/predict', methods=['POST'])
def predict_price():
    data = request.get_json()
    print(data)
    min, max, relevants = predictPriceRange(
        data["company"], data["typename"], data["os"],
        data["ram"], data["disk"], data["cpu"], data["gpu"]
    )
    
    return jsonify({'min': min, "max": max, 
        "relevants": relevants.to_dict('records')}), 200

if __name__ == '__main__':
    app.run()
