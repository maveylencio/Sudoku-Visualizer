from flask import Flask, render_template ,request,jsonify
from pyscript.generate import generate_puzzle
app = Flask(__name__)





    
@app.route('/', methods=['POST','GET'])
def index():
    if(request.method =='POST'):
        #newgrid = request.json

        new_grid = request.json 
        sudokuboard = generate_puzzle() 

        response_data = {'message': 'Puzzle Generated','board':sudokuboard}

        return jsonify(response_data) 


    return render_template('index.html')


    

if __name__ == "__main__":
    app.run(debug=True)

