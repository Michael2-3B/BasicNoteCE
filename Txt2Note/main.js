document.getElementById('textInput').addEventListener('change', getText);

function doStuffWithText(text) {
  download(convertTxt(), "Txt2Note", 1)
}

function copyString() {
  document.getElementById("theString").select();
  document.execCommand("copy");
}

// todo: add more tokens:
var lookupTable = {
// "token": "bytes"
 ' ': '\x2a',
 '\t': '\x2a\x2a', // one tab is two spaces
 'A': '\x41',
 'B': '\x42',
 'C': '\x43',
 'D': '\x44',
 'E': '\x45',
 'F': '\x46',
 'G': '\x47',
 'H': '\x48',
 'I': '\x49',
 'J': '\x4a',
 'K': '\x4b',
 'L': '\x4c',
 'M': '\x4d',
 'N': '\x4e',
 'O': '\x4f',
 'P': '\x50',
 'Q': '\x51',
 'R': '\x52',
 'S': '\x53',
 'T': '\x54',
 'U': '\x55',
 'V': '\x56',
 'W': '\x57',
 'X': '\x58',
 'Y': '\x59',
 'Z': '\x5a',
 'θ': '\x5b',
 'a': '\xbb\xb0',
 'b': '\xbb\xb1',
 // [...] (more tokens needed)
 '[xbar]', '\x62\x03', // I'm pretty sure this is right, not 100%, though.
 '?': '\xaf'
}

function convertTxt() {
  var dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzθ' :?,1234567890^-/*+().{}[]!@#$%&=_|"; // you can afford to put all of the greek letters in here if you want.
  var originalText = document.querySelector('pre').innerText;
  // on some weird windows systems \n is denoted with \r\n for some reason
  // the second regex looks scary (it is), but it's just replacing all weird forms of whitespace with an actual, honest-to-goodness space.
  // I basically ripped that regex off of the mdn.
  originalText = originalText.replace(/\r\n/g, '\n').replace(/[\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]/g, ' ')
  var newText = ''; // this will be our result
  for (var i = 0; i < originalText.length; i++) {
  	var character = originalText.charAt(i);
  	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
  	switch (originalText.charAt(i)) {
    	case '"': // if (originalText.charAt(i) == '"') { character = "'"; }
    		character = "'" // single quote, TIOS doesn't like double quotes
    		break
    	case "\n": // if (originalText.charAt(i) == '\n') { character = "[xbar]"; }
    		character = "[xbar]"
    		break
    	default:
    		if (!dictionary.includes(originalText.charAt(i))) { // .includes() makes more semantic sense.
    			character = "?"
    		}
    }
    newText += lookupTable[character];

  }
  
  return newText;
}

function getText(event) {
  var file = event.target.files[0];

  var fileReader = new FileReader();
  fileReader.onload = function (e) {
    doStuffWithText(e.target.result);
  };
  fileReader.readAsText(file, "UTF-8");
}

// download and file creation script by _iPhoenix_ :P
function download(data, comment, stringnum) {
  
  // the bytes in the data section of the file, minus the actual data. If it doesn't make sense, that's good. Just pretend it doesn't exist.
  var additionalBytes = [13, 4, (data.length + 2) & 255, (data.length+2) >> 8, parseInt('aa',16), stringnum - 1, (data.length + 2) & 255, (data.length+2) >> 8, data.length & 255, data.length >> 8]
  // turn data into a file
  var fileData = "**TI83F*\x26\x10\x00" + // signatures
    comment.padEnd(42, ' ') + // comment
    String.fromCharCode((data.length + 18 + 1) & 255) + String.fromCharCode((data.length + 18 + 1) >> 8) + // length
    '\x0d\00' + // "Always has a value of 11 or 13"
    String.fromCharCode((data.length + 2) & 255) + String.fromCharCode((data.length + 2) >> 8) + // length of variable data
    '\x04' + // variable type ID byte
    '\xaa' + String.fromCharCode(stringnum - 1) + '\x00\x00\x00\x00\x00\x00' + // "\xaa" is the first byte of a string char, next byte identifies the string
    '\x00' + // version
    '\x00' + // unarchived
    String.fromCharCode((data.length + 2) & 255) + String.fromCharCode((data.length + 2) >> 8) + // length of variable data (again)
    String.fromCharCode(data.length & 255) + String.fromCharCode(data.length >> 8) + // more length of variable data (wtf), this time in tokens 
    data + // actual variable data, finally
    // the rest of this is the checksum
    String.fromCharCode(255 & data.split('').map(x => x.charCodeAt(0)).concat(additionalBytes).reduce((a, b) => a + b)) +
    String.fromCharCode(data.split('').map(x => x.charCodeAt(0)).concat(additionalBytes).reduce((a, b) => a + b) >> 8)

  var element = document.createElement('a');
  element.setAttribute('href', 'data:application/octet-stream;base64,' + btoa(fileData));
  element.setAttribute('download', "Str" + stringnum + ".8xs");
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
