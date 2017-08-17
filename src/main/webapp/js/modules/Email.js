/*
 * 收发邮件管理
 */

App.Email = function() {
	return {
		// 定义变量
		currentFormValues : {},

		// 初始化
		render : function(id) {
			if (!this.store) {
				this.store = this.getStore();
			}
			if (!this.form) {
				this.form = this.getForm();
			}
			if (!this.win) {
				this.win = this.getWin();
			}
			this.createGrid(id);
		},
		
		// 获取store
		getStore : function() {
			var store = new Ext.data.Store({
						remoteSort : true,
						autoLoad : true,
						baseParams : {
							start : 0,
							limit : 20
						},
						proxy : new Ext.data.HttpProxy({ // 获取数据的方式
							method : 'POST',
							url : '/ems/email/getAll.do'
						}),
						reader : new Ext.data.JsonReader({ // 数据读取器
							totalProperty : 'results',
							// 记录总数
							root : 'rows' // Json中的列表数据根节点
						}, ['id', 'type', 'account', 'password', 'smtp'])
					});
			return store;
		},

		// 创建表单
		getForm : function() {
			var combostore = new Ext.data.JsonStore({
				fields : ['type','name'],
				data : [{
					type : 1,
					name : '接收邮箱'
				},{
					type : 0,
					name : '发送邮箱'
				}]
			})
			
			var form = new Ext.form.FormPanel({
						labelWidth : 60,
						buttonAlign : "center",
						bodyStyle : "padding:10px;",
						frame : true,
						defaults : {
							layout : "form"
						},
						items : [{
									items : [{
												xtype : "hidden",
												name : "id",
												value : ""
											}, {
												xtype : "hidden",
												name : "action",
												value : ""
											}, {
												xtype : "textfield",
												name : "account",
												fieldLabel : "邮箱账户",
												vtype:'email',
												anchor : "98%",
												allowBlank : false
											}, {
												xtype : "combo",
												hiddenName : "type",
												fieldLabel : "类型",
												store : combostore,
												displayField : 'name',
												valueField : 'type',
												mode : 'local',
												anchor : "98%",
												triggerAction : 'all',
												listeners : {
													select : function(record){
														if(record.getValue() == 1){
															this.ownerCt.ownerCt.getForm().findField('password').setValue('')
															this.ownerCt.ownerCt.getForm().findField('smtp').setValue('')
															this.ownerCt.ownerCt.getForm().findField('password').setDisabled(true);
															this.ownerCt.ownerCt.getForm().findField('smtp').setDisabled(true);
														}else{
															this.ownerCt.ownerCt.getForm().findField('password').setValue('')
															this.ownerCt.ownerCt.getForm().findField('smtp').setValue('')
															this.ownerCt.ownerCt.getForm().findField('password').setDisabled(false);
															this.ownerCt.ownerCt.getForm().findField('smtp').setDisabled(false);
														}
													}
												}
											}, {
												xtype : "textfield",
												name : "password",
												fieldLabel : "邮箱密码",
												anchor : "98%"
											}, {
												xtype : "textfield",
												name : "smtp",
												fieldLabel : "smtp",
												anchor : "98%"
											}]
								}],
						buttons : [{
									text : "确定",
									scope : this,
									handler : function() {
										this.submit();
									}
								}, {
									text : "重置",
									scope : this,
									handler : function() {
										this.form.getForm().reset();
										this.form.getForm().setValues(this.currentFormValues);
										this.form.getForm().clearInvalid();
									}
								}]
					});
			return form;
		},

		// 提交表单
		submit : function() {
			var fr = this.form.getForm(); // 获取BasicForm对象
			var gs = this.store;
			if (fr.isValid()) {
				var l = fr.getValues();
				if(l.type == 0){
					if(l.password.replace(/(\s*$)/g,'') == '' || l.smtp.replace(/(\s*$)/g,"") == ''){
						Ext.msg.msg('操作失败', '发送邮箱的密码和smtp不能为空');
						return;
					}
				}
				Ext.Ajax.request({
					url : '/ems/email/'+l.action + '.do',
					method : 'POST',
					params : {
						datas : Ext.encode(l)
					},
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if(o.success){
							Ext.msg.msg('操作成功', o.msg);
							Ext.getCmp('EmailWin').hide();
							gs.reload();
						}else{
							Ext.msg.msg('操作失败', o.msg);
						}
					},
					failure : function() {
						Ext.msg.msg('error', '请联系管理员');
					}
				});	
			}else{
				Ext.msg.msg('操作失败', '请检查表单输入');
			}
		},

		// 创建窗口
		getWin : function() {
			var win = new Ext.Window({
						id : 'EmailWin',
						width : 300,
						height : 250,
						title : "",
						plain : true,
						resizable : false,
						frame : true,
						closeAction : "hide",
						border : false,
						modal : true,
						layout : "fit",
						items : [this.form],
						listeners : {
							scope : this,
							render : function(fp) {
								this.form.form.waitMsgTarget = fp.getEl();
							},
							show : function() {
								this.form.form.setValues(this.currentFormValues);
								if(this.currentFormValues.type == 1){
									this.form.form.findField('password').setDisabled(true)
									this.form.form.findField('smtp').setDisabled(true)
								}
								this.form.form.clearInvalid();
							}
						}
					});
			return win;
		},

		// 创建Grid
		createGrid : function(id) {
			var panel = Ext.getCmp(id);
			panel.body.dom.innerHTML = "";
			var sm = new Ext.grid.CheckboxSelectionModel();

			this.grid = new Ext.grid.GridPanel({
						tbar : [{
									text : "新增",
									iconCls : "x-btn-add",
									scope : this,
									handler : this.add
								}, "-", {
									text : "编辑",
									iconCls : "x-btn-edit",
									scope : this,
									handler : this.edit
								}, "-", {
									text : "删除",
									iconCls : "x-btn-del",
									scope : this,
									handler : this.del
								}, {
									xtype : "button",
									text : "查询",
									iconCls : "x-btn-search",
									scope : this,
									handler : this.search
								}],
						bbar : new Ext.PagingToolbar({
									store : this.store,
									pageSize : 20,
									displayInfo : true
								}),

						store : this.store,
						sm : sm,
						columns : [sm,{
									hidden : true,
									dataIndex : "id"
								},{
									header : "邮箱账号",
									dataIndex : "account"
								},{
									header : '类型',
									dataIndex : 'type',
									renderer : function(value){
										return value == 0 ? "<span style='color:red;font-weight:bold;'>发送邮箱</span>" : "<span style='color:green;font-weight:bold;'>接收邮箱</span>"	
									}
								},{
									header : '邮箱密码',
									dataIndex : 'password'
								},{
									header : 'smtp',
									dataIndex : 'smtp'
								}],

						border : false,
						viewConfig : {
							forceFit : true
						}
					});
			panel.add(this.grid);
		},

		// 查询
		search : function() {
			// console.log("Search ...");
			this.store.reload();
		},

		// 新增
		add : function() {
			this.win.setTitle("新增邮箱");
			Ext.apply(this.currentFormValues, {
						account : '',
						type : 1,
						password : '',
						smtp : '',
						action : 'add'
					});
			this.win.show();
		},

		// 编辑
		edit : function() {
			if (this.grid.getSelectionModel().hasSelection()) {
				this.win.setTitle("编辑邮箱");
				var rec = this.grid.getSelectionModel().getSelected();
				Ext.apply(this.currentFormValues, {
							id : rec.data.id,
							type : rec.data.type,
							account : rec.data.account,
							password : rec.data.password,
							smtp : rec.data.smtp,
							action : 'update'
						});
				this.win.show();
			} else {
				Ext.Msg.alert("信息", "请选择要编辑的邮箱！");
			}
		},

		// 删除
		del : function() {
			if (this.grid.getSelectionModel().hasSelection()) {
				var st = this.store;
				var recs = this.grid.getSelectionModel().getSelections();
				var names = "";
				var ids = [];
				for (var i = 0; i < recs.length; i++) {
					names += recs[i].data.account + "<br />";
					if(i == recs.length - 1){
						ids += recs[i].data.id
					}else{
						ids += recs[i].data.id + ','
					}
				}
				Ext.Msg.confirm("确认", "确认删除以下邮箱？<br />" + names, function(btn) {
							if (btn == "yes") {
								Ext.Ajax.request({
									url : '/ems/email/delete.do',
									method : 'POST',
									params : {
										datas : ids
									},
									success : function(response) {
										var o = Ext.util.JSON.decode(response.responseText);
										if(o.success){
											Ext.msg.msg('操作成功', o.msg);
											Ext.getCmp('EmailWin').hide();
											st.reload();
										}else{
											Ext.msg.msg('操作失败', o.msg);
										}
									},
									failure : function() {
										Ext.msg.msg('error', '请联系管理员');
									}
								});	
							}
						});
			} else {
				Ext.Msg.alert("信息", "请选择要删除的邮箱！");
			}
		}
	}
}();
