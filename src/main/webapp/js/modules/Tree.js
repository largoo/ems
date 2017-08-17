/*
 * 收发邮件管理
 */

App.Email = function() {
	return {
		// 定义变量
		currentFormValues : {},

		// 初始化
		render : function(id) {
			this.loadTree(id);
		},
		loadTree : function(id) {
			var panel = Ext.getCmp(id);
			panel.body.dom.innerHTML = "";

			var tree = new Ext.tree.TreePanel({
				
			})
			
			
			
			
			panel.add(tree);
		}
	}
}();
