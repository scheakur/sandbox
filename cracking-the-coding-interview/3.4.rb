class Tower
  attr_reader :name

  def initialize(name)
    @disks = []
    @name = name
  end

  def add(disk)
    if (!@disks.empty? && @disks.last <= disk)
      raise "Erra placing disk #{disk}"
    end

    @disks.push(disk)
  end

  def move_top(tower)
    top = @disks.pop
    tower.add(top)
    puts("Move disk #{top} from #{name} to #{tower.name}")
  end

  def move_disks(n, to, via)
    if (n <= 0)
      return
    end

    move_disks(n - 1, via, to)
    move_top(to)
    via.move_disks(n - 1, to, self)
  end
end


from = Tower.new('A')
via = Tower.new('B')
to = Tower.new('C')

n = 3

n.times.reverse_each do |i|
  from.add(i)
end

from.move_disks(n, to, via)
