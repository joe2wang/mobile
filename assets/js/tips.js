var form_tips = {
    null_shopName: "请输入店铺名称",
    null_password: "请输入密码",
    null_curCity: "请选择所在地区",
    null_account: "账户不能为空",
    null_userfactory: "姓名或厂名不能为空",
    null_user: "姓名不能为空",
    null_sex: "性别不能为空",
    null_birth: "生日不能为空",
    null_address: "常住地不能为空",
    null_job: "职业不能为空",
    null_qqnum: "qq不能为空",
    null_wx: "微信不能为空",
    null_email: "邮箱不能为空",
    null_wb: "微博不能为空",
    null_userandphone: "请输入正确的用户名/手机号",
    null_qq: "用户名/手机号码/QQ/邮箱不能为空",
    null_Consignee_User: "请输入收货人姓名",
    null_details_address: "请输入详细地址",
    null_detail_address: "具体地址不能为空",
    null_mainlearn: "主修不能为空",
    null_learn: "兼修不能为空",
    null_city: "城市不能为空",
    null_equiptype: "请选择设备类型",
    null_equipbrand: "请选择设备品牌",
    null_equiptypenum: "设备型号不能为空",
    null_dunwei: "吨位不能为空",
    null_outfactorydate: "出厂年限不能为空",
    null_usehour: "使用小时数不能为空",
    null_equipaddress: "设备所在地不能为空",
    null_contactperson: "联系人不能为空",
    null_validateCode: "请输入验证码",
    validate_Code: "验证码不正确",
    null_evaluate: '评价内容不能为空',
    null_album: '请上传图片',
    null_describe: '描述不能为空',
    error_pass: "密码不符合规则",
    error_newpass: "新密码不符合规则",
    null_newpass: "请输入新密码",
    error_passequal: "新密码不能与原密码相同",
    error_passstyle: "密码由6~18英文、数字或标点符号组成",
    error_againPass: "两次密码输入不一致",
    error_UserOrPass: "用户名或密码错误",
    error_phone: "请输入正确的手机号码",
    error_tel: "请输入正确的固定电话",
    error_idcard: "身份证号格式不正确",
    error_email: "邮箱格式不正确",
    exist_phone: "手机号码已被注册",
    no_exist_phone: "该手机号码未注册",
    exist_user: "请输入用户名",
    login_success: "登录成功",
    regist_success: "注册成功",
    pass_reset_success: "密码重置成功",
    add_success: "新增成功",
    upload_success: "上传成功",
    upload_fail: "上传失败",
    none_web:"网络不给力，请检查网络设置",
    username_length:"用户名不能超过20个字且禁止纯数字"
};
var phoneReg = /^1[3|4|5|7|8]\d{9}$/;
var telReg = /[\u4e00-\u9fa5_a-zA-Z0-9]/;
var passReg = /\w{6,16}$/;
var idCardReg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
var emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
var strongPassReg = /(?=^.{6,16}$)(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z])(?!.*\n).*$/;
var middlePassReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
var weakPassReg = /(\d{6,16})|[a-zA-Z]{6,16}/;
var chineseReg=/[^\u4E00-\u9FA5]/g;
var numReg=/^[0-9]*$/;
function toast(tips,tf) {
    if(!tf){
        $('.pop-tip').alertTip(form_tips[tips], 2);
        return false;
    }else if(tf){
        $('.pop-tip').alertTip(tips, 2);
        return false;
    }

}
function getInputValNull(btnClsName,clsName){
    var c=document.querySelectorAll(clsName),l=c.length;

    for(var i=0;i<l;i++){
        c[i].addEventListener('keydown',function () {
            console.log(!this)
            if(!this) return;
            for(var j=0;j<l;j++){
                if(j-1>-1) if(c[j-1].value=='') return;
                if(c[j].value!='') {if(j==l-1) $(btnClsName).css('background','#dd2727');else $(btnClsName).css('background','#d8d8d8'); }else $(btnClsName).css('background','#d8d8d8');
            }

        })
        c[i].addEventListener('keyup',function () {
            if(!this) return;
            for(var j=0;j<l;j++){
                if(j-1>-1) if(c[j-1].value=='') return;
                if(c[j].value!='') {if(j==l-1) $(btnClsName).css('background','#dd2727');else $(btnClsName).css('background','#d8d8d8'); }else $(btnClsName).css('background','#d8d8d8');
            }

        })
    }
}
if(document.querySelector('.pass-input')){
    document.querySelector('.pass-input').addEventListener('keydown', function(){//禁止密码有中文
        var v=this.value;
        if(v.match(/[^\x00-\xff]/ig)){
            this.value= this.value.replace(/[^\x00-\xff]/ig,'');
            $('.pass-input').blur();
            toast('error_passstyle');
        }
    });
}

getInputValNull('.next-btn','.forget-pass-first .form-input-sty');//忘记密码 第一步
getInputValNull('.user-reigst-btn','.regist-box .form-input-sty');//注册



function phoneMidHide(val){
  var vals='', x='';
  if(typeof val=='number'){
    vals=val.toString();
  }else{
    vals=val;
  }
  var len=vals.length-1;
  var qi=vals.substr(0,3);
  var n=vals.length-4;
  var l=n-3;
  var qi01=vals.substr(n,len);

  for(var i=0;i<l;i++){
    x=x+'*';
  }
  var s=qi+x+qi01;
  return s;
}

var strongPassReg = /(?=^.{6,16}$)(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z])(?!.*\n).*$/;
var middlePassReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
var weakPassReg =  /(\d{6,16})|([a-zA-Z]{6,16})/;

function checkPassIntensity(obj1,obj2){

	$(obj1).change(function(){
		if(weakPassReg.test($(this).val())){
			$(obj2).removeClass("red").removeClass("orange").removeClass("green").addClass("red").text("弱");
		}else if(middlePassReg.test($(this).val())){
			$(obj2).removeClass("red").removeClass("orange").removeClass("green").addClass("orange").text("中");
		}else if(strongPassReg.test($(this).val())){
			$(obj2).removeClass("red").removeClass("orange").removeClass("green").addClass("green").text("强");
		}else{
			$(obj2).removeClass("red").removeClass("orange").removeClass("green").text("");
		}
	});

}
