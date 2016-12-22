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

    def nth(n)
      node = @head

      n.times do
        node = node.next
      end

      node
    end

    def inspect
      arr = []

      node = @head

      while node
        arr << node
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
      @value
    end
  end
end



def remove_node(node)
  node.value = node.next.value
  node.next = node.next.next
end

list = LinkedList::List.new(["a", "b", "c", "b", "b", "c", "d", "a"])
p list
remove_node(list.nth(2))
p list


