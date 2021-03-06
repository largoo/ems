/*
 * 用户登录
 */

Ext.ns("App");
App.LoginWin = function() {
	return {
		show : function() {
			if (!this.win) {
				this.win = this.getWin();
			}
			this.win.show();
		},

		getWin : function() {
			var form = this.getForm();
			var win = new Ext.Window({
				title : "用户登录",
				width : 400,
				height : 150,
				plain : true,
				resizable : false,
				closable : false,
				layout : "fit",
				border : false,
				modal : true,
				items : [form]
			});
			this.form = form;
			return win;
		},

		getForm : function() {
			var _this = this;
			var form = new Ext.form.FormPanel({
				labelWidth : 70,
				buttonAlign : "center",
				bodyStyle : "padding:10px;",
				frame : true,
				defaultType : "textfield",
				defaults : {
					allowBlank : false,
					anchor : "98%",
					enableKeyEvents : false
				},
				items : [{
					name : "username",
					fieldLabel : "用户名"
				}, {
					inputType : "password",
					name : "password",
					fieldLabel : "密码",
		            listeners : {  
		                specialkey : function(field, e) {  
		                    if (e.getKey() == Ext.EventObject.ENTER) {  
		                        _this.submit();
		                    }  
		                }  
		            }  
				}],
				buttons : [{
					text : "登录",
					scope : this,
					handler : function() {
						this.submit();
					}
				}, {
					text : "重置",
					scope : this,
					handler : function() {
						this.form.getForm().reset();
					}
				}]
			});
			return form;
		},

		submit : function() {
			if (this.form.getForm().isValid()) {
				var u = this.form.getForm().getValues();
				Ext.Ajax.request({
					url : '/ems/user/login.do',
					method : 'POST',
					params : {
						datas : Ext.encode(u)
					},
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if(o.success){
							window.location.href = "main.jsp";
						}else{
							Ext.msg.msg('登录失败', o.msg);
						}
					},
					failure : function() {
						Ext.msg.msg('error', '请联系管理员');
					}
				});
			}
		}
	};
}();