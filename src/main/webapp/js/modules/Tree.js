/*
 * 收发邮件管理
 */

App.Tree = function() {
	return {
		render : function(id) {
			this.loadTree(id);
		},
		loadTree : function(id) {
			var panel = Ext.getCmp(id);
			panel.body.dom.innerHTML = "";

			var tree = new Ext.tree.TreePanel({
				title : '树',
				animate : true,
				collapsible : true,
				enableDD : true,
				enableDrag : true,
				rootVisible : false,
				autoScroll : true,
				autoHeight : true,
				lines : true,
				loader : new Ext.tree.TreeLoader({dataUrl : '/ems/tree/getTree.do'}),
				root : new Ext.tree.AsyncTreeNode({id:'root',text:'目录',expanded:true})
			})
			
			panel.add(tree);
		}
	}
}();
