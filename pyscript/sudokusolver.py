def is_valid_move(grid,row,col,number):
    #check for rows
    for curr_row in range(9):
        if grid[curr_row][col] == number:
            return False
    #check for cols
    for curr_col in range(9):
        if grid[row][curr_col] == number:
            return False
    #find start of block
    start_row = row - row % 3
    start_col = col - col % 3
    #check for 3  By 3 
    for row in range(3):
        for col in range(3):
            if grid[start_row+row][start_col+col] == number:
                return False
            
    return True


def sudokusolver(grid,row,col,animation):
    if col==9:
        row+=1
        col=0
        if row==9:
            return animation
        
    #check if grid value is not equal to 0
    if grid[row][col]>0:
        return sudokusolver(grid,row,col+1,animation)
    #try all possible number with forloop
    for num in range(1,10):
        if is_valid_move(grid,row,col,num):
            grid[row][col] = num
            animation.append({'value':str(num),'row':row,'col':col,'class':'correct'})
            if(sudokusolver(grid,row,col+1,animation)):
                return animation 
        animation.append({'value':num,'row':row,'col':col,'class':'invalid'})
        grid[row][col] = 0
        animation.append({'value':'','row':row,'col':col,'class':'remove'})

    return False



