import remark from 'remark';
import html from 'remark-html';
import visit from 'unist-util-visit';

console.log(remark().use(html).process('Some _emphasis_, **strongness**, and `code`. https://google.com'));

console.log(remark().use((remark, options) => {
  console.log(remark);
  console.log(options);
  return (ast) => {
    console.log(ast);
    visit(ast, 'link', (node, index, parent) => {
      console.log(node, index, parent);
      parent.children.splice(index, 1, {
        type: 'text',
        value: 'foo',
        children: node.children,
      });
    });
  };
}).process('Some _emphasis_, **strongness**, and `code`. https://google.com'));
