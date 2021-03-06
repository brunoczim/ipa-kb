renderKeys();
listenKeys();

function renderKeys() {
  var elem = document.getElementById('keys-tbody');

  for (var i = 0; i < keys.length; i++) {
    var row = document.createElement('tr');
    var keysCol = document.createElement('td');
    var symbolCol = document.createElement('td');
    var nameCol = document.createElement('td');
    keysCol.textContent = keys[i].input;
    if (keys[i].output in phones && phones[keys[i].output].needsCircle) {
      symbolCol.textContent = '◌' + keys[i].output;
    } else {
      symbolCol.textContent = keys[i].output;
    }
    if (keys[i].output in phones) {
      nameCol.appendChild(makeLink(keys[i].output));
    }
    keysCol.className = 'keybinding';
    row.appendChild(keysCol);
    row.appendChild(symbolCol);
    row.appendChild(nameCol);
    elem.appendChild(row);
  }
}

function makeLink(key) {
  var link = document.createElement('a');
  link.href = phones[key].link;
  link.textContent = phones[key].name;
  link.target = '_blank';
  return link;
}

function listenKeys() {
  var elem = document.getElementById('typing-area');
  var current = document.getElementById('last-phone-text');

  var mode = 'normal';
  var specialPos = 0;

  function setMode(value) {
    document.getElementById('mode-text').textContent = value;
    mode = value;
  }

  function setCurrent(key) {
    if (key in phones) {
      current.innerHTML = '';
      current.appendChild(makeLink(key));
    }
  }

  elem.oninput = function(event) {
    if (event.inputType == 'insertText' && mode == 'normal') {
      setCurrent(event.data);
    }
  };
  
  elem.onkeyup = function(event) {
    switch (mode) {
      case 'special':
        if (event.key == backspace) {
          if (elem.value[specialPos] != delStart) {
            setMode('normal');
          }
        } else if (event.key == delEnd) {
          var end = elem.selectionStart;
          var buf = elem.value.substring(specialPos + 1, end - 1);
          if (buf in keyMap) {
            var prefix = elem.value.substring(0, specialPos);
            var suffix = elem.value.substring(end);
            elem.value = prefix + keyMap[buf] + suffix;
            elem.selectionStart = specialPos + 1;
            elem.selectionEnd = specialPos + 1;
            setCurrent(keyMap[buf]);
          } else {
            current.textContent = 'unknown';
          }
          setMode('normal');
        }  else if (event.key == 'Escape') {
          setMode('normal');
        }
        break;
      case 'normal':
        if (event.key == delStart) {
          setMode('special');
          tempBuf = '';
          specialPos = elem.selectionStart - 1;
        }
        break;
    }
  };
}
