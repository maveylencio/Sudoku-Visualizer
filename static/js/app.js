
const table = document.querySelector('.table')
let speed = 20
let inprogress = false


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
    if(inprogress===true){
        console.log('in progress')
        return
    }
    inprogress=true
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
                            removeClass(td.children[0])
                            addClass(td.children[0],'valid')
                        }
                        else{
                            removeClass(td.children[0])
                        }
                    })
                })
                inprogress=false
            }
            
        })
        .catch(error => {
            console.error('Error:', error);
            inprogress=false
        });
})

clearBtn.addEventListener('click',function(){
    if(inprogress===true){
        return
    }
    clearPuzzle(grid)
})

dropdownItems.forEach(speed =>{
    speed.addEventListener('click',function(e){
        e.preventDefault()
        const selectedspeed = speed.textContent.trim();
        setSpeed(selectedspeed)
        speedTxt.innerHTML = 'Speed:'+selectedspeed
    })
})

visualizeBtn.addEventListener('click',async function(){
    if(inprogress===true){
        console.log('Animation in progress')
        return
    }
    inprogress=true
    console.log(`inprogress: ${inprogress}`)
    clearAllCorrect()

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
        console.log(data.message)
        if(data.animation){
            return animation(grid,data.animation,speed)
        }
    })
    .then(() => {
        inprogress = false;
      })
    .catch(error =>{
        console.log(error)
    })
    
})

const setSpeed = (spid) =>{
    switch(spid){
        case 'Fast':
            speed = 20
            break
        case 'Average':
            speed = 120
            break
        case 'Slow':
            speed = 220
            break
        default:
            speed= 20
            break
    }

}

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

const clearAllCorrect = async () => {
    grid.forEach((row,rowIdx)=>{
        row.forEach((td,colIdx)=>{
            if(td.children[0].classList.contains('correct')){
                td.children[0].value = ''
                removeClass(td.children[0])
            }
        })
    })
}

const animation = async (grid, animationData, speed) => {
    for (let i = 0; i < animationData.length; i++) {
        if (animationData[i].class === 'correct' || animationData[i].class === 'invalid') {
            grid[animationData[i].row][animationData[i].col].children[0].value = animationData[i].value
            addClass(grid[animationData[i].row][animationData[i].col].children[0], animationData[i].class);
        } else {
            grid[animationData[i].row][animationData[i].col].children[0].value = animationData[i].value
            removeClass(grid[animationData[i].row][animationData[i].col].children[0]);
        }
        
        await new Promise(resolve => setTimeout(resolve,speed));
    }
};



