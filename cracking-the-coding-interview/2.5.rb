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

    def size
      n = 0

      node = @head

      while node do
        n += 1
        node = node.next
      end

      n
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


def add1(list1, list2)
  node1 = list1.head
  node2 = list2.head

  head = nil
  result = nil
  carry = 0

  while (node1 || node2 || carry > 0) do
    if !node1
      node1 = LinkedList::Node.new(0)
    end

    if !node2
      node2 = LinkedList::Node.new(0)
    end

    sum = node1.value + node2.value + carry
    value = sum % 10
    carry = sum / 10

    new_node = LinkedList::Node.new(value)

    if result
      result.next = new_node
    elsif
      head = new_node
    end

    result = new_node
    node1 = node1.next
    node2 = node2.next
  end

  head
end


def add2(list1, list2)
  node1 = list1.head
  node2 = list2.head
  diff = list1.size - list2.size

  if diff > 0
    node2 = pad_left(node2, diff)
  elsif diff < 0
    node1 = pad_left(node1, -diff)
  end

  add = ->(n1, n2) {
    if !n1 && !n2
      return { node: nil, carry: 0 }
    end

    tmp = add.call(n1.next, n2.next)

    sum = n1.value + n2.value + tmp[:carry]
    value = sum % 10
    carry = sum / 10

    {
      node: LinkedList::Node.new(value, tmp[:node]),
      carry: carry,
    }
  }

  tmp = add.call(node1, node2)

  if tmp[:carry] > 0
    LinkedList::Node.new(tmp[:carry], tmp[:node])
  else
    tmp[:node]
  end
end


def pad_left(node, num)
  while num > 0 do
    node = LinkedList::Node.new(0, node)
    num -= 1
  end

  node
end


list1 = LinkedList::List.new([8, 7, 9])
list2 = LinkedList::List.new([4, 5, 1, 9])
p list1, list2, add1(list1, list2)

list3 = LinkedList::List.new([9, 7, 8])
list4 = LinkedList::List.new([9, 1, 5, 4])
p list1, list2, add2(list3, list4)
