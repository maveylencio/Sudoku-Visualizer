
const table = document.querySelector('.table')

for(let i=0;i<9;i++){
    var tr = document.createElement('tr')
    tr.classList.add(`row-${i}`)
    table.appendChild(tr)
    for(let j=0;j<9;j++){
        var td = document.createElement('td')
        var newInput = document.createElement('input')
        newInput.type='text'
        newInput.maxLength=1
        td.classList.add(`col-${j}`)
        tr.appendChild(td)
        td.appendChild(newInput)

    }
}