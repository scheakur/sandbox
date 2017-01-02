class Stack
  def initialize(size)
    @size = size
    @buffer = Array.new(size * 3)
    @pointer = [-1, -1, -1]
  end

  def push(stack_num, value)
    if (@pointer[stack_num] + 1 >= @size)
      raise "out of space"
    end

    @pointer[stack_num] += 1
    @buffer[top_of_stack(stack_num)] = value
  end

  def pop(stack_num)
    if (empty?(stack_num))
      raise "empty stack"
    end

    value = @buffer[top_of_stack(stack_num)]
    @buffer[top_of_stack(stack_num)] = 0
    @pointer[stack_num] -= 1
    value
  end

  def peek(stack_num)
    buffer[top_of_stack(stack_num)]
  end

  def empty?(stack_num)
    @pointer[stack_num] == -1
  end

  def top_of_stack(stack_num)
    stack_num * @size + @pointer[stack_num]
  end
end

stack = Stack.new(10)
stack.push(0, 'hoge')
stack.push(0, 'fuga')
stack.push(0, 'piyo')
stack.push(1, 'foo')
stack.push(1, 'bar')
stack.push(1, 'baz')

p stack.pop(0)
p stack.pop(0)
p stack.pop(1)
p stack.pop(1)



