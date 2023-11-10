if(document.readyState !== "loading"){
    console.log("Document ready");
    initializeCode();
} else{
    document.addEventListener("DOMContentLoaded", function(){
        console.log("DOMContentLoaded event fired");
        initializeCode();
    })
}

function initializeCode(){
    var button = document.getElementById('input-button');

    button.addEventListener('click', function() {
        var textareaContent = document.getElementById('input-area').value;
        console.log("Textarea content: ", textareaContent);
    });
}