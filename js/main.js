var letters = [
  { input: '\\', output: '\\', name: 'backslash' },
  { input: 'a', output: 'ɑ', name: 'open back unrounded vowel' },
  { input: 'ae', output: 'æ', name: 'near-open front unrounded vowel' },
  { input: 'aa', output: 'ɐ', name: 'near-open central unrounded vowel' },
  { input: 'ao', output: 'ɒ', name: 'open back rounded vowel' },
  { input: 'b', output: 'ɓ', name: 'voiced bilabial implosive' },
  { input: 'bv', output: 'β', name: 'voiced bilabial fricative' },
  { input: 'B', output: 'ʙ', name: 'voiced bilabial trill' },
  { input: 'c', output: 'ç', name: 'voiceless palatal fricative' },
  { input: 'cs', output: 'ɕ', name: 'voiceless alveolo-palatal fricative' },
  { input: 'd', output: 'ɗ', name: 'voiced alveolar implosive' },
  { input: 'dh', output: 'ð', name: 'voiced dental fricative' },
  { input: 'dr', output: 'ɖ', name: 'voiced retroflex stop' },
  { input: 'e', output: 'ə', name: 'mid central vowel' },
  { input: 'er', output: 'ɚ', name: 'rhotacized mid central vowel' },
  { input: 'ee', output: 'ɘ', name: 'close-mid central unrounded vowel' },
  { input: 'e3', output: 'ɛ', name: 'open-mid front unrounded vowel' },
  { input: '3e', output: 'ɜ', name: 'open-mid central unrounded vowel' },
  { input: '3r', output: 'ɝ', name: 'rhotacized open-mid central unrounded vowel' },
  { input: '3o', output: 'ɞ', name: 'open-mid central rounded vowel' },
  { input: 'f', output: 'ɸ', name: 'voiceless bilabial fricative' },
  { input: 'g', output: 'ɠ', name: 'voiced velar implosive' },
  { input: 'G', output: 'ɢ', name: 'voiced uvular stop' },
  { input: 'Gg', output: 'ʛ', name: 'voiced uvular implosive' },
  { input: 'h', output: 'ɦ', name: 'breathy-voiced glottal transition' },
  { input: 'ha', output: 'ħ', name: 'voiceless pharyngeal fricative' },
  { input: 'hs', output: 'ɧ', name: 'voiceless palatal-velar fricative' },
  { input: 'H', output: 'ʜ', name: 'voiceless epiglottal fricative' },
];

var diacritics = [
  { input: '~', output: '\u0303', name: 'nasalized' }
];

var nonKeyPhones = {
  'a': 'open front unrounded vowel',
  'b': 'voiced bilabial stop',
  'c': 'voiceless palatal stop',
  'd': 'voiced alveolar stop',
  'e': 'close-mid front unrounded vowel',
  'f': 'voiceless labiodental fricative',
  'g': 'voiced velar stop',
  'h': 'voiceless glottal transition',
  'i': 'close front unrounded vowel',
  'j': 'palatal approximant',
  'k': 'voiceless velar stop',
  'l': 'alveolar lateral approximant',
  'm': 'bilabial nasal',
  'n': 'alveolar nasal',
  'o': 'close-mid back rounded vowel',
  'p': 'voiceless bilabial stop',
  'q': 'voiceless uvular stop',
  'r': 'alveolar trill',
  's': 'voiceless alveolar fricative',
  't': 'voiceless alveolar stop',
  'u': 'close back rounded vowel',
  'v': 'voiced labiodental fricative',
  'w': 'voiced labio-velar approximant',
  'x': 'voiceless velar fricative',
  'y': 'close front rounded vowel',
  'z': 'voiced alveolar fricative',
};

var keyBindings = {};
for (var i = 0; i < letters.length; i++) {
  keyBindings[letters[i].input] = letters[i];
}
for (var i = 0; i < diacritics.length; i++) {
  diacritics[letters[i].input] = diacritics[i];
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
  var current = document.getElementById('current-symbol-text');

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
            elem.value = prefix + keyBindings[buf].output + suffix;
            elem.selectionStart = specialPos + 1;
            elem.selectionEnd = specialPos + 1;
            current.textContent = keyBindings[buf].name;
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
        } else if (event.key in nonKeyPhones) {
          current.textContent = nonKeyPhones[event.key];
        }
        break;
    }
  };
}
