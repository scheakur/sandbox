module LinkedList

  class List
    attr_reader :head

    def initialize(array)
      if (!array)
        return
      end

      arr = array.dup
      @head = Node.new(arr.shift)
      prev = @head

      arr.each do |elem|
        node = Node.new(elem)
        prev.next = node
        prev = node
      end
    end

    def inspect
      arr = []
      node = @head

      while (node)
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
      @value
    end
  end
end


def is_palidrome1(list)
  fast = list.head
  slow = list.head

  stack = []

  while (fast && fast.next)
    stack << slow.value
    slow = slow.next
    fast = fast.next.next
  end

  # list size is odd
  if (fast)
    slow = slow.next
  end

  while (slow)
    value = stack.pop

    if (value != slow.value)
      return false
    end

    slow = slow.next
  end

  return true
end


Result = Struct.new(:node, :result)

def is_palidrome2(list, size)
  is_palidrome2_recurse(list.head, size).result
end

def is_palidrome2_recurse(head, size)
  if (!head || size == 0)
    return Result.new(nil, true)
  end

  if (size == 1)
    return Result.new(head.next, true)
  end

  if (size == 2)
    return Result.new(head.next.next, head.value == head.next.value)
  end

  res = is_palidrome2_recurse(head.next, size - 2)

  if (!res.result || !res.node)
    return res
  end

  res.result = head.value == res.node.value
  res.node = res.node.next
  res
end


array1 = %w(a b c d e f g h i)
list1 = LinkedList::List.new(array1)
p list1
p is_palidrome1(list1)
p is_palidrome2(list1, array1.size)

array2 = %w(a b c d d c b a)
list2 = LinkedList::List.new(array2)
p list2
p is_palidrome1(list2)
p is_palidrome2(list2, array2.size)

array3 = %w(a b c d e d c b a)
list3 = LinkedList::List.new(array3)
p list3
p is_palidrome1(list3)
p is_palidrome2(list3, array3.size)
