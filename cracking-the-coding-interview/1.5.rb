def compress(str)
  parts = []
  curr_char = nil

  str.chars.each do |char|
    if char != curr_char
      parts << [char, 0]
      curr_char = char
    end

    parts.last[1] += 1
  end

  compressed = parts.map { |char, count| char + count.to_s }.join

  (compressed.size > str.size) ? str : compressed
end

p compress('aabcccccaaa')
p compress('abc')
