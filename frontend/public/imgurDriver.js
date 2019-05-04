var callback = function (res) {
    if (res.success === true) {
        // console.log(res.data.link);
        let image = document.getElementById("uploadedImage");
        image.src = res.data.link;
    }
};

new Imgur({
    targetClass: ".imgurUploader",
    clientid: '428e97466328a8c',
    callback: callback
});