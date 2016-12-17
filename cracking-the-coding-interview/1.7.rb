def set_zero(matrix)
  rows = []
  cols = []

  matrix.each_with_index do |row, i|
    row.each_with_index do |cell, j|
      if cell == 0
        rows << i
        cols << j
      end
    end
  end

  matrix.each_with_index do |row, i|
    row.each_with_index do |cell, j|
      if rows.include?(i) || cols.include?(j)
        matrix[i][j] = 0
      end
    end
  end

  matrix
end

p set_zero([
  [1, 1, 1, 1, 1],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0],
])
