var letters = [
  { input: '\\', output: '\\' },
  { input: 'a', output: 'ɑ' },
  { input: 'ae', output: 'æ' },
  { input: 'aa', output: 'ɐ' },
  { input: 'ao', output: 'ɒ' },
  { input: 'b', output: 'ɓ' },
  { input: 'bv', output: 'β' },
  { input: 'B', output: 'ʙ' },
  { input: 'c', output: 'ç' },
  { input: 'cs', output: 'ɕ' },
  { input: 'd', output: 'ɗ' },
  { input: 'dh', output: 'ð' },
  { input: 'dr', output: 'ɖ' },
  { input: 'e', output: 'ə' },
  { input: 'er', output: 'ɚ' },
  { input: 'ee', output: 'ɘ' },
  { input: 'e3', output: 'ɛ' },
  { input: '3e', output: 'ɜ' },
  { input: '3r', output: 'ɝ' },
  { input: '3o', output: 'ɞ' },
  { input: 'f', output: 'ɸ' },
  { input: 'g', output: 'ɠ' },
  { input: 'G', output: 'ɢ' },
  { input: 'Gg', output: 'ʛ' },
  { input: 'h', output: 'ɦ' },
  { input: 'ha', output: 'ħ' },
  { input: 'hs', output: 'ɧ' },
  { input: 'H', output: 'ʜ' },
];

var diacritics = [
  { input: '~', output: '\u0303'}
];

var keyBindings = {};
for (var i = 0; i < letters.length; i++) {
  keyBindings[letters[i].input] = letters[i].output;
}
for (var i = 0; i < diacritics.length; i++) {
  diacritics[letters[i].input] = diacritics[i].output;
}


renderKeyBindings();
listenKeys();

function renderKeyBindings() {
  var elem = document.getElementById('keys-list');

  for (var i = 0; i < letters.length; i++) {
    var item = document.createElement('li');
    item.textContent = letters[i].input;
    item.textContent += ' → ';
    item.textContent += letters[i].output;
    elem.appendChild(item);
  }

  for (var i = 0; i < diacritics.length; i++) {
    var item = document.createElement('li');
    item.textContent = diacritics[i].input;
    item.textContent += ' → ◌';
    item.textContent += diacritics[i].output;
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
          var end = elem.selectionStart;
          var buf = elem.value.substring(specialPos + 1, end - 1);
          if (buf in keyBindings) {
            var prefix = elem.value.substring(0, specialPos);
            var suffix = elem.value.substring(end);
            elem.value = prefix + keyBindings[buf] + suffix;
            elem.selectionStart = specialPos + 1;
            elem.selectionEnd = specialPos + 1;
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
          specialPos = elem.selectionStart - 1;
        }
        break;
    }
  };
}
