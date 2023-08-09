
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
                changeClass(e.target,'col','valid')
                return
            }

            let isvalid = is_valid_move(grid,inputRow,inputCol,inputValue)
            if(isvalid){
                //console.log(`valid number: ${inputValue}`)
                changeClass(e.target,'valid','col')
            }
            else if(!isvalid){
                //console.log(`invalid number: ${inputValue}`)
                changeClass(e.target,'invalid','col')
                setTimeout(function() {
                    changeClass(e.target,'col','invalid')
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
    clearPuzzle(grid)
    newgrid = convertArray(grid)
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newgrid)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data.message);
            grid.forEach((row,rowIdx)=>{
                row.forEach((td,colIdx)=>{
                    td.children[0].value = data.board[rowIdx][colIdx]
                    if(data.board[rowIdx][colIdx]!=''){
                        changeClass(td.children[0],'valid','col')
                    }
                    
                })
            })
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
    
})

const convertArray = (grid) =>{
    new_grid = []
    grid.forEach((row,rowIdx)=>{
        let new_row = []
        row.forEach((td,colIdx)=>{
            new_row.push(td.children[0].value)
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

const changeClass = (input,add,remove) =>{
    input.classList.add(add)
    input.classList.remove(remove)
}

const  clearPuzzle = (grid) =>{
    grid.forEach((row,rowIdx)=>{
        row.forEach((td,colIdx)=>{
            td.children[0].value = ''
            changeClass(td.children[0],'col','valid')
        })
    })
}

