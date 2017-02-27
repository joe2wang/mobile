var tofixed= function (num) {
    return Number.prototype.toFixed.call(num,2);
};
var errTips={
    supplierIdNull:'供货商编号不能为空',
    supplierNameNull:'供货商名称不能为空',
    supplierNull:'供货商不能为空',
    forPersonNull:'代表人不能为空',
    telphoneNull:'请输入正确的电话',
    partIdNull:'配件编号不能为空',
    storageRoomIdNull:'库房编号不能为空',
    storageRoomNameNull:'库房名称不能为空',
    partNameNull:'配件名称不能为空',
    payeeNull:'收款单位不能为空',
    moneyNull:'金额不能为空',
    customNull:'客户不能为空',
    customIdNull:'客户编号不能为空',
    customNameNull:'客户姓名不能为空',
    outLibraryNull:'调出库房不能为空',
    gatherNameNull:'付款单位不能为空',
    userNameNull:'用户名不能为空',
    passwordNull:'密码不能为空',
    goodsLocationIdNull:'货位编号不能为空',
    passwordConfirmNull:'确认密码不能为空',
    workIdNull:'工号不能为空',
    mobilePhoneNull:'请输入正确的移动电话',
   nameNull:'姓名不能为空'

}, errTip=function(obj){
    obj= errTips[obj];
    return obj;
};this._=errTip;

(function(){
    var q= 1,s= 0,partsidNull= 0,allLinePlus= 0, phoneReg = /^1[3|4|5|7|8]\d{9}$/, telReg = /[\u4e00-\u9fa5_a-zA-Z0-9]/;

    $.numPlus=function(option){
        option= $.extend({
            numSum:'.number-sum',
            priceSum:'.line-sum',
            allLineSum:'.all-line-sum',
            numObj:'.num-obj',
            priceObj:'.parts-price',
            sumParent:'.parts-order-plus-tr',
            lineObj:'',
            iframeTitle:'',
            url:'',
            iframeWidHeight:['1024px', '600px']
        },option||{});

        var numobj=$(option.numObj),sumBox=$(option.sumParent).find(option.numSum),
            priceSum=option.priceSum,
            priceobj=$(option.priceObj);
        /* 配件数量 change*/
        $(document).on('change',option.numObj,function(){
            var thisprice= Number($(this).parents('.trObj').find(option.priceObj).val());
            if(!Number($(this).val())||Number($(this).val())<1) $(this).val(1);
            var thisnum= Number($(this).val())<1 ? 1 :$(this).val();
            s=0,allLinePlus=0;
            for(var k=0;k<$('.trObj').length-1;k++){
                if(!!document.querySelectorAll(option.numObj)[k].value&&Number(document.querySelectorAll(option.numObj)[k].value)>1){
                    s=s+Number(document.querySelectorAll(option.numObj)[k].value);

                }else{
                    s=s+1;
                }
                allLinePlus=allLinePlus+Number(document.querySelectorAll(option.numObj)[k].value)*Number(document.querySelectorAll(option.priceObj)[k].value);
            }
            $(this).parents('.trObj').find(priceSum).val(tofixed(thisnum*thisprice));
            $(option.allLineSum).val(tofixed(allLinePlus));
            sumBox.val(tofixed(s));
        });
        /*配件价格 change*/
        $(document).on('change',option.priceObj,function(){
            var thisnum= Number($(this).parents('.trObj').find(option.numObj).val());
            if(!Number($(this).val())||Number($(this).val())<0||!$(this).val()) $(this).val('0.00');
            allLinePlus=0;
            var thisprice= Number($(this).val());
            $(this).parents('.trObj').find(priceSum).val(tofixed(thisnum*thisprice));
            for(var k=0;k<$('.trObj').length-1;k++){
                if(!!document.querySelectorAll(option.priceObj)[k].value&&Number(document.querySelectorAll(option.priceObj)[k].value)>0){
                    allLinePlus=allLinePlus+Number(document.querySelectorAll(option.numObj)[k].value)*Number(document.querySelectorAll(option.priceObj)[k].value)
                }
            }
            $(option.allLineSum).val(tofixed(allLinePlus));
            $(this).parents('.trObj').find(priceSum).val(tofixed(thisnum*thisprice));
        });
        /*delete 一行配件*/
        $(document).on('click','.btn-danger',function(){
            var nexts=$(this).parents('.trObj').next('.trObj'),nextall=$(this).parents('.trObj').nextAll('.trObj'),
                part_num=Number($(this).parents('.trObj').find(option.numObj).val()),part_sum=Number(sumBox.val()),
                part_price=Number($(this).parents('.trObj').find(option.priceSum).val()),price_sum=Number($(option.allLineSum).val());
            if(!$(this).parents('.trObj').find('.parts-id').val()){
                return false;
            }else if(parseInt($(this).parents('.trObj').index())+2==$('.btn-danger').length&&!!$(this).parents('.trObj').find('.parts-id').val()){
                q--;$(this).parents('.trObj').empty().append('<td>'+q+'</td>'+option.lineObj);
                nexts.remove();
                $('.parts-order-plus-tr td:nth-child(2)').text('计'+(q-1)+'项');
            }else{
                q--;
                $(this).parents('.trObj').remove();
                nextall.each(function () {
                    $(this).find('td:first-child').text(parseInt($(this).find('td:first-child').text())-1);
                });
                $('.parts-order-plus-tr td:nth-child(2)').text('计'+(q-1)+'项');
            }
            sumBox.val(tofixed((part_sum - part_num)));
            $(option.allLineSum).val(tofixed((price_sum - part_price)));
        });
        /*弹出 iframe*/

        $(document).on('click','.pop-iframe',function(){
            var indexNum=Number($(this).parents('tr').find('td:first-child').text());
            if(!$(this).val()) {partsidNull=1;q++;} else partsidNull=0;
            layer.open({
                type: 2,
                title: false,
                closeBtn: 0, //不显示关闭按钮
                shade: [0],
                area: ['0px', '0px'],
                offset: 'rb', //右下角弹出
                time: 100, //2秒后自动关闭
                anim: 2,
                content: ['', 'no'], //iframe的url，no代表不显示滚动
                zIndex: layer.zIndex ,//重点1
                end: function(){ //此处用于演示
                    layer.open({
                        type: 2,
                        title: '<div style="display: none;" class="line-number">'+q+'</div> <div style="display: none;" class="parts-id-null">'+partsidNull+'</div><div style="display: none;" class="index-number">'+indexNum+'</div>',
                        shadeClose: false,
                        shade: [0.3],
                        maxmin: false, //开启最大化最小化按钮
                        area: option.iframeWidHeight,
                        content: option.url
                    });
                }
            });
        });
    };
    $.fn.sonNumPlus=function(options){
        var self=$(this);
        options= $.extend({
            iframeTitle:'',
            trContent:'',
            namePosition:2,
            idPosition:1,
            pricePosition:7,
            iframeWidHeight:['960px', '500px'],
            url:'',
        },options||{});
        self.on('click',function(){
            layer.open({
                type: 2,
                title: false,
                closeBtn: 0, //不显示关闭按钮
                shade: [0],
                area: ['0px', '0px'],
                offset: 'rb', //右下角弹出
                time: 100, //2秒后自动关闭
                anim: 2,
                content: ['', 'no'], //iframe的url，no代表不显示滚动条
                zIndex: layer.zIndex, //重点1
                end: function(){ //此处用于演示
                    layer.open({
                        type: 2,
                        title: '<h4 class="">'+options.iframeTitle+'</h4>',
                        shadeClose: false,
                        shade: [0.3],
                        maxmin: false, //开启最大化最小化按钮
                        area: options.iframeWidHeight,
                        content: options.url
                    });
                }
            });
        });
        $(document).on('click','.cursor-table tr',function(){
            var index = parent.layer.getFrameIndex(window.name),i=parseInt(parent.$('.line-number').text()),partsIdNull=parseInt(parent.$('.parts-id-null').text()),
                j=i- 1,s= 0,parts_name=$(this).find('td:nth-child('+options.namePosition+')').text(),
                parts_id=$(this).find('td:first-child').text(),parts_price=tofixed(Number($(this).find('td:nth-child('+options.pricePosition+')').text())),
                parents=parent.$('.overflow-table table tr:nth-child('+(i-1)+')'),allprices=0.00,
                parentTwo=parent.$('.overflow-table table tr:nth-child('+parent.$('.index-number').text()+')');
            parent.$('.parts-order-plus-tr td:nth-child(2)').text('计'+j+'项');
            if(partsIdNull==1) partsIdNull=true; else partsIdNull=false;
            if(partsIdNull){
                parents.find('.parts-name').val(parts_name);
                parents.find('.parts-id').val(parts_id);
                parents.find('.parts-price,.line-sum').val(parts_price);
                parents.find('.parts-price').removeAttr('readonly');
                parents.find('.num-obj').val(1).removeAttr('readonly');
                parent.$('.overflow-table tbody').append('<tr class="trObj">'+
                    '<td>'+i+'</td>'+
                    options.trContent+
                    '</tr>');
            }else{
                parentTwo.find('.parts-name').val(parts_name);
                parentTwo.find('.parts-id').val(parts_id);
                parentTwo.find('.parts-price,.line-sum').val(parts_price).removeAttr('readonly');
                parentTwo.find('.num-obj').val(1).removeAttr('readonly');
            }
            parent.$('.num-obj').each(function () {
                if(!!$(this).val()&&$(this).val()!=1){
                    s=s+Number($(this).val());
                }else if($(this).val()==1){
                    s=s+1;
                }
            });
            parent.$('.number-sum').val(tofixed(s));
            parent.$('.line-sum').each(function () {
                if(!!$(this).val()){
                    allprices=allprices+Number($(this).val());
                }
            });
            parent.$('.all-line-sum').val(tofixed(allprices));
            parents.find('.width-100p').removeAttr('readonly');
            parent.layer.close(index);

        });
    }
    $.fn.popMethod=function(opt){
        var t=true,self=$(this);
        opt= $.extend({
            clickBtn:'.btn-primary',
            tipsBox:{
                posit:[],
                tip:[''],
                width:[]
            },
            popPosition:'right',
            success: function (tf) {return this;}
        },opt||{});
        if(opt.tipsBox.tip.length==0) {return;}
        for(var i=0;i<opt.tipsBox.tip.length;i++){
            self.eq(opt.tipsBox.posit[i]).popover({
                html:true,
                trigger:'hover',
                placement:opt.popPosition,
                content:'<div style="width: '+opt.tipsBox.width[i]+'px">'+opt.tipsBox.tip[i]+'</div>'
            });
        }
        $(opt.clickBtn).click(function (ev) {
            ev.preventDefault();
            t=true;
            for(var j=0;j<opt.tipsBox.posit.length;j++){
                if(!self.eq(opt.tipsBox.posit[j]).val()&&!self.eq(opt.tipsBox.posit[j]).hasClass('phone')&&!self.eq(opt.tipsBox.posit[j]).hasClass('telphone')){
                    self.eq(opt.tipsBox.posit[j]).popover('show');
                    t=false;
                    break
                }else if(self.eq(opt.tipsBox.posit[j]).hasClass('telphone')&&!telReg.test(self.eq(opt.tipsBox.posit[j]).val())){
                    self.eq(opt.tipsBox.posit[j]).popover('show');
                    t=false;
                    break;
                }else if(self.eq(opt.tipsBox.posit[j]).hasClass('phone')&&!phoneReg.test(self.eq(opt.tipsBox.posit[j]).val())){
                    self.eq(opt.tipsBox.posit[j]).popover('show');
                    t=false;
                    break;
                }
            }
            t=opt.success(t);

                /**/
        });

    }
}());


