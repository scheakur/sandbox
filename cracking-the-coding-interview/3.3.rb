class Node
  attr_accessor :above, :below
  attr_reader :value

  def initialize(value)
    @value = value
  end
end


class Stack
  def initialize(capacity)
    @capacity = capacity
    @size = 0
    @top = nil
    @bottom = nil
  end

  def join(above, below)
    if (below)
      below.above = above
    end

    if (above)
      above.below = below
    end
  end

  def push(value)
    if (@size >= @capacity)
      return false
    end

    @size += 1
    node = Node.new(value)

    if (@size == 1)
      @bottom = node
    end

    join(node, @top)
    @top = node
    true
  end

  def pop
    top = @top
    @top = @top.below
    @size -= 1
    top.value
  end

  def empty?
    @size == 0
  end

  def full?
    @size == @capacity
  end

  def remove_bottom
    bottom = @bottom
    @bottom = @bottom.above

    if (@bottom)
      bottom.below = nil
    end

    @size -= 1
    bottom.value
  end
end


class SetOfStacks
  def initialize(capacity)
    @stacks = []
    @capacity = capacity
  end

  def push(value)
    if (last_stack && !last_stack.full?)
      last_stack.push(value)
      return
    end

    new_stack = Stack.new(@capacity)
    new_stack.push(value)
    @stacks.push(new_stack)
  end

  def pop
    if (empty?)
      raise 'empty stack'
    end

    value = last_stack.pop

    if (last_stack.empty?)
      @stacks.pop
    end

    value
  end

  def pop_at(index)
    left_shift(index, true)
  end

  def left_shift(index, remove_top)
    stack = @stacks[index]
    removed_item = nil

    if (remove_top)
      removed_item = stack.pop
    else
      removed_item = stack.remove_bottom
    end

    if (stack.empty?)
      @stacks.delete_at(index)
    elsif (@stacks.size > index + 1)
      value = left_shift(index + 1, false)
      stack.push(value)
    end

    removed_item
  end

  def last_stack
    @stacks.last
  end

  def empty?
    !last_stack || last_stack.empty?
  end
end

set_of_stacks = SetOfStacks.new(3)
set_of_stacks.push(1)
set_of_stacks.push(2)
set_of_stacks.push(3)
set_of_stacks.push(4)
set_of_stacks.push(5)
set_of_stacks.push(6)
set_of_stacks.push(7)

p set_of_stacks.pop
p set_of_stacks.pop
p set_of_stacks.pop
p set_of_stacks.pop

set_of_stacks.push(4)
set_of_stacks.push(5)
set_of_stacks.push(6)
set_of_stacks.push(7)

p set_of_stacks.pop_at(1)
p set_of_stacks.pop_at(1)
p set_of_stacks.pop_at(1)
p set_of_stacks.pop_at(1)
