renderKeyBindings();
listenKeys();

function renderKeyBindings() {
  var elem = document.getElementById('keys-list');

  for (var i = 0; i < keys.length; i++) {
    var item = document.createElement('li');
    item.textContent = keys[i].input;
    item.textContent += ' → ';
    if (keys[i].output in phones && phones[keys[i].output].diacritic) {
      item.textContent += '◌';
    }
    item.textContent += keys[i].output;
    elem.appendChild(item);
  }
}

function listenKeys() {
  var elem = document.getElementById('typing-area');
  var current = document.getElementById('current-phone-text');

  var mode = 'normal';
  var specialPos = 0;

  function setMode(value) {
    document.getElementById('mode-text').textContent = value;
    mode = value;
  }

  function setCurrent(key) {
    if (key in phones) {
      current.textContent = phones[key].name;
    }
  }

  elem.onkeyup = function(event) {
    switch (mode) {
      case 'special':
        if (event.key == 'Enter') {
          var end = elem.selectionStart;
          var buf = elem.value.substring(specialPos + 1, end - 1);
          if (buf in keyMap) {
            var prefix = elem.value.substring(0, specialPos);
            var suffix = elem.value.substring(end);
            elem.value = prefix + keyMap[buf] + suffix;
            elem.selectionStart = specialPos + 1;
            elem.selectionEnd = specialPos + 1;
            setCurrent(keyMap[buf]);
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
        } else {
          setCurrent(event.key);
        }
        break;
    }
  };
}
