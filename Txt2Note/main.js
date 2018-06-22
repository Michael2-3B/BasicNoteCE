document.getElementById('textInput').addEventListener('change', getText);
		
function doStuffWithText(text) {
    // do your processing here
    document.querySelector('pre').innerText = text;
	var myString = convertTxt();
	document.getElementById("theString").innerText = myString;
}

function convertTxt(){
    var dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzθ' :?1234567890^-/*+().{}[]!@#$%&=_|";
    var text = document.querySelector('pre').innerText;
    for(var i=0;i<text.length;i++){
        if (text[i]=="\n"){
			if (i==0){
				text = "[xbar]"+text.substr(i+1);
            } else {
				text = text.substr(0,i)+"[xbar]"+text.substr(i+1);
            }
        } else {
        	if (dictionary.indexOf(text[i]) == -1){
				if (i==0){
					text = text.substr(i+1);
            	} else {
					text = text.substr(0,i)+text.substr(i+1);
            	}
            }
        }
	text = text.substr(0,i)+"\\"+text.substr(i+1);
	    i++;
    }
    text = " "+text;
	return text;
}

function getText(event) {
    var file = event.target.files[0];

    var fileReader = new FileReader();
	fileReader.onload = function(e) {
		  doStuffWithText(e.target.result);
    };
    fileReader.readAsText(file, "UTF-8");
}
