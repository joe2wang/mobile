var d=document;
/*延迟执行*/
$.fn.delayTo= function (theMethod,times) {
    setTimeout(theMethod,times);
}
/*温馨提示*/
$.fn.alertTip= function (tipTxt,t) {
    if($('.pop-tip:visible')==true) return;
    $('.pop-tip').remove();
    $('body').append('<div class="pop-tip">'+tipTxt+'</div>');
    var xp=parseInt($('.pop-tip').css('padding-left')),
        yp=parseInt($('.pop-tip').css('padding-top')),
        w=-($('.pop-tip').width()/2),
        h=-($('.pop-tip').height()/2+yp);
    $('.pop-tip').addClass('fadeIn').css('display','block');
    $('.pop-tip').css({marginTop:h,marginLeft:w});
    var times=0;
    var timePlus=setInterval(function () {
        times++;
        if(times==t){
            $('.pop-tip').addClass('fadeOut');
            $(this).delayTo(function () {
                $('.pop-tip').remove();
            },500);
            clearInterval(timePlus);
        }
    },1000);
}
/*5秒跳转*/
$.fn.goLogin=function(url){
    var times=5;
    var t=this;
    var setTimesReduce=setInterval(function () {
        times--;
        t.text(times);
        if(times==0){
            clearInterval(setTimesReduce);
            window.location.href=url;
        }
    },1000);
}
/*点击选取所在地*/
function transform(obj){
    var arr = [];
    for(var item in obj){
        arr.push(obj[item]);
    }
    return arr;
}
$.fn.cityMap=function (slid) {
    slid= $.extend({
        slideNum:1,
        url:''
    },slid||{})
    $('.china-list').empty();
    $('.china-list').append('<ul></ul>');
    var th=$(this);
    $('.city-wrapper').height($('html').height());
    $.getJSON(slid.url, function (a) {
        var arr=transform(a);
        $('.china-list ul').empty();
        arr.map(function (b) {
            $('.city-box').css({display:'none'});

            $('.china-list ul').append('<li class="provi'+ b.id+'">'+  b.name+'</li>');
            $('.provi'+b.id).click(function () {
                var s=$(this).attr('class').substring(5,$(this).attr('class').length);
                $('.china-list').empty();

                $('.china-list').append('<div class="city-list"></div>');
                $('.china-list .city-list').empty();
                $('.china-list .city-list').append('<div class="proviBox">'+$(this).text()+'<div>');
                arr=transform(a[s].children);
                arr.map(function (c,j) {
                    if(j<0)  {
                        $('.china-list').empty();
                        mySwiper.slideTo(slid.slideNum, 500, false);//速度为0.5秒
                        th.val(b.name);
                        return true;
                    }
                    else {
                        $('.city-list').append('<div class="city'+c.id+'">'+ c.name+'</div>');

                    }
                    $('.city'+c.id).click(function () {
                        var f=$(this).attr('class').substring(4,$(this).attr('class').length);
                        arr=transform(a[s].children[f].children);
                        $('.china-list').empty();
                        $('.china-list').append('<dl class="country-list"></dl>');
                        $('.china-list .country-list').empty();
                        $('.china-list .country-list').append('<dd class="cityBox">'+$(this).text()+'</dd>');
                        arr.map(function (q) {
                            if(q<0){
                                $('.city-list').append('');
                                mySwiper.slideTo(slid.slideNum, 500, false);//速度为0.5秒
                                th.val(b.name+' '+c.name);
                                return;
                            }
                            else {
                                $('.country-list').append('<dd class="country'+ q.id+'">'+ q.name+'</dd>');
                            }

                            $('.country'+q.id).click(function () {
                                $('.china-list').empty();
                                $('.china-list').append('<ul></ul>');
                                $('.china-list ul').append('<li class="provi'+ b.id+'">'+  b.name+'</li>');
                                mySwiper.slideTo(slid.slideNum, 500, false);
                                th.val(b.name+' '+c.name+' '+q.name);

                            })
                        })
                    })
                })
            })
        })
    })
}
/*购买数量 限定大小 购买结算 合计*/
$.fn.numberPlus= function () {
    $('.express-price').text(parseFloat($('.express-box select').find('option:selected').val()).toFixed(2));
    $('.express-box').append('<input type="hidden" class="express-type-input"/>');
    $('.express-type-input').val($('.express-box select').find('option:selected').text());
    var proNum=d.querySelector('.product-number'), proVal=Number($('.product-number').val()),
        expressBox= d.querySelector('.express-box select'),
        prc=$('.product-price').text(),//  单价
        express=$('.express-price').text(),
        stockNum=$('.stock-num').text(), sl=stockNum.length-1, stockNum=parseInt(stockNum.substring(0,sl));//库存值
    var outNum=$('.out-num').text(),outNum=parseInt(outNum);// 最小发货量:
    $('.product-number').val(outNum);//默认最小发货量

    $('.sum-red i').text(parseFloat(outNum*(Number(prc)+Number(express))).toFixed(2));
    proNum.addEventListener('change', function () {
        var proValue=parseInt($('.product-number').val()),  express=parseFloat($('.express-price').text()).toFixed(2);
        if(proValue<1||proValue>stockNum){
            $('.product-number').val(outNum);
            $('.sum-red i').text(parseFloat(outNum*(Number(prc)+Number(express))).toFixed(2));
        }else{
            $('.product-number').val(proValue);
            $('.sum-red i').text(parseFloat(proValue*(Number(prc)+Number(express))).toFixed(2));
        }
    })
    expressBox.addEventListener('change', function () {
        var ex=Number($('.express-box select').find('option:selected').val()),prov=Number($('.product-number').val());
        $('.express-price').text(ex);
        $('.express-type-input').val($('.express-box select').find('option:selected').text());
        var sum=parseFloat((Number(prc)+ex)*prov).toFixed(2);
        console.log( (Number(Number(prc)+ex))*prov);
        $('.sum-red i').text(sum);
    })
    /*购买数量加减*/
    $('.number-reduce').click(function () {
        var proValue=parseInt($('.product-number').val()), reduce=proValue- 1, express=parseFloat($('.express-price').text()).toFixed(2);
        console.log(express);
        $('.product-number').val(reduce);
        $('.sum-red i').text(parseFloat(reduce*(Number(prc)+Number(express))).toFixed(2));
        if(reduce<outNum){
            $('.product-number').val(outNum);
            $('.sum-red i').text(parseFloat(outNum*(Number(prc)+Number(express))).toFixed(2));
        }
    });
    $('.number-add').click(function () {
        var proValue=parseInt($('.product-number').val()), add=proValue+ 1,  express=parseFloat($('.express-price').text()).toFixed(2);
        $('.product-number').val(add);
        $('.sum-red i').text(parseFloat(add*(Number(prc)+Number(express))).toFixed(2));
        if(add>stockNum){
            $('.product-number').val(stockNum);
            $('.sum-red i').text(parseFloat(stockNum*(Number(prc)+Number(express))).toFixed(2));
        }
    });
}
/* 订单 点击 确定 或取消 remove pop*/
$.fn.fadeOutPop= function (times) {
    $('.order-pop').removeClass('bounchIn').addClass('bounchOut');
    $('.order-pop-bg').removeClass('fadeInBox').addClass('fadeOutBox');
    var method= function () {
        $('.order-pop,.order-pop-bg').remove();
    }
    $(this).delayTo(method,times);

}
/*订单 提醒*/
$.fn.orderAlert=function(orderAlertbj){
    orderAlertbj= $.extend({
        tipsText:'',
        tipsCont:'',
        arrbtntxt:[''],
        oneBtn:true,
        haveBtn:true
    },orderAlertbj||{});
    var b=$('.machmall-wrapper');
    b.after('<div class="order-pop-bg fadeInBox"></div>');
    if(orderAlertbj.haveBtn){
        if (orderAlertbj.oneBtn){
            b.after('<div class="order-pop bounchIn"><div class="order-pop-txt"><div class="order-tips">'+orderAlertbj.tipsText+'</div></div><div class="order-pop-btn"><span class="order-pop-sure">确定</span></div></div>');
        }else{
            if(orderAlertbj.tipsCont==''){
                b.after('<div class="order-pop bounchIn"><div class="order-pop-txt"><div class="order-tips">' +orderAlertbj.tipsText+'</div></div><div class="order-pop-two clearfix"><div class="order-pop-sure">'+orderAlertbj.arrbtntxt[0]+'</div><div class="order-pop-cancel">'+orderAlertbj.arrbtntxt[1]+'</div></div></div>');
            }else{
                b.after('<div class="order-pop bounchIn"><div class="order-pop-txt"><div class="order-tips">' +orderAlertbj.tipsText+'</div></div><div class="order-pop-cont">'+orderAlertbj.tipsCont+'</div><div class="order-pop-two clearfix"><div class="order-pop-sure">'+orderAlertbj.arrbtntxt[0]+'</div><div class="order-pop-cancel">'+orderAlertbj.arrbtntxt[1]+'</div></div></div>');
            }
            $('.cancel-del-btn').tap(function () {
                $(this).fadeOutPop(600);
            });

        }
    }else{
        b.after('<div class="order-pop bounchIn"><div class="order-pop-txt"><div class="order-tips">'+orderAlertbj.tipsText+'</div></div></div>');
        $('.order-pop').delayTo(function () {
            $('.order-pop').removeClass('bounchIn').addClass('bounchOut');
            $('.order-pop-bg').removeClass('fadeInBox').addClass('fadeOutBox');
        },2000);
        $('.order-pop').delayTo(function () {
            $('.order-pop,.order-pop-bg').remove();
        },2600);
    }

    $('.order-pop').css({marginTop:'-'+parseInt($('.order-pop').css('height'))/2+'px'});
    $('.order-pop-btn .order-pop-sure').click(function () {
        $(this).fadeOutPop(500);
    })
}

