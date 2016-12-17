def is_rotation?(s1, s2)
  if s1.size != s2.size
    return false
  end

  if s1.size == 0
    return false
  end

  isSubstring(s1 + s1, s2)
end

