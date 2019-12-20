var keybindings = {
  '\\': '\\',
  'a': 'ɑ',
  'ae': 'æ',
  'aa': 'ɐ',
  'ao': 'ɒ',
  'b': 'ɓ',
  'bv': 'β',
  'br': 'ʙ',
  'c': 'ç',
  'cs': 'ɕ',
  'd': 'ɗ',
  'dh': 'ð',
  'dr': 'ɖ',
  '~': '\u0303'
};

var diacritics = { '~': '' };

renderKeyBindings();
listenKeys();

function renderKeyBindings() {
  var elem = document.getElementById('keys-list');

  for (keybinding in keybindings) {
    var item = document.createElement('li');
    item.textContent = keybinding;
    item.textContent += ' → ';
    if (keybinding in diacritics) {
      item.textContent += '◌';
    }
    item.textContent += keybindings[keybinding];
    elem.appendChild(item);
  }
}

function listenKeys() {
  var elem = document.getElementById('typing-area');

  var mode = 'normal';
  var specialPos = 0;

  function setMode(value) {
    document.getElementById('mode-text').textContent = value;
    mode = value;
  }

  elem.onkeyup = function(event) {
    switch (mode) {
      case 'special':
        if (event.key == 'Enter') {
          var buf = elem.value.substring(specialPos + 1, elem.value.length - 1);
          if (buf in keybindings) {
            elem.value = elem.value.substring(0, specialPos) + keybindings[buf];
          }
          setMode('normal');
        }  else if (event.key == 'Escape') {
          setMode('normal');
        }
        break;
      case 'normal':
        if (event.key == '\\') {
          setMode('special');
          tempBuf = '';
          specialPos = elem.value.length - 1;
        }
        break;
    }
  };
}
