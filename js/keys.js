var keys = [
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
  { input: '~', output: '\u0303' }
];

var keyMap = {};

for (var i = 0; i < keys.length; i++) {
  keyMap[keys[i].input] = keys[i].output;
}
