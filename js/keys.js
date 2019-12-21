var delStart = '\\';
var delEnd = 'Enter';

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
  { input: '3', output: 'ɜ' },
  { input: '3r', output: 'ɝ' },
  { input: '3o', output: 'ɞ' },
  { input: 'f', output: 'ɸ' },
  { input: 'g', output: 'ɠ' },
  { input: 'gh', output: 'ɣ' },
  { input: 'G', output: 'ɢ' },
  { input: 'Gg', output: 'ʛ' },
  { input: 'go', output: 'ɤ' },
  { input: 'h', output: 'ɦ' },
  { input: 'ha', output: 'ħ' },
  { input: 'hs', output: 'ɧ' },
  { input: 'H', output: 'ʜ' },
  { input: 'i', output: 'ɨ' },
  { input: 'I', output: 'ɪ' },
  { input: 'j', output: 'ʄ' },
  { input: 'js', output: 'ʝ' },
  { input: 'J', output: 'ɟ' },
  { input: 'l', output: 'ɫ' },
  { input: 'lr', output: 'ɭ' },
  { input: 'ls', output: 'ɬ' },
  { input: 'lz', output: 'ɮ' },
  { input: 'L', output: 'ʟ' },
  { input: 'm', output: 'ɱ' },
  { input: 'n', output: 'ɲ' },
  { input: 'ng', output: 'ŋ' },
  { input: 'nr', output: 'ɳ' },
  { input: 'N', output: 'ɴ' },
  { input: 'o', output: 'ɔ' },
  { input: 'oe', output: 'œ' },
  { input: 'o/', output: 'ø' },
  { input: 'OE', output: 'ɶ' },
  { input: 'o-', output: 'ɵ' },
  { input: 'r', output: 'ɹ' },
  { input: 'rd', output: 'ɾ' },
  { input: 'R', output: 'ʀ' },
  { input: 'Rh', output: 'ʁ' },
  { input: 'rr', output: 'ɻ' },
  { input: 'rdr', output: 'ɽ' },
  { input: 'rl', output: 'ɺ' },
  { input: 's', output: 'ʃ' },
  { input: 'sr', output: 'ʂ' },
  { input: 't', output: 'θ' },
  { input: 'tr', output: 'ʈ' },
  { input: 'u', output: 'ʊ' },
  { input: 'u-', output: 'ʉ' },
  { input: 'v', output: 'ⱱ' },
  { input: 'vu', output: 'ʋ' },
  { input: 'va', output: 'ʌ' },
  { input: 'w', output: 'ɰ' },
  { input: 'wu', output: 'ɯ' },
  { input: 'wm', output: 'ʍ' },
  { input: 'x', output: 'χ' },
  { input: 'y', output: 'ʎ' },
  { input: 'Y', output: 'ʏ' },
  { input: 'z', output: 'ʒ' },
  { input: 'zr', output: 'ʐ' },
  { input: 'zs', output: 'ʑ' },
  { input: '?', output: 'ʔ' },
  { input: '??', output: 'ʕ' },
  { input: '?-', output: 'ʡ' },
  { input: '??-', output: 'ʢ' },
  { input: '\'', output: 'ˈ' },
  { input: '\'\'', output: 'ˌ' },
  { input: ':', output: 'ː' },
  { input: '.', output: 'ˑ' },
  { input: 'xshort', output: '\u0306' },
  { input: 'syl', output: '\u0329' },
  { input: 'syllow', output: '\u0329' },
  { input: 'sylup', output: '\u030d' },
  { input: 'nonsyl', output: '\u032f' },
  { input: 'nonsyllow', output: '\u032f' },
  { input: 'nonsylup', output: '\u0311' },
  { input: '~', output: '\u0303' },
  { input: '\"', output: '\u0308' },
  { input: 'velphar', output: '\u0334' },
  { input: 'voiceless', output: '\u0325' },
  { input: 'voicelesslow', output: '\u0325' },
  { input: 'voicelessup', output: '\u030a' },
  { input: 'voiced', output: '\u032c' },
  { input: '_', output: '\u0361' },
  { input: '__', output: '\u035c' },
  { input: '0', output: '∅' },
  { input: '->', output: '→' }
];

var keyMap = {};

for (var i = 0; i < keys.length; i++) {
  keyMap[keys[i].input] = keys[i].output;
}
