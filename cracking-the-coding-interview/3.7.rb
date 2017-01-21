class Animal
  attr_accessor :order
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

class Dog < Animal
end

class Cat < Animal
end

class AnimalQueue

  def initialize
    @dogs = []
    @cats = []
    @order = 0
  end

  def enqueue(animal)
    animal.order = @order
    @order += 1

    if animal.is_a?(Dog)
      @dogs.push(animal)
    end

    if animal.is_a?(Cat)
      @cats.push(animal)
    end
  end

  def dequeueAny
    if @dogs.empty?
      return dequeueCat
    end

    if @cats.empty?
      return dequeueDog
    end

    if @dogs.first.order > @cats.first.order
      return dequeueCat
    end

    return dequeueDog
  end

  def dequeueDog
    @dogs.shift
  end

  def dequeueCat
    @cats.shift
  end

end

queue = AnimalQueue.new

p queue.dequeueAny
p queue.dequeueCat
p queue.dequeueDog

queue.enqueue(Dog.new('a'))
queue.enqueue(Dog.new('b'))
queue.enqueue(Dog.new('c'))
queue.enqueue(Cat.new('1'))
queue.enqueue(Cat.new('2'))
queue.enqueue(Dog.new('d'))
queue.enqueue(Cat.new('3'))

p queue.dequeueAny
p queue.dequeueCat
p queue.dequeueDog
p queue.dequeueAny
p queue.dequeueAny
