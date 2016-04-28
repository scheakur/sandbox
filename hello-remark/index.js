import remark from 'remark';
import html from 'remark-html';
import visit from 'unist-util-visit';
import plugin from './plugin';

console.log('hoge');

const text = `
# Hi
Some _emphasis_, **strongness**, and \`code\`.
https://google.com
* hoge
  - foo
  - bar
  - baz
* fuga
  - 1
  - 2
  - 3
* piyo
`;


console.log(remark().use(html).process(text));

console.log(remark().use((remark, options) => {
  return (ast) => {
    visit(ast, 'link', (node, index, parent) => {
      parent.children.splice(index, 1, {
        type: 'text',
        value: 'foo',
        children: node.children,
      });
    });
  };
}).process(text));


console.log(remark().use(plugin).process(text));
