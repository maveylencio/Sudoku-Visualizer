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


def solve(grid,row,col):
    if col==9:
        if row==8:
            return True
        row+=1
        col=0
    #check if grid value is not equal to 0
    if grid[row][col]>0:
        return solve(grid,row,col+1)
    #try all possible number with forloop
    for num in range(1,10):
        if is_valid_move(grid,row,col,num):
            grid[row][col] = num
            if(solve(grid,row,col+1)):
                return True
        grid[row][col] = 0

    return False

