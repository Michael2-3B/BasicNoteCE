document.getElementById('textInput').addEventListener('change', getText);
var txt = document.getElementById('txtDisplay');
		
function doStuffWithText(text) {
    // do your processing here
    txt.innerText = text;
}

function getText(event) {
    var file = event.target.files[0];

    var fileReader = new FileReader();
	fileReader.onload = function(e) {
		  doStuffWithText(e.target.result);
    };
    fileReader.readAsText(file, "UTF-8");
}
