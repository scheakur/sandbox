module LinkedList

  class List
    attr_reader :head

    def initialize(array)
      if (!array)
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


def find_loop_start(list)
  slow = list.head
  fast = list.head

  while (fast && fast.next)
    slow = slow.next
    fast = fast.next.next

    if (slow == fast)
      break
    end
  end

  if (!fast || !fast.next)
    return nil
  end

  slow = list.head

  while (slow != fast)
    slow = slow.next
    fast = fast.next
  end

  fast
end


def make_loop(list, start_index)
  node = list.head

  i = 0

  while (node && i < start_index)
    node = node.next
    i += 1
  end

  start = node

  while (node && node.next)
    node = node.next
  end

  node.next = start
end


list = LinkedList::List.new(%w(a b c d e f g h i))
p find_loop_start(list)
make_loop(list, 3)
p find_loop_start(list)
