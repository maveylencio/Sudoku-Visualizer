
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

        newInput.addEventListener('input',function(e){
            
            const inputValue = e.target.value
            const inputRow = e.target.dataset.row
            const inputCol = e.target.dataset.col


            if (inputValue === "") {
                changeClass(e.target,'col','valid')
                return;
            }

            let grid = getallvalue()
            let isvalid = is_valid_move(grid,inputRow,inputCol,inputValue)
            console.log(grid)
            if(isvalid){
                console.log(`valid number: ${inputValue}`)
                changeClass(e.target,'valid','col')
            }
            else if(!isvalid){
                console.log(`not valid number: ${inputValue}`)
                changeClass(e.target,'invalid','col')
                setTimeout(function() {
                    changeClass(e.target,'col','invalid')
                    e.target.value=''
                }, 600);
            }
        })
    }
}


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
    console.log('generate puzzle')
})

clearBtn.addEventListener('click',function(){
    clearPuzzle()
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
    
    
})

function getallvalue(){
    const inputs = table.querySelectorAll('input[type="text"]');
    let grid= [];

    for (let i = 0; i < 9; i++) {
        grid.push([]);
    }
    for(i=0;i<inputs.length;i++){
        let row = Math.floor(i/9)
        let col = Math.floor(i%9)
        grid[row][col] = inputs[i].value
    }
    
    return grid
}


function is_valid_move(grid,row,col,number){
    for(i=0;i<9;i++){
        if(grid[row][i]===number && i!=col){
            return false
        }
    }

    for(i=0;i<9;i++){
        if(grid[i][col]===number && i!=row){
            return false
        }
    }

    let corner_row = row - row % 3
    let corner_col = col - col % 3

    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(grid[corner_row+i][corner_col+j]===number && corner_row+i!=row && corner_col+j!=col){
                return false
            }
        }
    }
    return true
}

function changeClass(input,add,remove){
    input.classList.add(add)
    input.classList.remove(remove)
}

function clearPuzzle(){
    const inputs = table.querySelectorAll('input[type="text"]');

    for(let i=0;i<inputs.length;i++){
        if(inputs[i].classList.contains('valid')){
            changeClass(inputs[i],'col','valid')
            inputs[i].value=''
        }
    }
}

