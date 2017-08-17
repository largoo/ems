/*
 * 用户管理
 */

App.User = function() {
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
							url : '/ems/user/getAll.do'
						}),
						reader : new Ext.data.JsonReader({ // 数据读取器
							totalProperty : 'results',
							// 记录总数
							root : 'rows' // Json中的列表数据根节点
						}, ['id', 'name','username'])
					});
			return store;
		},

		// 创建表单
		getForm : function() {
			var form = new Ext.form.FormPanel({
						labelWidth : 40,
						buttonAlign : "center",
						bodyStyle : "padding:10px;",
						frame : true,
						layout : "hbox",
						defaults : {
							layout : "form"
						},
						items : [{
									flex : 1,
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
												name : "name",
												fieldLabel : "姓名",
												tabIndex : 1,
												allowBlank : false
											}]
								},{
									flex : 1,
									items : [{
												xtype : "textfield",
												name : "username",
												fieldLabel : "用户名",
												allowBlank : false
											},{
												xtype : "textfield",
												name : "password",
												fieldLabel : "密码",
												allowBlank : false
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
				Ext.Ajax.request({
					url : '/ems/user/'+l.action + '.do',
					method : 'POST',
					params : {
						datas : Ext.encode(l)
					},
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if(o.success){
							Ext.msg.msg('操作成功', o.msg);
							Ext.getCmp('userwin').hide();
							gs.reload();
						}else{
							Ext.msg.msg('操作失败', o.msg);
						}
					},
					failure : function() {
						Ext.msg.msg('error', '请联系管理员');
					}
				});	
			}
		},

		// 创建窗口
		getWin : function() {
			var win = new Ext.Window({
						id : 'userwin',
						width : 600,
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
			var sm = new Ext.grid.CheckboxSelectionModel({singleSelect:true});

			this.grid = new Ext.grid.GridPanel({
						tbar : [{
									text : "新增",
									iconCls : "x-btn-add",
									scope : this,
									handler : this.add
								}, "-", {
									text : "重置密码",
									iconCls : "x-btn-edit",
									scope : this,
									handler : this.edit
								}, "-", {
									text : "删除",
									iconCls : "x-btn-del",
									scope : this,
									handler : this.del
								}, "-", {
									xtype : "textfield",
									id : 'searcher',
									emptyText : "根据姓名查询"
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
						columns : [sm, {
									header : "姓名",
									width : 100,
									sortable : true,
									dataIndex : "name"
								}, {
									header : "用户名",
									width : 100,
									sortable : true,
									dataIndex : "username"
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
			this.store.reload({
				params : {
					name : Ext.getCmp('searcher').getValue()
				}
			});
		},

		// 新增
		add : function() {
			this.win.setTitle("新增用户");
			Ext.apply(this.currentFormValues, {
						action : 'add'
					});
			this.win.show();
		},

		// 编辑
		edit : function() {
			if (this.grid.getSelectionModel().hasSelection()) {
				var rec = this.grid.getSelectionModel().getSelected();
				var st = this.store;
				alert(rec.data)
				Ext.Ajax.request({
					url : '/ems/user/reset.do',
					method : 'POST',
					params : {
						datas : Ext.encode(rec.data)
					},
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if(o.success){
							Ext.msg.msg('重置成功', o.msg);
							this.store.reload();
						}else{
							Ext.msg.msg('重置成功', o.msg);
						}
					},
					failure : function() {
						Ext.msg.msg('error', '请联系管理员');
					}
				});
			} else {
				Ext.Msg.alert("信息", "请选择要重置密码的用户！");
			}
		},

		// 删除
		del : function() {
			if (this.grid.getSelectionModel().hasSelection()) {
				var st = this.store;
				var recs = this.grid.getSelectionModel().getSelections();
				var names = "";
				for (var i = 0; i < recs.length; i++) {
					names += recs[i].data.name + "<br />";
				}
				Ext.Msg.confirm("确认", "确认删除以下用户？<br />" + names, function(btn) {
							if (btn == "yes") {
								st.remove(recs); // 前台删除
								// st.reload();
							}
						});
			} else {
				Ext.Msg.alert("信息", "请选择要删除的用户！");
			}
		}
	}
}();
