from spleeter.separator import Separator
import sys
import os

def split_audio(file_path, output_path):
    # Initialize the Spleeter separator
    separator = Separator('spleeter:4stems')
    
    # Perform the separation
    separator.separate_to_file(file_path, output_path)

if __name__ == '__main__':
    file_path = sys.argv[1]
    output_path = sys.argv[2]
    split_audio(file_path, output_path)
