
const table = document.querySelector('.table')
let speed = null


for(let i=0;i<9;i++){
    var tr = document.createElement('tr')
    tr.classList.add("row")
    table.appendChild(tr)
    for(let j=0;j<9;j++){
        var td = document.createElement('td')
        var newInput = document.createElement('input')
        newInput.type='text'
        newInput.maxLength=1
        newInput.dataset.row = i
        newInput.dataset.col = j
        td.classList.add("col")
        tr.appendChild(td)
        td.appendChild(newInput)
    }
}

const grabGrid = () => {
    let grid = []
    for(row=0;row<9;row++){
        let currentRow = []
        let rowElement = document.querySelector(`.table .row:nth-child(${row+1})`)
        for(col=0;col<9;col++){
            currentRow.push(rowElement.children[col])
        }
        grid.push(currentRow)
    }

    return grid
}

let grid = grabGrid()

grid.forEach((row,rowIdx)=>{
    row.forEach((td,colIdx)=>{
        td.children[0].addEventListener('input',(e)=>{
            const inputValue = e.target.value
            const inputRow = e.target.dataset.row
            const inputCol = e.target.dataset.col

            if(inputValue===''){
                removeClass(e.target)
                return
            }

            let isvalid = is_valid_move(grid,inputRow,inputCol,inputValue)
            if(isvalid){
                addClass(e.target,'valid')
            }
            else if(!isvalid){
                addClass(e.target,'invalid')
                setTimeout(function() {
                    removeClass(e.target)
                    e.target.value=''
                }, 500);
            }
        })
    })
})


const title = document.getElementById('title')
const generateBtn= document.getElementById('generateBtn')
const clearBtn = document.getElementById('clearBtn')
const dropdownItems = document.querySelectorAll('#speed .dropdown-item');
const speedTxt = document.getElementById('speedbar')
const visualizeBtn = document.getElementById('visualize')

title.addEventListener('click',function(){
    location.reload()
})

generateBtn.addEventListener('click',function(){
    let  solvesudoku = false
    let requestData = {
        solvesudoku:solvesudoku
    }

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data.message);
            if(data.board){
                grid.forEach((row,rowIdx)=>{
                    row.forEach((td,colIdx)=>{
                        td.children[0].value = data.board[rowIdx][colIdx]
                        if(data.board[rowIdx][colIdx]!=''){
                            addClass(td.children[0],'valid','col')
                        }
                        else{
                            addClass(td.children[0],'col','valid')
                        }
                    })
                })
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
})

clearBtn.addEventListener('click',function(){
    clearPuzzle(grid)
})

dropdownItems.forEach(speed =>{
    speed.addEventListener('click',function(e){
        e.preventDefault()
        const selectedspeed = speed.textContent.trim();
        speed = selectedspeed
        speedTxt.innerHTML = 'Speed:'+selectedspeed
    })
})

visualizeBtn.addEventListener('click',function(){
    console.log('visualize')
    let newgrid = convertArray(grid)
    let solvesudoku = true
    let requestData = {
        grid:newgrid,
        solvesudoku:solvesudoku,
    }

    fetch('/',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data =>{  

    })
    .catch(error =>{
        console.log(error)
    })
    
})

const convertArray = (grid) =>{
    new_grid = []
    grid.forEach((row,rowIdx)=>{
        let new_row = []
        row.forEach((td,colIdx)=>{
            new_row.push(parseInt(td.children[0].value === ''?0:td.children[0].value))
        })
        new_grid.push(new_row)
    })
    return new_grid
}

const is_valid_move = (grid,row,col,number) =>{
    if(number==='0'){
        return false
    }

    for(i=0;i<9;i++){
        if(grid[row][i].children[0].value===number && i!=col){
            return false
        }
    }

    for(i=0;i<9;i++){
        if(grid[i][col].children[0].value===number && i!=row){
            return false
        }
    }

    let corner_row = row - row % 3
    let corner_col = col - col % 3

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(grid[corner_row+i][corner_col+j].children[0].value===number && corner_row+i!=row && corner_col+j!=col){
                return false
            }
        }
    }
    return true
}

const addClass = (input,add) =>{
    input.classList.add(add) 
}

const removeClass = (input) =>{
    input.removeAttribute('class');
}

const clearPuzzle = (grid) =>{
    grid.forEach((row,rowIdx)=>{
        row.forEach((td,colIdx)=>{
            td.children[0].value = ''
            removeClass(td.children[0])
        })
    })
}

const animation = (grid) =>{

}
