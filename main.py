
def is_valid_move(grid,row,col,number):
    for x in range(9):
        if(grid[row][x]==number):
            return False
    for x in range(9):
        if(grid[x][col]==number):
            return False
        
    corner_row = row - row % 3
    corner_col = col - col % 3


    for x in range(3):
        for y in range(3):
            if(grid[corner_row+x][corner_col+y]==number):
                return False
            

    return True



# def solve(grid,row,col):
#     if(col==9):
#         if(row==8):
#             return True
#         row+=1
#         col=0
        
#     if(grid[row][col]>0):
#         return solve(grid,row,col+1)
    
#     for num in range(1,10):
#         if(is_valid_move(grid,row,col,num)):
#             grid[row][col]=num
#             if(solve(grid,row,col+1)):
#                 return True
#         grid[row][col]=0

#     return False






# if(solve(grid,0,0)):
#     for i in range(9):
#         for j in range(9):
#             print(grid[i][j],end="")
#         print()
# else:
#     print('no solution')



import time


# sudoku_grid =  [[5, 3, 0, 0, 7, 0, 0, 0, 0],
#                 [6, 0, 0, 1, 9, 5, 0, 0, 0],
#                 [0, 9, 8, 0, 0, 0, 0, 6, 0],
#                 [8, 0, 0, 0, 6, 0, 0, 0, 3],
#                 [4, 0, 0, 8, 0, 3, 0, 0, 1],
#                 [7, 0, 0, 0, 2, 0, 0, 0, 6],
#                 [0, 6, 0, 0, 0, 0, 2, 8, 0],
#                 [0, 0, 0, 4, 1, 9, 0, 0, 5],
#                 [0, 0, 0, 0, 8, 0, 0, 7, 9]]

sudoku_grid =  [[9, 4, 0, 0, 3, 1, 0, 0, 7],
                [6, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 2, 0, 0, 9],
                [0, 7, 0, 0, 6, 0, 2, 0, 0],
                [0, 9, 0, 0, 4, 0, 8, 0, 0],
                [0, 3, 0, 0, 0, 0, 5, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 1],
                [0, 2, 0, 0, 8, 0, 0, 8, 0],
                [0, 0, 0, 0, 0, 0, 0, 7, 0]]


import time

def solve(grid, row, col):
    if col == 9:
        if row == 8:
            print("Solution Found:")
            print_grid(grid)
            input("Press Enter to continue...")
            return True
        row += 1
        col = 0

    if grid[row][col] > 0:
        print("Cell ({}, {}) already filled with {}".format(row, col, grid[row][col]))         
        #input("Press Enter to continue...")
        return solve(grid, row, col + 1)

    for num in range(1, 10):
        print('-------------------------------------------')
        print("Loop: {} at ({}, {})".format(num, row, col))
        
        if is_valid_move(grid, row, col, num):
            grid[row][col] = num
            print("Placing {} at ({}, {})".format(num, row, col))
           #input("Press Enter to continue...")
            if solve(grid, row, col + 1):
                return True

        print("Cannot place {} at ({}, {})".format(num, row, col))

        grid[row][col] = 0
    print('return false')
    return False

def print_grid(grid):
    for row in grid:
        print(row)

# Assuming you have the Sudoku grid 'sudoku_grid' defined earlier
solve(sudoku_grid, 0, 0)

