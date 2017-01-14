class MyQueue
  def initialize
    @newest = []
    @oldest = []
  end

  def size
    @newest.size + @oldest.size
  end

  def add(value)
    @newest.push(value)
  end

  def peek
    shift_stacks
    @oldest.last
  end

  def remove
    shift_stacks
    @oldest.pop
  end

  def shift_stacks
    if (@oldest.empty?)
      while (!@newest.empty?)
        @oldest.push(@newest.pop)
      end
    end
  end
end

queue = MyQueue.new

queue.add(1)
queue.add(2)
queue.add(3)

p queue.peek
p queue.remove
p queue.peek
p queue.remove
