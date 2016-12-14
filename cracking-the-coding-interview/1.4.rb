def replace_spaces(char_array, length)
  num_spaces = count_spaces(char_array, length)
  new_length = length + num_spaces * 2
  i = length - 1

  while new_length > 0
    if char_array[i] == ' '
      char_array[new_length - 3] = '%'
      char_array[new_length - 2] = '2'
      char_array[new_length - 1] = '0'
      new_length -= 3
    else
      char_array[new_length - 1] = char_array[i]
      new_length -= 1
    end

    i -= 1
  end

  char_array
end


def count_spaces(char_array, length)
  num = 0

  length.times do |i|
    if char_array[i] == ' '
      num += 1
    end
  end

  num
end


p replace_spaces([' ', 'a', 'b', 'c', ' ', 'd', ' ', ' ', 'e', ' '], 10)
