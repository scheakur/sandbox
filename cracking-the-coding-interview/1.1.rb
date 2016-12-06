def is_unique_1(str)
  chars = {}

  str.each_char do |c|
    if chars[c]
      return false
    end

    chars[c] = true
  end

  true
end


def is_unique_2(str)
  !(/(.).*\1/ =~ str)
end


def is_unique_3(str)
  checker = 0

  str.each_char do |c|
    val = 1 << (c.ord - 'a'.ord)

    if (checker & val) > 0
      return false
    end

    checker |= val
  end

  true
end


p is_unique_1('abc')
p is_unique_1('abcdbe')
p is_unique_1('aa')
p is_unique_1('a')
p is_unique_1('')

p is_unique_2('abc')
p is_unique_2('abcdbe')
p is_unique_2('aa')
p is_unique_2('a')
p is_unique_2('')

p is_unique_3('abc')
p is_unique_3('abcdbe')
p is_unique_3('aa')
p is_unique_3('a')
p is_unique_3('')
