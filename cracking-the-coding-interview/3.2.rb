Value = Struct.new(:value, :min)

class Stack1
  N_BYTES = [0].pack('i').size
  N_BITS = N_BYTES * 16
  MAX = 2 ** (N_BITS - 2) - 1

  def initialize
    @stack = []
  end

  def push(value)
    min_value = [value, min].min
    @stack.push(Value.new(value, min_value))
  end

  def peek
    @stack.last
  end

  def pop
    @stack.pop.value
  end

  def min
    if (empty?)
      return MAX
    end

    peek.min
  end

  def empty?
    @stack.empty?
  end
end

class Stack2
  N_BYTES = [0].pack('i').size
  N_BITS = N_BYTES * 16
  MAX = 2 ** (N_BITS - 2) - 1

  def initialize
    @stack = []
    @min_stack = []
  end

  def push(value)
    if (value <= min)
      @min_stack.push(value)
    end

    @stack.push(value)
  end

  def pop
    value = @stack.pop

    if (value == min)
      @min_stack.pop
    end

    value
  end

  def min
    if (empty?)
      return MAX
    end

    @min_stack.last
  end

  def empty?
    @stack.empty?
  end
end


stack1 = Stack1.new
p stack1.min
stack1.push(10)
p stack1.min
stack1.push(11)
p stack1.min
stack1.push(5)
p stack1.min
stack1.push(5)
p stack1.min
stack1.pop
p stack1.min
stack1.pop
p stack1.min


stack2 = Stack2.new
p stack2.min
stack2.push(10)
p stack2.min
stack2.push(11)
p stack2.min
stack2.push(5)
p stack2.min
stack2.push(5)
p stack2.min
stack2.pop
p stack2.min
stack2.pop
p stack2.min






