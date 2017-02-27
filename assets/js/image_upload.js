

(function ($) {
    $.fn.imgUpload= function (imgId) {
         imgId=$.extend({
            _imgList:'',
             _progrs:'',
             _imgid:'',
             url:'',
            i:0
        },imgId||{});
        var _file = document.getElementById($(this).attr('id')),
            _imgList = document.getElementById(imgId._imgList);

        var upload = function(){
            if(_file.files.length === 0){
                return;
            }
            var data = new FormData();
            data.append(_file.name, _file.files[0]);
            console.log(_file.name);
            var request = new XMLHttpRequest();
            request.onreadystatechange = function(){
                if(request.readyState == 4){
                    try {
                        var resp = JSON.parse(request.response);
                        var i=imgId.i;
                        i++;
                        console.log($('#'+imgId._imgList).hasClass('one-photo'))
                        if($('#'+imgId._imgList).hasClass('one-photo')) {
                            $('#' + imgId._imgList).empty();
                        }
                        $('#'+imgId._imgList).append('<img img src="'+resp.data+'" class="photo'+i+'"/>');
                        $('#'+imgId._progrs).css({display:'none'});
                        toast('upload_success');
                    } catch (e){
                        var resp = {
                            status: 'error',
                            data:  request.responseText
                        };
                        toast('upload_fail');
                    }
                }
            };
            request.upload.addEventListener("progress", updateProgress);
            function updateProgress (oEvent) {
                if(oEvent.lengthComputable)
                {
                    var percent = oEvent.loaded / oEvent.total;
                    if(percent<1){
                        $('#'+imgId._progrs).css({display:'block'});
                    }else{
                    }
                }
            }

            request.open('POST',imgId.url);
            request.send(data);
        }

        _file.addEventListener('change', upload);


    }
})(Zepto);
/*function clickImg(e){
    var t=document.getElementById(e);


}*/
