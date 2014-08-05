function HashMap() {
  this.hashTable = new Array(1009);
  this.size = 1009;
}

function Entry(key, value) {
  this.key = key;
  this.value = value;
}

HashMap.prototype.set = function (key, value) {
  var hash = makeHash(key, this.size);
  if (this.hashTable[hash] !== undefined) {
    hash = reHash(this.hashTable, hash);
    if (hash < 0) {
      console.log('There is no space to set the key & value (%s, %s)', key, value);
      return;
    }
  }
  this.hashTable[hash] = new Entry(key, value);
};

HashMap.prototype.get = function (key) {
  var hash = makeHash(key, this.size);
  for (var i = 0, max = this.size / 2; i < max; i++) {
    var index = (hash + i * i) % this.size;
    var entry = this.hashTable[index];
    if (entry && entry.key === key) {
      return entry.value;
    }
  }
  return null;
};

HashMap.prototype.delete = function (key) {
  var hash = makeHash(key, this.size);
  for (var i = 0, max = this.size / 2; i < max; i++) {
    var index = (hash + i * i) % this.size;
    var entry = this.hashTable[index];
    if (entry && entry.key === key) {
      delete this.hashTable[index];
      return entry.value;
    }
  }
  return null;
};

function makeHash(key, max) {
  var hash = 0;
  var weight = 0;

  for (var n = 0, len = key.length; n < len; n++, weight++) {
    if (weight > 7) {
      wieght = 0;
    }
    hash += key.charCodeAt(n) * Math.pow(16, weight);
  }

  return hash % max;
}

function reHash(hashTable, firstHash) {
  var hash = firstHash;
  var len = hashTable.length;
  for (var i = 1, max = len / 2; i < max; i++) {
    hash = (firstHash + i * i) % len;
    if (hashTable[hash] === undefined) {
      return hash;
    }
  }
  return -1;
}

function main() {
  var hm = new HashMap();
  hm.set('foo', 'hoge');
  hm.set('bar', 'fuga');
  hm.set('baz', 'piyo');
  console.log(hm.get('foo'), 'hoge');
  console.log(hm.get('bar'), 'fuga');
  console.log(hm.get('baz'), 'piyo');
  console.log(hm.get('qux'), null);
  console.log(hm.delete('baz'), 'piyo');
  console.log(hm.get('baz'), null);
}

main();
