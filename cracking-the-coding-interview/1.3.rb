module Sorter
  refine String do
    def sort
      chars.sort.join
    end
  end
end

using Sorter

def permutation?(s1, s2)
  if s1.size != s2.size
    return false
  end

  s1.sort == s2.sort
end


p permutation?('abc', 'bca')
p permutation?('abc', 'bcc')
