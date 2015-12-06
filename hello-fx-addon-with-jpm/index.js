let buttons = require('sdk/ui/button/action');
let tabs = require('sdk/tabs');

let button = buttons.ActionButton({
  id: 'mozilla-link',
  label: 'Visit Mozilla',
  icon: {
    '16': './icon-16.png',
    '32': './icon-32.png',
    '64': './icon-64.png'
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open('http://www.mozilla.org/');
}
