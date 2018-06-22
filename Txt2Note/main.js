$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = textIsLoaded;
            reader.readAsDataURL(this.files[0]);
        }
    });
});

function textIsLoaded(e) {
    $('#myText').attr('src', e.target.result);
};
