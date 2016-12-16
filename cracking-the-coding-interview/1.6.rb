def rotate(matrix)
  n = matrix.size
  m = n - 1

  (n / 2.0).ceil.times do |i|
    (n / 2).times do |j|
      temp = matrix[i][j]
      matrix[i][j] = matrix[j][m - i]
      matrix[j][m - i] = matrix[m - i][m - j]
      matrix[m - i][m - j] = matrix[m - j][i]
      matrix[m - j][i] = temp
    end
  end

  matrix
end

p rotate([
  [ 1,  2,  3,  4,  5],
  [ 6,  7,  8,  9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
])
