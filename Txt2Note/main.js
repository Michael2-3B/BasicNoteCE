document.getElementById('textInput').addEventListener('change', getText);

function doStuffWithText(text) {
  // do your processing here
  document.querySelector('pre').innerText = text;
  document.getElementById("theString").value = convertTxt();
}

function copyString() {
  document.getElementById("theString").select();
  document.execCommand("copy");
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
  	var character = '\\' + originalText.charAt(i);
  	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
  	switch (originalText.charAt(i)) {
    	case '"': // if (originalText.charAt(i) == '"') { character = "'"; }
    		character = "'" // single quote, TIOS doesn't like double quotes
    		break
    	case "\n": // if (originalText.charAt(i) == '\n') { character = "[xbar]"; }
    		character = "[xbar]"
    		break
    	case "\t": // you get the idea
    		character = "\\ \\ " // I prefer two spaces in a tab :P
    		break
    	default:
    		if (!dictionary.includes(originalText.charAt(i))) { // .includes() makes more semantic sense.
    			character = "\\?"
    		}
    }
    newText += character;

  }
  newText = newText.replace(/θ/g, 'theta');
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