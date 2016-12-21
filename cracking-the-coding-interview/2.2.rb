module LinkedList

  class List
    attr_reader :head

    def initialize(array)
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
    attr_accessor :next
    attr_reader :value

    def initialize(value, next_node=nil)
      @value = value
      @next = next_node
    end

    def inspect
      @value
    end
  end
end



def nth_to_last(list, k)
  node1 = list.head
  node2 = list.head

  k.times do
    node1 = node1.next
  end

  while node1 do
    node1 = node1.next
    node2 = node2.next
  end

  node2
end

list = LinkedList::List.new(["a", "b", "c", "b", "b", "c", "d", "a"])
p list
p nth_to_last(list, 3)

