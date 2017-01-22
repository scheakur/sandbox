module BinaryTree
  class Node
    attr_reader :data
    attr_accessor :right, :left

    def initialize(data)
      @data = data
    end
  end
end


def check_height(node)
  if !node
    return 0
  end

  left_height = check_height(node.left)

  if left_height == -1
    return -1
  end

  right_height = check_height(node.right)

  if right_height == -1
    return -1
  end

  diff = (left_height - right_height).abs

  if diff > 1
    return -1
  end

  return [left_height, right_height].max + 1
end


def is_ballanced(node)
  check_height(node) != -1
end


root = BinaryTree::Node.new(1)
root.left = BinaryTree::Node.new(2)
root.right = BinaryTree::Node.new(3)
root.left.left = BinaryTree::Node.new(4)
root.left.right = BinaryTree::Node.new(5)
root.left.left.left = BinaryTree::Node.new(6)

p is_ballanced(root)

root.right.left = BinaryTree::Node.new(7)

p is_ballanced(root)

root.right.left.left = BinaryTree::Node.new(8)

p is_ballanced(root)

root.right.right = BinaryTree::Node.new(9)

p is_ballanced(root)
