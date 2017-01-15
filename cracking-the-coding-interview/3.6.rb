def sort(stack)
  sorted = []

  while (!stack.empty?)
    p sorted
    value = stack.pop

    while (!sorted.empty? && sorted.last < value)
      stack.push(sorted.pop)
    end

    sorted.push(value)
  end

  sorted
end

p sort([1, 3, 5, 2, 1])
