layui.use(['form', 'layer','okUtils'], function () {
	var form = layui.form,
		layer = layui.layer,
		$ = layui.jquery,
		$form = $('form');
		let okUtils = layui.okUtils;
		okLoading.close();
	//添加验证规则verify
	form.verify({
		pass: [
			/^[\S]{6,16}$/
			, '密码必须6到16位，且不能出现空格'
		],
		confirmPwd: function (value, item) {
			if (!new RegExp($("#oldPwd").val()).test(value)) {
				return "两次输入密码不一致，请重新输入！";
			}
		},

	});
	var userPwd = new Vue({
			el:'#userPwd-app',
			data:{
				user:{
					userId: $.cookie("userId"),
					userName: $.cookie("userName"),
					oldPwd:'',
					newPwd:'',
					confirmPwd:''
				}
			},
			methods: {
			}
		 });
	//修改密码
	form.on("submit(changePwd)", function (data) {
		var index = layer.msg('提交中，请稍候', {icon: 16, time: false, shade: 0.8});
		setTimeout(function () {
			layer.close(index);
			layer.msg("密码修改成功！");
			$(".pwd").val('');
		}, 2000);
		return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
	})

});

