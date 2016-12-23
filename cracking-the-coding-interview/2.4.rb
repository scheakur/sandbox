module LinkedList

  class List
    attr_reader :head

    def initialize(array)
      if !array
        return
      end

      @head = Node.new(array.shift)
      prev = @head

      array.each do |elem|
        node = Node.new(elem)
        prev.next = node
        prev = node
      end
    end

    def inspect
      arr = []

      node = @head

      while node
        arr << node.value
        node = node.next
      end

      arr
    end
  end

  class Node
    attr_accessor :next, :value

    def initialize(value, next_node=nil)
      @value = value
      @next = next_node
    end

    def inspect
      arr = []

      node = self

      while node
        arr << node.value
        node = node.next
      end

      arr
    end
  end
end


def partition(list, x)
  lower = nil
  higher = nil

  node = list.head

  while node do
    next_node = node.next

    if node.value < x
      node.next = lower
      lower = node
    else
      node.next = higher
      higher = node
    end

    node = next_node
  end

  head = lower

  while lower.next do
    lower = lower.next
  end

  lower.next = higher

  head
end


list = LinkedList::List.new([6, 1, 2, 9, 7, 8, 1, 5, 4, 7, 2, 8, 3])
p list
p partition(list, 5)
