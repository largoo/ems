/*
 * 设备基本信息管理
 */

App.Equip = function() {
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
		
		var osearch = '';
		
		var eqid = '';
		
		var eids = [];
			
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
					}, ['eid','id', 'state','idver','sver','islock']),
					listeners : {
						beforeLoad : function(store){
							store.baseParams = {
								start : 0,
								limit : 20,
								id : search,
								eids : eids.toString()
							}
						}
					}
				});
			
		var panel = Ext.getCmp(id);
		panel.body.dom.innerHTML = "";
		
		var sm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});

		var grid = new Ext.grid.GridPanel({
					region : 'center',
					tbar : [{
								text : "新增设备",
								iconCls : "x-btn-add",
								hidden : user.roleid > 0 ? false : true,
								handler : add
							},{
								text : "修改设备名称",
								iconCls : "x-btn-edit",
								hidden : user.roleid > 0 ? false : true,
								handler : editname
							},{
								text : "编辑|查看设备基础信息",
								iconCls : "x-btn-edit",
								hidden : user.roleid > 0 ? false : true,
								handler : edit
							},{
								text : "删除",
								iconCls : "x-btn-del",
								handler : del,
								hidden : user.roleid > 1 ? false : true
							},{
								text : "查看维护记录",
								handler : viewOrder,
								iconCls : "x-btn-disc",
								hidden : user.roleid > 0 ? false : true
							},{
								text : '异常/保养发起',
								handler : changeState,
								iconCls : 'x-btn-add'
							},{
								text : '异常/保养处理',
								handler : changeStateBack,
								iconCls : 'x-btn-check'
							},{
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
							},{
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
					columns : [sm, {dataIndex : 'eid',hidden : true},{
								header : "设备名称",
								width : 150,
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
								header : "idver",
								hidden : true,
								dataIndex : 'idver'
							},{
								header : "sver",
								hidden : true,
								dataIndex : 'sver'
							},{
								header : "归档状态",
								dataIndex : 'islock',
								renderer : function(v){
									if(v == 0){
										return '未归档'
									}else if(v == 1){
										return '已归档'
									}
								}
							}],

					border : false,
					viewConfig : {
						forceFit : true
					},
					listeners : {
						dblclick : viewOrder
					}
				});
		
		var form = new Ext.form.FormPanel({
			width : 1100,
			labelWidth : 120,
			buttonAlign : "center",
			bodyStyle : "padding:10px;",
			frame : true,
			layout : "column",
			items : [{
				layout : 'form',
				columnWidth : .33,
				items : [{
					xtype : "textfield",
					name : "id",
					fieldLabel : "设备名称",
					anchor : "98%",
					readOnly : true
				},{
					xtype : "textfield",
					name : "assetno",
					fieldLabel : "固定资产编号",
					anchor : "98%"
				},{
					xtype : "datefield",
					name : "moveindate",
					format:'Y-m-d',
					fieldLabel : "进厂日期",
					anchor : "98%",
					editable : false
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'hookupfilename',
							fieldLabel : "二次配附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'hookupfilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'hookupfilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '上传',
						onClick : function(){
							addFile('hookup',form.getForm().findField('id').getValue())
						}
					},{
						xtype : 'button',
						text : '清除',
						handler : function(){
							form.getForm().findField('hookupfilename').reset();
							form.getForm().findField('hookupfilesavename').reset();
							form.getForm().findField('hookupfilepath').reset();
						}
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(form.getForm().findField('id').getValue())
							+"&name="+encodeURIComponent(form.getForm().findField('hookupfilename').getValue())
							+"&savename="+encodeURIComponent(form.getForm().findField('hookupfilesavename').getValue())
							+"&path="+encodeURIComponent(form.getForm().findField('hookupfilepath').getValue())
						}
					}]
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'togyfilename',
							fieldLabel : "交付工艺附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'togyfilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'togyfilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '上传',
						onClick : function(){
							addFile('togy',form.getForm().findField('id').getValue())
						}
					},{
						xtype : 'button',
						text : '清除',
						handler : function(){
							form.getForm().findField('togyfilename').reset();
							form.getForm().findField('togyfilesavename').reset();
							form.getForm().findField('togyfilepath').reset();
						}
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(form.getForm().findField('id').getValue())
							+"&name="+encodeURIComponent(form.getForm().findField('togyfilename').getValue())
							+"&savename="+encodeURIComponent(form.getForm().findField('togyfilesavename').getValue())
							+"&path="+encodeURIComponent(form.getForm().findField('togyfilepath').getValue())
						}
					}]
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'fatfilename',
							fieldLabel : "设备FAT附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'fatfilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'fatfilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '上传',
						onClick : function(){
							addFile('fat',form.getForm().findField('id').getValue())
						}
					},{
						xtype : 'button',
						text : '清除',
						handler : function(){
							form.getForm().findField('fatfilename').reset();
							form.getForm().findField('fatfilesavename').reset();
							form.getForm().findField('fatfilepath').reset();
						}
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(form.getForm().findField('id').getValue())
							+"&name="+encodeURIComponent(form.getForm().findField('fatfilename').getValue())
							+"&savename="+encodeURIComponent(form.getForm().findField('fatfilesavename').getValue())
							+"&path="+encodeURIComponent(form.getForm().findField('fatfilepath').getValue())
						}
					}]
				}]
			},{
				layout : 'form',
				columnWidth : .33,
				items : [{
					xtype : "textfield",
					name : "manu",
					fieldLabel : "制造商名称",
					anchor : "98%"
				},{
					xtype : "datefield",
					name : "assetdate",
					format:'Y-m-d',
					fieldLabel : "转固定资产日期",
					anchor : "98%",
					editable : false
				},{
					xtype : "datefield",
					name : "opendate",
					format:'Y-m-d',
					fieldLabel : "开箱日期",
					anchor : "98%",
					editable : false
				},{
					xtype : "datefield",
					name : "locatedate",
					format:'Y-m-d',
					fieldLabel : "设备定位日期",
					anchor : "98%",
					editable : false
				},{
					xtype : "datefield",
					name : "powerondate",
					format:'Y-m-d',
					fieldLabel : "设备PowerOn日期",
					anchor : "98%",
					editable : false
				},{
					xtype : "datefield",
					name : "toproductdate",
					format:'Y-m-d',
					fieldLabel : "设备交付生产日期",
					anchor : "98%",
					editable : false
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : "datefield",
							name : "warrantydatestart",
							format:'Y-m-d',
							fieldLabel : "设备保固期",
							anchor : "99%",
							editable : false
						}]
					},{
						xtype : 'displayfield',
						value : '到'
					},{
						items : [{
							xtype : "datefield",
							name : "warrantydateend",
							format:'Y-m-d',
							anchor : "99%",
							editable : false
						}]
					}]
				}]
			},{
				layout : 'form',
				columnWidth : .33,
				items : [{
					xtype : "textfield",
					name : "model",
					fieldLabel : "型号",
					anchor : "98%"
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'assetfilename',
							fieldLabel : "转固定资产附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'assetfilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'assetfilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '上传',
						onClick : function(){
							addFile('asset',form.getForm().findField('id').getValue())
						}
					},{
						xtype : 'button',
						text : '清除',
						handler : function(){
							form.getForm().findField('assetfilename').reset();
							form.getForm().findField('assetfilesavename').reset();
							form.getForm().findField('assetfilepath').reset();
						}
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(form.getForm().findField('id').getValue())
							+"&name="+encodeURIComponent(form.getForm().findField('assetfilename').getValue())
							+"&savename="+encodeURIComponent(form.getForm().findField('assetfilesavename').getValue())
							+"&path="+encodeURIComponent(form.getForm().findField('assetfilepath').getValue())
						}
					}]
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'openfilename',
							fieldLabel : "设备开箱附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'openfilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'openfilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '上传',
						onClick : function(){
							addFile('open',form.getForm().findField('id').getValue())
						}
					},{
						xtype : 'button',
						text : '清除',
						handler : function(){
							form.getForm().findField('openfilename').reset();
							form.getForm().findField('openfilesavename').reset();
							form.getForm().findField('openfilepath').reset();
						}
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(form.getForm().findField('id').getValue())
							+"&name="+encodeURIComponent(form.getForm().findField('openfilename').getValue())
							+"&savename="+encodeURIComponent(form.getForm().findField('openfilesavename').getValue())
							+"&path="+encodeURIComponent(form.getForm().findField('openfilepath').getValue())
						}
					}]
				},{
					xtype : "datefield",
					name : "hookupdate",
					format:'Y-m-d',
					fieldLabel : "设备二次配完成日期",
					anchor : "98%",
					editable : false
				},{
					xtype : "datefield",
					name : "togy",
					format:'Y-m-d',
					fieldLabel : "设备交付工艺日期",
					anchor : "98%",
					editable : false
				},{
					xtype : "datefield",
					name : "fatdate",
					format:'Y-m-d',
					fieldLabel : "设备FAT日期",
					anchor : "98%",
					editable : false
				}]
			},{
					xtype : 'textfield',
					name : 'ver',
					hidden : true
			}],
			buttons : [{
						text : "确定",
						handler : submit
					}, {
						text : "重置",
						handler : function() {
							form.getForm().reset();
							form.getForm().setValues(currentFormValues);
							form.getForm().clearInvalid();
						}
					},{
						text : '归档',
						hidden : user.roleid > 1 ? false : true,
						handler : function(){
							Ext.Ajax.request({
								url : '/ems/equip/lock.do',
								method : 'POST',
								params : {
									id : form.getForm().getValues().id
								},
								success : function(response) {
									var o = Ext.util.JSON.decode(response.responseText);
									if(o.success){
										Ext.msg.msg('操作成功', o.msg);
										win.hide();
										store.reload();
									}else{
										Ext.msg.msg('操作失败', o.msg);
									}
								},
								failure : function() {
									Ext.msg.msg('error', '请联系管理员');
								}
							});	
						}
					}]
		});	
			
		var win = new Ext.Window({
						width : 1150,
						height : 280,
						title : '编辑设备基础信息',
						plain : true,
						resizable : true,
						frame : true,
						closeAction : "hide",
						border : false,
						modal : true,
						layout : "fit",
						items : [form],
						listeners : {
							render : function(fp) {
								form.form.waitMsgTarget = fp.getEl();
							},
							show : function() {
								form.form.setValues(currentFormValues);
								form.form.clearInvalid();
							}
						}
					});			
			
		var viewform = new Ext.form.FormPanel({
			title : '设备基础信息',
			width : 1100,
			height : 200,
			labelWidth : 120,
			collapsible : true,
			buttonAlign : "center",
			bodyStyle : "padding:10px;",
			frame : true,
			layout : "column",
			items : [{
				layout : 'form',
				columnWidth : .33,
				items : [{
					xtype : "textfield",
					name : "id",
					fieldLabel : "设备名称",
					anchor : "98%",
					readOnly : true
				},{
					xtype : "textfield",
					name : "assetno",
					fieldLabel : "固定资产编号",
					anchor : "98%",
					readOnly : true
				},{
					xtype : "datefield",
					name : "moveindate",
					format:'Y-m-d',
					fieldLabel : "进厂日期",
					anchor : "98%",
					readOnly : true
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'hookupfilename',
							fieldLabel : "二次配附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'hookupfilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'hookupfilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(viewform.getForm().findField('id').getValue())
							+"&name="+encodeURIComponent(viewform.getForm().findField('hookupfilename').getValue())
							+"&savename="+encodeURIComponent(viewform.getForm().findField('hookupfilesavename').getValue())
							+"&path="+encodeURIComponent(viewform.getForm().findField('hookupfilepath').getValue())
						}
					}]
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'togyfilename',
							fieldLabel : "交付工艺附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'togyfilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'togyfilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(viewform.getForm().findField('id').getValue())
							+"&name="+encodeURIComponent(viewform.getForm().findField('togyfilename').getValue())
							+"&savename="+encodeURIComponent(viewform.getForm().findField('togyfilesavename').getValue())
							+"&path="+encodeURIComponent(viewform.getForm().findField('togyfilepath').getValue())
						}
					}]
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'fatfilename',
							fieldLabel : "设备FAT附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'fatfilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'fatfilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(viewform.getForm().findField('id').getValue())
							+"&name="+encodeURIComponent(viewform.getForm().findField('fatfilename').getValue())
							+"&savename="+encodeURIComponent(viewform.getForm().findField('fatfilesavename').getValue())
							+"&path="+encodeURIComponent(viewform.getForm().findField('fatfilepath').getValue())
						}
					}]
				}]
			},{
				layout : 'form',
				columnWidth : .33,
				items : [{
					xtype : "textfield",
					name : "manu",
					fieldLabel : "制造商名称",
					anchor : "98%",
					readOnly : true
				},{
					xtype : "datefield",
					name : "assetdate",
					format:'Y-m-d',
					fieldLabel : "转固定资产日期",
					anchor : "98%",
					readOnly : true
				},{
					xtype : "datefield",
					name : "opendate",
					format:'Y-m-d',
					fieldLabel : "开箱日期",
					anchor : "98%",
					readOnly : true
				},{
					xtype : "datefield",
					name : "locatedate",
					format:'Y-m-d',
					fieldLabel : "设备定位日期",
					anchor : "98%",
					readOnly : true
				},{
					xtype : "datefield",
					name : "powerondate",
					format:'Y-m-d',
					fieldLabel : "设备PowerOn日期",
					anchor : "98%",
					readOnly : true
				},{
					xtype : "datefield",
					name : "toproductdate",
					format:'Y-m-d',
					fieldLabel : "设备交付生产日期",
					anchor : "98%",
					readOnly : true
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : "datefield",
							name : "warrantydatestart",
							format:'Y-m-d',
							fieldLabel : "设备保固期",
							anchor : "99%",
							readOnly : true
						}]
					},{
						xtype : 'displayfield',
						value : '到'
					},{
						items : [{
							xtype : "datefield",
							name : "warrantydateend",
							format:'Y-m-d',
							anchor : "99%",
							readOnly : true
						}]
					}]
				}]
			},{
				layout : 'form',
				columnWidth : .33,
				items : [{
					xtype : "textfield",
					name : "model",
					fieldLabel : "型号",
					anchor : "98%",
					readOnly : true
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'assetfilename',
							fieldLabel : "转固定资产附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'assetfilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'assetfilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(viewform.getForm().findField('id').getValue())
							+"&name="+encodeURIComponent(viewform.getForm().findField('assetfilename').getValue())
							+"&savename="+encodeURIComponent(viewform.getForm().findField('assetfilesavename').getValue())
							+"&path="+encodeURIComponent(viewform.getForm().findField('assetfilepath').getValue())
						}
					}]
				},{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'openfilename',
							fieldLabel : "设备开箱附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'openfilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'openfilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(viewform.getForm().findField('id').getValue())
							+"&name="+encodeURIComponent(viewform.getForm().findField('openfilename').getValue())
							+"&savename="+encodeURIComponent(viewform.getForm().findField('openfilesavename').getValue())
							+"&path="+encodeURIComponent(viewform.getForm().findField('openfilepath').getValue())
						}
					}]
				},{
					xtype : "datefield",
					name : "hookupdate",
					format:'Y-m-d',
					fieldLabel : "设备二次配完成日期",
					anchor : "98%",
					readOnly : true
				},{
					xtype : "datefield",
					name : "togy",
					format:'Y-m-d',
					fieldLabel : "设备交付工艺日期",
					anchor : "98%",
					readOnly : true
				},{
					xtype : "datefield",
					name : "fatdate",
					format:'Y-m-d',
					fieldLabel : "设备FAT日期",
					anchor : "98%",
					readOnly : true
				}]
			},{
					xtype : 'textfield',
					name : 'ver',
					hidden : true
			}]
		});	
		
		var viewwin = new Ext.Window({
						width : 1150,
						height : 280,
						title : "查看设备基础信息",
						plain : true,
						resizable : true,
						frame : true,
						closeAction : "hide",
						border : false,
						modal : true,
						layout : "fit",
						items : [viewform],
						listeners : {
							render : function(fp) {
								viewform.form.waitMsgTarget = fp.getEl();
							},
							show : function() {
								viewform.form.setValues(currentFormValues);
								viewform.form.clearInvalid();
							}
						}
					});	
			
		//panel.add(grid);
			
		function submit(){
			var fr = form.getForm(); // 获取BasicForm对象
			if (fr.isValid()) {
				var l = fr.getValues();
				Ext.Ajax.request({
					url : '/ems/equip/updateInfo.do',
					method : 'POST',
					params : {
						datas : Ext.encode(l)
					},
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if(o.success){
							Ext.msg.msg('操作成功', o.msg);
							win.hide();
							store.reload();
						}else{
							Ext.msg.msg('操作失败', o.msg);
						}
					},
					failure : function() {
						Ext.msg.msg('error', '请联系管理员');
					}
				});	
			}
		}
		
		function editname(){
			var form = new Ext.form.FormPanel({
				url : '/ems/equip/updateId.do',
				method : 'POST',
				width : 600,
				height : 180,
				buttonAlign : "center",
				bodyStyle : "padding:10px;",
				frame : true,
				items : [{
					xtype : 'textfield',
					name : 'id',
					id : 'equip_id_for_uppercase_UPDATE',
					fieldLabel : '设备名称',
					anchor : "98%",
					allowBlank : false,
					enableKeyEvents:true,
					listeners : {
						keyup : function(){
							Ext.getCmp('equip_id_for_uppercase_UPDATE').setValue(Ext.getCmp('equip_id_for_uppercase_UPDATE').getValue().toUpperCase().replace(/\s/g, ""))
						}
					},
					value : sm.getSelected().data.id
				},{
					xtype : 'displayfield',
					fieldLabel : '示例',
					value : 'ZG-YX-108-层压机#1(名称唯一)'
				},{
					xtype : 'textfield',
					name : 'oid',
					hidden : true,
					value : sm.getSelected().data.id
				},{
					xtype : 'textfield',
					name : 'idver',
					hidden : true,
					value : sm.getSelected().data.idver
				}],
				buttons : [{
					text : '提交',
					onClick : function(){
						if(form.form.isValid()){
							var fr = form.getForm().getValues();
							if(fr.id == fr.oid){
								Ext.msg.msg("", "名称没有修改");
								return
							}
							form.getForm().submit({
								waitMsg : '操作中...',
								success : function(form, action){
									var o = Ext.util.JSON.decode(action.response.responseText);
									if(o.success){
										Ext.msg.msg("操作成功", o.msg);
										win.close();
										eids = [];
										store.reload();
										tree.getRootNode().reload();
										tree.expandAll();
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
				height : 210,
				title : "修改设备名称",
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
			if(null == tree.getSelectionModel().getSelectedNode()){
				Ext.Msg.alert("信息", "未选择树节点");
				return;
			}
			
			var node = tree.getSelectionModel().getSelectedNode();
			if(node.attributes.eid){
				Ext.Msg.alert("信息", "不能选择设备节点");
				return;
			}
			
			var form = new Ext.form.FormPanel({
				url : '/ems/equip/addId.do',
				method : 'POST',
				width : 600,
				height : 180,
				buttonAlign : "center",
				bodyStyle : "padding:10px;",
				frame : true,
				items : [{
					xtype : 'textfield',
					name : 'pid',
					hidden : true,
					value : node.attributes.id
				},{
					xtype : 'displayfield',
					fieldLabel : '设备分类',
					value : node.attributes.text
				},{
					xtype : 'textfield',
					name : 'id',
					id : 'equip_id_for_uppercase',
					fieldLabel : '设备名称',
					anchor : "98%",
					allowBlank : false,
					enableKeyEvents:true,
					listeners : {
						keyup : function(){
							Ext.getCmp('equip_id_for_uppercase').setValue(Ext.getCmp('equip_id_for_uppercase').getValue().toUpperCase().replace(/\s/g, ""))
						}
					}
				},{
					xtype : 'displayfield',
					fieldLabel : '示例',
					value : 'ZG-YX-108-层压机#1(名称唯一)'
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
										eids = [];
										store.reload();
										tree.getRootNode().reload();
										tree.expandAll();
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
				height : 210,
				title : "新增设备",
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
		
		function edit(){
			if (grid.getSelectionModel().hasSelection()) {
				var rec = grid.getSelectionModel().getSelected();
				Ext.Ajax.request({
					url : '/ems/equip/getInfo.do',
					method : 'POST',
					params : {
						id : rec.data.id
					},
					success : function(response) {
						var o = Ext.util.JSON.decode(response.responseText);
						if(o.success){
							Ext.apply(currentFormValues, o.o);
							if(rec.data.islock == 1 && user.roleid < 2){
								viewwin.show();
							}else{
								win.show();
							}
						}else{
							Ext.msg.msg('拉取信息失败', o.msg);
						}
					},
					failure : function() {
						Ext.msg.msg('error', '请联系管理员');
					}
				});	
			} else {
				Ext.Msg.alert("信息", "请选择要编辑|查看的设备！");
			}
		}
			
		function viewOrder(){
			if(!sm.hasSelection()){
				Ext.msg.msg("","请先选中设备")
				return
			}
			var fv = sm.getSelected().data;	
			var store = new Ext.data.Store({
				remoteSort : true,
				autoLoad : true,
				proxy : new Ext.data.HttpProxy({ // 获取数据的方式
					method : 'POST',
					url : '/ems/order/getOrders.do'
				}),
				reader : new Ext.data.JsonReader({ // 数据读取器
					totalProperty : 'results',
					// 记录总数
					root : 'rows' // Json中的列表数据根节点
				}, ['id', 'equipid','starttime','type','illustrate','solution','endtime','replaces'
				,'remark','updateuserid','state','ver','user','handlefilename','handlefilesavename','handlefilepath']),
				listeners : {
					beforeLoad : function(store){
						store.baseParams = {
							start : 0,
							limit : 20,
							equipid : fv.id
						}
					}
				}
			});
		
			var vsm = new Ext.grid.CheckboxSelectionModel({singleSelect : true});
				
			var vgrid = new Ext.grid.GridPanel({
						title : '设备维护记录',
						height : 400,
						autoScroll : true,
						width : 1100,
						tbar : [{
									xtype :'button',
									text : '查看明细',
									iconCls : "x-btn-disc",
									handler : viewvform
								}, {
									xtype : "button",
									text : "刷新",
									iconCls : "x-btn-search",
									handler : function(){
										store.reload()
									}
								}],
						bbar : new Ext.PagingToolbar({
									store : store,
									pageSize : 20,
									displayInfo : true
								}),
	
						store : store,
						sm : vsm,
						columns : [vsm,{
									header : "id",
									hidden : true,
									dataIndex : "id"
								},{
									header : 'equipid',
									hidden : true,
									dataIndex : 'equipid'
								},{
									header : 'createuserid',
									hidden : true,
									dataIndex : 'createuserid'
								},{
									header : 'updateuserid',
									hidden : true,
									dataIndex : 'updateuserid'
								},{
									header : 'ver',
									hidden : true,
									dataIndex : 'ver'
								},{
									hidden : true,
									dataIndex : 'handlefilename'
								},{
									hidden : true,
									dataIndex : 'handlefilesavename'
								},{
									hidden : true,
									dataIndex : 'handlefilepath'
								},{
									header : "日期",
									width : 60,
									renderer : function(v,c,r){
										if(r.data.starttime){
											return new Date(r.data.starttime).format("Y-m-d");
										}else{
											return null;
										}
									}	
								},{
									dataIndex : 'state',
									header : '状态',
									width : 40,
									renderer : function(v){
										if(v==0){
											return "<span style='color:orange;font-weight:bold;'>处理中</span>"
										}else if(v == 1){
											return "<span style='color:green;font-weight:bold;'>已完成</span>"
										}
									}
								},{
									dataIndex : 'type',
									header : '类型',
									width : 30,
									renderer : function(v){
										if(v==2){
											return "<span style='color:red;font-weight:bold;'>异常</span>"
										}else if(v == 1){
											return "<span style='color:orange;font-weight:bold;'>保养</span>"
										}
									}
								},{
									header : '异常情况说明',
									dataIndex : 'illustrate',
									renderer: function(value, meta, record) {
                                    	meta.attr = 'style="white-space:normal;"';   
                                        return value;   
                                     }	
								},{
									header : '处理措施记录',
									dataIndex : 'solution'
								},{
									header : "发生时间",
									dataIndex : 'starttime',
									width : 90,
									renderer : function(v){
										if(v){
											return new Date(v).format("Y-m-d H:i:s");
										}else{
											return null;
										}
									}	
								},{
									header : "完工时间",
									dataIndex : 'endtime',
									width : 90,
									renderer : function(v){
										if(v){
											return new Date(v).format("Y-m-d H:i:s");
										}else{
											return null;
										}
									}	
								},{
									header : '更换备件名称及型号',
									dataIndex : 'replaces'
								},{
									header : '备注',
									dataIndex : 'remark'
								},{
									header : "处理者",
									width : 40,
									renderer : function(v,c,r){
										if(r.data.user){
											return r.data.user.name
										}else{
											return null
										}
									}
								}],
	
						border : false,
						viewConfig : {
							forceFit : true
						},
						listeners : {
							'dblClick' : viewvform
						}
					});			

			Ext.Ajax.request({
				url : '/ems/equip/getInfo.do',
				method : 'POST',
				params : {
					id : fv.id
				},
				success : function(response) {
					var o = Ext.util.JSON.decode(response.responseText);
					if(o.success){
						Ext.apply(currentFormValues, o.o);
						win.show();
					}else{
						Ext.msg.msg('拉取信息失败', o.msg);
					}
				},
				failure : function() {
					Ext.msg.msg('error', '请联系管理员');
				}
			});			
					
			var win = new Ext.Window({
				autoWidth : true,
				height : 630,
				title : "查看设备基础信息",
				autoScroll : true,
				plain : true,
				resizable : true,
				frame : true,
				closeAction : "hide",
				border : false,
				modal : true,
				layout : "form",
				items : [viewform,vgrid],
				listeners : {
					render : function(fp) {
						viewform.form.waitMsgTarget = fp.getEl();
					},
					show : function() {
						viewform.form.setValues(currentFormValues);
						viewform.form.clearInvalid();
					}
				}
			})
			
			var vform = new Ext.form.FormPanel({
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
					readOnly : true
				},{
		            xtype: 'displayfield',
		            fieldLabel: '类型',
		            name : 'type',
		            anchor : "98%",
					readOnly : true
		        },{
		        	xtype : 'textarea',
					name : 'illustrate',
					fieldLabel : '情况说明',
					anchor : "98%",
					height : 150,
					readOnly : true
		        },{
		        	xtype : 'textarea',
					name : 'solution',
					fieldLabel : '处理措施记录',
					anchor : "98%",
					height : 150,
					readOnly : true
		        },{
		        	xtype : 'textarea',
					name : 'replaces',
					fieldLabel : '更换备件名称及型号记录',
					anchor : "98%",
					height : 150,
					readOnly : true
		        },{
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'handlefilename',
							fieldLabel : "处理附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'handlefilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'handlefilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(vform.getForm().findField('equipid').getValue())
							+"&name="+encodeURIComponent(vform.getForm().findField('handlefilename').getValue())
							+"&savename="+encodeURIComponent(vform.getForm().findField('handlefilesavename').getValue())
							+"&path="+encodeURIComponent(vform.getForm().findField('handlefilepath').getValue())
						}
					}]
				},{
		        	xtype : 'textarea',
					name : 'remark',
					fieldLabel : '备注',
					anchor : "98%",
					height : 150,
					readOnly : true
		        }]
			})
			
			function viewvform(){
				if(!vsm.hasSelection()){
					Ext.msg.msg("","请先选择一条维护记录")
					return
				}
				var win = new Ext.Window({
					width : 610,
					autoHeight : true,
					title : "查看设备维护记录明细信息",
					plain : true,
					resizable : true,
					frame : true,
					closeAction : "hide",
					border : false,
					modal : true,
					items : [vform],
					listeners : {
						render : function(fp) {
							vform.form.waitMsgTarget = fp.getEl();
						},
						show : function() {
							var da = vsm.getSelected().data;
							if(da.type == 1){
								da.type = '保养'
							}else if(da.type == 2){
								da.type = '异常'
							}
							vform.form.setValues(da);
							vform.form.clearInvalid();
						}
					},
					buttons : [{
						text : '关闭',
						handler : function(){
							win.hide();
						}
					}]
				})
				win.show()
			}
		}	
		
		function del(){
			if (grid.getSelectionModel().hasSelection()) {
				var names = sm.getSelected().data.id;
				Ext.Msg.confirm("确认", "确认删除以下设备？<br />" + names, function(btn) {
							if (btn == "yes") {
								Ext.Ajax.request({
									url : '/ems/equip/deleteId.do',
									method : 'POST',
									params : {
										id : names
									},
									success : function(response) {
										var o = Ext.util.JSON.decode(response.responseText);
										if(o.success){
											store.reload();
											tree.getRootNode().reload();
											tree.expandAll();
										}else{
											Ext.msg.msg('操作成功', o.msg);
										}
									},
									failure : function() {
										Ext.msg.msg('error', '请联系管理员');
									}
								});	
							}
						});
			} else {
				Ext.Msg.alert("信息", "请选择要删除的设备！");
			}
		}
			
		function addFile(type,id,ff){
			var f = form;
			var fileform = new Ext.form.FormPanel({
				url : '/ems/file/upload.do?F_FileType='+type+'&F_FileOfId='+encodeURIComponent(id),
				method : 'POST',
				width : 600,
				fileUpload: true,
				frame : true,
				height : 200,
				buttonAlign : "center",
				layout : 'column',
				items : [{
					xtype : 'textfield',
					name : 'fileupload',
					inputType : 'file',
					fieldLabel : '文件上传'
				}],
				buttons : [{
					text : '提交',
					onClick : function(){
						fileform.getForm().submit({
							waitMsg : 'uploading...',
							success : function(form,action){
								var o = Ext.util.JSON.decode(action.response.responseText);
								if(type == 'hookup'){
									f.getForm().findField('hookupfilename').setValue(o.o.name)
									f.getForm().findField('hookupfilesavename').setValue(o.o.savename);
									f.getForm().findField('hookupfilepath').setValue(o.o.path);
								}else if(type == 'togy'){
									f.getForm().findField('togyfilename').setValue(o.o.name)
									f.getForm().findField('togyfilesavename').setValue(o.o.savename);
									f.getForm().findField('togyfilepath').setValue(o.o.path);
								}else if(type == 'fat'){
									f.getForm().findField('fatfilename').setValue(o.o.name)
									f.getForm().findField('fatfilesavename').setValue(o.o.savename);
									f.getForm().findField('fatfilepath').setValue(o.o.path);
								}else if(type == 'open'){
									f.getForm().findField('openfilename').setValue(o.o.name)
									f.getForm().findField('openfilesavename').setValue(o.o.savename);
									f.getForm().findField('openfilepath').setValue(o.o.path);
								}else if(type == 'asset'){
									f.getForm().findField('assetfilename').setValue(o.o.name)
									f.getForm().findField('assetfilesavename').setValue(o.o.savename);
									f.getForm().findField('assetfilepath').setValue(o.o.path);
								}else if(type == 'handle'){
									ff.getForm().findField('handlefilename').setValue(o.o.name)
									ff.getForm().findField('handlefilesavename').setValue(o.o.savename);
									ff.getForm().findField('handlefilepath').setValue(o.o.path);
								}
								filewin.close();
							}
						})
					}
				}]
			})
			
			var filewin = new Ext.Window({
				width : 600,
				height : 210,
				title : "文件上传",
				plain : true,
				resizable : false,
				frame : true,
				closeAction : "close",
				border : false,
				modal : true,
				layout : "fit",
				items : [fileform]
			})
			
			filewin.show();
			
		}
		
		var tree = new Ext.tree.TreePanel({
			region : 'west',
			//title : '树',
			//autoHeight : true,
			width : 400,
			frame : true,
			animate : true,
			collapsible : true,
			//enableDD : true,
			//enableDrag : true,
			rootVisible : true,
			autoScroll : true,
			lines : true,
			loader : new Ext.tree.TreeLoader({dataUrl : '/ems/tree/getTree.do'}),
			root : new Ext.tree.AsyncTreeNode({id:'root',text:'设备目录',expanded:true}),
			listeners : {
				'contextmenu' : function(node,e){
					var menu = new Ext.menu.Menu({
						items : [{
							text : '刷新',
							handler : function(){
								tree.getRootNode().reload();
								tree.expandAll();
							}
						}]
					});
					menu.showAt(e.getPoint());
				},
				'click' : function(node,e){
					eids = [];
					if(node.attributes.eid){
						eids.push(node.attributes.eid);
					}else{
						findChild(node);
					}
					store.reload();
				},
				'expandnode' : function(node){
					if(node.attributes.state == 1){
						node.setText("<font color=orange>"+node.text+"</font>");
					}else if(node.attributes.state == 2){
						node.setText("<font color=red>"+node.text+"</font>");
					}
				}
			}
		});
		
		findChild = function(node){
			node.eachChild(function(n){
				if(n.attributes.eid){
					eids.push(n.attributes.eid);
				}else{
					findChild(n)
				}
			})
		};
		
		optTree = function(node,action){
			var form = new Ext.form.FormPanel({
				url : '/ems/tree/optTree.do',
				method : 'POST',
				width : 600,
				height : 180,
				buttonAlign : "center",
				bodyStyle : "padding:10px;",
				frame : true,
				items : [{
					xtype : 'textfield',
					name : 'id',
					id : 'equip_id_for_uppercase',
					fieldLabel : '设备名称',
					anchor : "98%",
					allowBlank : false,
					enableKeyEvents:true,
					listeners : {
						keyup : function(){
							Ext.getCmp('equip_id_for_uppercase').setValue(Ext.getCmp('equip_id_for_uppercase').getValue().toUpperCase().replace(/\s/g, ""))
						}
					}
				},{
					xtype : 'displayfield',
					fieldLabel : '示例',
					value : 'ZG-YX-108-层压机#1(名称唯一)'
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
			});

			var win = new Ext.Window({
				width : 600,
				height : 210,
				title : "新增设备",
				plain : true,
				resizable : false,
				frame : true,
				closeAction : "close",
				border : false,
				modal : true,
				layout : "fit",
				items : [form]
			});
			
			win.show();
		}
		
		function addToTree(){
			if(!sm.hasSelection()){
				Ext.Msg.alert("信息", "未选择设备");
				return;
			}
			if(null == tree.getSelectionModel().getSelectedNode()){
				Ext.Msg.alert("信息", "未选择树节点");
				return;
			}
			
			var node = tree.getSelectionModel().getSelectedNode();
			var records = sm.getSelections();
			
			var equips = [];
			for(i=0;i <records.length;i++){
				equips.push(records[i].data)
			}
			
			Ext.Ajax.request({
				url : '/ems/tree/addToTree.do',
				method : 'POST',
				params : {
					equips : Ext.encode(equips),
					pid : node.attributes.id
				},
				success : function(response) {
					var o = Ext.util.JSON.decode(response.responseText);
					if(o.success){
						Ext.msg.msg('操作成功', o.msg);
						tree.getRootNode().reload();
						tree.expandAll();
					}else{
						Ext.msg.msg('操作失败', o.msg);
					}
				},
				failure : function() {
					Ext.msg.msg('error', '请联系管理员');
				}
			});	
			
		}
		
		tree.expandAll();
		
		function changeState(){
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
		        	xtype : 'datetimefield',
		        	name : 'starttime',
		        	fieldLabel : '时间',
		        	anchor : '98%',
		        	editable : false
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
										tree.getRootNode().reload();
										tree.expandAll();
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
		};
		
		function changeStateBack(){
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
		        	name : 'starttime',
		        	anchor : '98%',
		        	fieldLabel : '开始时间'
		        },{
		        	xtype : 'datetimefield',
		        	name : 'endtime',
		        	anchor : '98%',
		        	editable : false,
		        	fieldLabel : '处理时间'
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
					layout : 'column',
					items : [{
						layout : 'form',
						items : [{
							xtype : 'textfield',
							name : 'handlefilename',
							fieldLabel : "处理附档",
							readOnly : true
						}]
					},{
						xtype : 'textfield',
						name : 'handlefilesavename',
						hidden : true
					},{
						xtype : 'textfield',
						name : 'handlefilepath',
						hidden : true
					},{
						xtype : 'button',
						text : '上传',
						onClick : function(){
							addFile('handle',form.getForm().findField('id').getValue(),form)
						}
					},{
						xtype : 'button',
						text : '清除',
						handler : function(){
							form.getForm().findField('handlefilename').reset();
							form.getForm().findField('handlefilesavename').reset();
							form.getForm().findField('handlefilepath').reset();
						}
					},{
						xtype : 'button',
						text : '下载',
						handler : function(){
							window.location.href = "/ems/file/download.do?id="+encodeURIComponent(form.getForm().findField('id').getValue())
							+"&name="+encodeURIComponent(form.getForm().findField('handlefilename').getValue())
							+"&savename="+encodeURIComponent(form.getForm().findField('handlefilesavename').getValue())
							+"&path="+encodeURIComponent(form.getForm().findField('handlefilepath').getValue())
						}
					}]
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
										tree.getRootNode().reload();
										tree.expandAll();
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
							type : o.o.type == 1 ? '保养' : '异常',
							id : o.o.id,
							ver : o.o.ver,
							starttime : o.o.starttime
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
		};
		
		var p = new Ext.Panel({
			layout : 'border',
			items : [tree,grid]
		});
		
		panel.add(p)
		
		}
	}
}();
