class Visitors {

  constructor(compilers) {
    this.all = compilers.all.bind(compilers);
  }

  root(node) {
    return this.all(node).join('\n');
  }

  paragraph(node) {
    return this.all(node).join('');
  }


  link(node) {
    return '<' + this.all(node).join('') + '>';
  }


  text(node) {
    return String(node.value);
  }

}


class Compilers {

  constructor() {
    this.visitors = new Visitors(this);
    this.visit = this.visit.bind(this);
  }


  visit(node, parent) {
    const type = node && node.type;
    let fn = this.visitors[type];

    if (typeof fn !== 'function') {
      fn = this.visitors.text;
    }

    return fn.call(this.visitors, node, parent);
  }


  all(parent) {
    const nodes = parent.children;
    const values = [];
    const length = nodes.length;
    let index = -1;
    let prev;

    while (++index < length) {
      let value = this.visit(nodes[index], parent);

      if (value) {
        values.push(value);
      }

      prev = nodes[index];
    }

    return values;
  }

}


export default new Compilers();
