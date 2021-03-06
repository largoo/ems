<%@ page language="java" contentType="text/html; UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c" %>    
<c:set var="contextPath" value="${pageContext.request.contextPath}"></c:set>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<!--  --><meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8,chrome=1" />
		<meta http-equiv="Content-Type" content="text/html; UTF-8">
		<title>组件设备履历管理系统</title>
		<link rel="stylesheet" type="text/css" href="${contextPath}/extjs/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/extjs/resources/css/xtheme-gray.css" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/extjs/ux/datepickerplus/datepickerplus.css" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/extjs/resources/css/ext-ux.css" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/css/app.css" />
		<link rel="stylesheet" type="text/css" href="${contextPath}/css/msg.css" />
		<script type="text/javascript" src="${contextPath}/extjs/ext-base.js"></script>
		<script type="text/javascript" src="${contextPath}/extjs/ext-all.js"></script>
		<script type="text/javascript" src="${contextPath}/extjs/ext-lang-zh_CN.js"></script>
		<script type="text/javascript" src="${contextPath}/extjs/ux/ColumnHeaderGroup.js"></script>
		<script type="text/javascript" src="${contextPath}/extjs/ux/datepickerplus/DatePickerPlus.js"></script>
		<script type="text/javascript" src="${contextPath}/extjs/ux/SpinnerField.js"></script>
		<script type="text/javascript" src="${contextPath}/extjs/ux/Spinner.js"></script>
		<script type="text/javascript" src="${contextPath}/extjs/ux/DateTimeField.js"></script>
		<script type="text/javascript" src="${contextPath}/extjs/msg.js"></script>
		<script type="text/javascript">var user = ${user}</script>
		<script type="text/javascript" src="${contextPath}/js/main/Main.js"></script>
	</head>
	<body>
		
		<!-- 
    	<div id="header">
			<img src="img/logo.png" class="main-logo" alt="" />
		</div>
		-->
		
		<div id="footer">
			<p id="copyright">Copyright &copy; 2017 东方环晟 组件事业部</p>
		</div>

	</body>
</html>