/*
 * 设备工单管理
 */

App.Order = function() {
	return {
		// 初始化
		render : function(id) {
			this.loadPanel(id);
		},
		// 创建Grid
		loadPanel : function(id) {
			// 定义变量
		var currentFormValues = {};
		
		var file = {};
		
		var search = '';
			
		var store = new Ext.data.Store({
					remoteSort : true,
					autoLoad : true,
					proxy : new Ext.data.HttpProxy({ // 获取数据的方式
						method : 'POST',
						url : '/ems/equip/getIds.do'
					}),
					reader : new Ext.data.JsonReader({ // 数据读取器
						totalProperty : 'results',
						// 记录总数
						root : 'rows' // Json中的列表数据根节点
					}, ['id', 'state','sver']),
					listeners : {
						beforeLoad : function(store){
							store.baseParams = {
								start : 0,
								limit : 20,
								id : search
							}
						}
					}
				});
			
		var panel = Ext.getCmp(id);
		panel.body.dom.innerHTML = "";
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});

		var grid = new Ext.grid.GridPanel({
					tbar : [{
								text : "异常/保养",
								iconCls : "x-btn-add",
								handler : add
							}, "-", {
								text : "处理",
								iconCls : "x-btn-edit",
								handler : edit,
								hidden : user.roleid > 0 ? false : true
							}, "-", {
								xtype : "textfield",
								id : 'search_equip',
								emptyText : "根据名称查询",
								enableKeyEvents:true,
								listeners : {
									keyup : function(){
										search = Ext.getCmp('search_equip').getValue();
										store.reload()
									}
								}
							}, {
								xtype : "button",
								text : "查询",
								iconCls : "x-btn-search",
								handler : function(){
									search = Ext.getCmp('search_equip').getValue();
									store.reload()
								}
							}],
					bbar : new Ext.PagingToolbar({
								store : store,
								pageSize : 20,
								displayInfo : true
							}),

					store : store,
					sm : sm,
					columns : [sm, {
								header : "设备名称",
								width : 100,
								sortable : true,
								dataIndex : "id"
							},{
								dataIndex : 'state',
								width : 20,
								header : '状态',
								renderer : function(v){
									if(v==0){
										return "<span style='color:green;font-weight:bold;'>正常</span>"
									}else if(v == 1){
										return "<span style='color:orange;font-weight:bold;'>保养</span>"
									}else if(v==2){
										return "<span style='color:red;font-weight:bold;'>异常</span>"
									}
								}
							},{
								header : "sver",
								hidden : true,
								dataIndex : 'sver'
							}],

					border : false,
					viewConfig : {
						forceFit : true
					}
				});
					
		panel.add(grid);
			
		function edit(){
			if(!sm.hasSelection()){
				Ext.msg.msg("","请先选中相应设备")
				return
			}
			if(sm.getSelected().data.state == 0){
				Ext.msg.msg("","设备无需处理")
				return
			}
			var form = new Ext.form.FormPanel({
				url : '/ems/order/updateOrder.do',
				method : 'POST',
				width : 600,
				height : 700,
				buttonAlign : "center",
				bodyStyle : "padding:10px;",
				frame : true,
				items : [{
					xtype : 'textfield',
					name : 'equipid',
					fieldLabel : '设备名称',
					anchor : "98%",
					value : sm.getSelected().data.id,
					readOnly : true
				},{
		            xtype: 'displayfield',
		            fieldLabel: '类型',
		            name : 'type',
		            anchor : "98%"
		        },{
		        	xtype : 'displayfield',
					name : 'illustrate',
					fieldLabel : '情况说明',
					anchor : "98%"
		        },{
		        	xtype : 'textarea',
					name : 'solution',
					fieldLabel : '处理措施记录',
					anchor : "98%",
					height : 170
		        },{
		        	xtype : 'textarea',
					name : 'replaces',
					fieldLabel : '更换备件名称及型号记录',
					anchor : "98%",
					height : 170
		        },{
		        	xtype : 'textarea',
					name : 'remark',
					fieldLabel : '备注',
					anchor : "98%",
					height : 170
		        },{
		        	xtype : 'textfield',
		        	name : 'sver',
		        	hidden : true,
		        	value : sm.getSelected().data.sver
		        },{
		        	xtype : 'textfield',
		        	name : 'ver',
		        	hidden : true
		        },{
		        	xtype : 'textfield',
		        	name : 'id',
		        	hidden : true
		        }],
				buttons : [{
					text : '提交',
					onClick : function(){
						if(form.form.isValid()){
							form.getForm().submit({
								waitMsg : '操作中...',
								success : function(form, action){
									var o = Ext.util.JSON.decode(action.response.responseText);
									if(o.success){
										Ext.msg.msg("操作成功", o.msg);
										win.close();
										store.reload();
									}else{
										Ext.msg.msg("操作失败", o.msg);
									}
								},
								failure : function(form, action) {
									var o = Ext.util.JSON.decode(action.response.responseText);
									Ext.msg.msg("操作失败", o.msg);
								}
							})
						}
					}
				}]
			})
			
			Ext.Ajax.request({
				url : '/ems/order/getOrder.do',
				method : 'POST',
				params : {
					equipid : sm.getSelected().data.id
				},
				success : function(response) {
					var o = Ext.util.JSON.decode(response.responseText);
					if(o.success){
						form.getForm().setValues({
							illustrate : o.o.illustrate,
							type : o.o.type == 1 ? '异常' : '保养',
							id : o.o.id,
							ver : o.o.ver
						})
					}else{
						Ext.msg.msg('拉取信息失败', o.msg);
						return
					}
				},
				failure : function() {
					Ext.msg.msg('error', '请联系管理员');
					return
				}
			});	
			
			var win = new Ext.Window({
				width : 600,
				height : 710,
				title : "异常/保养处理",
				plain : true,
				resizable : false,
				frame : true,
				closeAction : "close",
				border : false,
				modal : true,
				layout : "fit",
				items : [form]
			})
			
			win.show();
		}

		function add(){
			if(!sm.hasSelection()){
				Ext.msg.msg("","请先选中相应设备")
				return
			}
			if(sm.getSelected().data.state != 0){
				Ext.msg.msg("","设备维护中")
				return
			}
			var form = new Ext.form.FormPanel({
				url : '/ems/order/addOrder.do',
				method : 'POST',
				width : 600,
				height : 600,
				buttonAlign : "center",
				bodyStyle : "padding:10px;",
				frame : true,
				items : [{
					xtype : 'textfield',
					name : 'equipid',
					fieldLabel : '设备名称',
					anchor : "98%",
					value : sm.getSelected().data.id,
					readOnly : true
				},{
		            xtype: 'radiogroup',
		            fieldLabel: '类型',
		            items: [
		                {boxLabel: '异常', name: 'type', inputValue: 2},
		                {boxLabel: '保养', name: 'type', inputValue: 1}
		            ],
		            allowBlank : false,
		            anchor : "98%"
		        },{
		        	xtype : 'textarea',
					name : 'illustrate',
					fieldLabel : '情况说明',
					anchor : "98%",
					height : 400
		        }],
				buttons : [{
					text : '提交',
					onClick : function(){
						if(form.form.isValid()){
							form.getForm().submit({
								waitMsg : '操作中...',
								success : function(form, action){
									var o = Ext.util.JSON.decode(action.response.responseText);
									if(o.success){
										Ext.msg.msg("操作成功", o.msg);
										win.close();
										store.reload();
									}else{
										Ext.msg.msg("操作失败", o.msg);
									}
								},
								failure : function(form, action) {
									var o = Ext.util.JSON.decode(action.response.responseText);
									Ext.msg.msg("操作失败", o.msg);
								}
							})
						}
					}
				}]
			})
			
			var win = new Ext.Window({
				width : 600,
				height : 610,
				title : "异常/保养",
				plain : true,
				resizable : false,
				frame : true,
				closeAction : "close",
				border : false,
				modal : true,
				layout : "fit",
				items : [form]
			})
			
			win.show();
		}
		
		}
	}
}();
