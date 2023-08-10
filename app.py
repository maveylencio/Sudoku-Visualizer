from flask import Flask, render_template ,request,jsonify
from pyscript.generate import generate_puzzle
from pyscript.sudokusolver import solve
app = Flask(__name__)





    
@app.route('/', methods=['POST','GET'])
def index():
    if(request.method =='POST'):
        #newgrid = request.json

        
        solvesudoku = request.json.get('solvesudoku')
        if solvesudoku == False:
            board = generate_puzzle()
            response_data = {'message': 'Puzzle Generated','board':board}
            return jsonify(response_data) 
        elif solvesudoku == True:
            board = request.json.get('grid')
            response_data = {'message': 'Puzzle Solved'}
            return jsonify(response_data)
            

    return render_template('index.html')


    

if __name__ == "__main__":
    app.run(debug=True)

