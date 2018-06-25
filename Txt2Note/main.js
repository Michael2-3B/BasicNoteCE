document.getElementById('textInput').addEventListener('change', getText);
		
function doStuffWithText(text) {
    // do your processing here
    document.querySelector('pre').innerText = text;
	var myString = convertTxt();
	document.getElementById("theString").value = myString;
}

function copyString(){
	document.getElementById("theString").select();
	document.execCommand("copy");
}

function convertTxt(){
    var dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzθ' :?,1234567890^-/*+().{}[]!@#$%&=_|";
    var text = document.querySelector('pre').innerText;
	text=" "+text;
	for(var i=1;i<text.length;i+=2){
    		text=text.substr(0,i)+"\\"+text.substr(i);
	}
    for(var i=2;i<text.length;i+=2){
    	if (text[i]=='"'){
    		text = text.substr(0,i)+"'"+text.substr(i+1);
		} else {
        	if (text[i]=="\n"){
				text = text.substr(0,i-1)+"[xbar]"+text.substr(i+1);
        	} else {
				if (text[i]=="\t"){
					text = text.substr(0,i)+" \\ \\ \\ "+text.substr(i+1);
				} else {
        			if (dictionary.indexOf(text[i]) == -1){
						text = text.substr(0,i)+"?"+text.substr(i+1);
					}
				}
			}
		}
    }
    text=" "+text;
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
