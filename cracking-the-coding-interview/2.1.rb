module LinkedList

  class List
    attr_reader :head

    def initialize(array)
      @head = Node.new(nil, array.shift)
      prev = @head

      array.each do |elem|
        node = Node.new(prev, elem)
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
    attr_accessor :prev
    attr_reader :value, :next

    def initialize(prev_node, value, next_node=nil)
      @value = value
      @prev = prev_node
      @next = next_node
    end

    def next=(node)
      @next = node

      if node
        node.prev = self
      end
    end
  end
end



def delete_dups(list)
  node = list.head

  while node do
    tmp = node.next

    while tmp do
      if tmp.value == node.value
        tmp.prev.next = tmp.next
      end

      tmp = tmp.next
    end

    node = node.next
  end

  list
end

list = LinkedList::List.new(["a", "b", "c", "b", "b", "c", "d", "a"])
p list
p delete_dups(list)
