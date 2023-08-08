import os
os.system('cls' if os.name == 'nt' else 'clear')

base = 3
from random import sample
def pattern(r,c,offsets):
    return (offsets[r]+c)%9

def shuffle(s):
    return sample(s,len(s))

#generate random value to 1-9
#nums = [num for num in shuffle(range(1,base*base+1))]
#generate random rows
#rows = [block*base+row for block in shuffle(range(base)) for row in shuffle(range(base))]
#generate random cols
#cols = [block*base+col for block in shuffle(range(base)) for col in shuffle(range(base))]
rows = [7,8,6,0,2,1,4,5,3]
cols = [3,5,4,8,6,7,0,1,2]
nums = [3,5,1,7,9,4,8,6,2]
offsets = [0,3,6,1,4,7,2,5,8]


board = [[nums[pattern(r,c,offsets)] for c in cols] for r in rows]


for line in board: 
    print(line)