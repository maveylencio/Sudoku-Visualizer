from random import sample


def pattern(r,c,offsets):
    return (offsets[r]+c)%9

def shuffle(s):
    return sample(s,len(s))

def removeRandom(board):
    random_numbers = sample(range(1, 81), k=40) 
    #flatvalue // 9 = row
    #flatvalue % 9 = col
    for x in random_numbers:
        row = x//9
        col = x%9
        board[row][col] = ''
       

def generate_puzzle():
    base = 3
  
    #generate random value to 1-9
    nums = [num for num in shuffle(range(1,base*base+1))]
    #generate random rows
    rows = [block*base+row for block in shuffle(range(base)) for row in shuffle(range(base))]
    #generate random cols
    cols = [block*base+col for block in shuffle(range(base)) for col in shuffle(range(base))]
    #offets for pattern
    offsets = [0,3,6,1,4,7,2,5,8]
    
    board = [[nums[pattern(r,c,offsets)] for c in cols] for r in rows]
    removeRandom(board)
    return board





