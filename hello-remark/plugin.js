import compilers from './lib/compilers';

const plugin = (remark, options) => {
  const MarkdownCompiler = remark.Compiler;

  class MyCompiler extends MarkdownCompiler {
    constructor(file) {
      super(file, options);
      for (let key in compilers) {
        this[key] = compilers[key];
      }
    }
  }

  remark.Compiler = MyCompiler;


  const MarkdownParser = remark.Parser;

  class MyParser extends MarkdownParser {
    constructor(...args) {
      super(...args);
      this.blockMethods = [
        'newline',
        'paragraph',
      ];
      this.inlineMethods = [
        'url',
        'inlineText',
      ];
    }
  }

  remark.Parser = MyParser;
}

export default plugin;
