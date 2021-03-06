package com.ems.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ems.pojo.ExtGridReturn;
import com.ems.pojo.ExtPager;
import com.ems.pojo.ExtReturn;
import com.ems.pojo.User;
import com.ems.service.IUserService;

@Controller
@RequestMapping("/user")
public class UserController {
	@Resource
	private IUserService userService;
	
	@RequestMapping("/showUser")
	public String toIndex(HttpServletRequest request,Model model){
		int userId = Integer.parseInt(request.getParameter("id"));
		User u = this.userService.getUserById(userId);
		model.addAttribute("user",u);
		return "main";
	}
	
	@RequestMapping(value = "/login" , method = RequestMethod.POST)
	@ResponseBody
	public Object login(HttpServletRequest request, HttpServletResponse response){
		User uu = JSON.parseObject(request.getParameter("datas"), User.class);
		User u = this.userService.checklogin(uu.getUsername());
		if(u != null){
			if(u.getPassword().equals(uu.getPassword())){
				u.setDel(null);
				u.setPassword(null);
				request.getSession().setAttribute("user", JSON.toJSON(u));
				return new ExtReturn(true,"登录成功");
			}else{
				return new ExtReturn(false,"密码不正确");
			}
		}else{
			return new ExtReturn(false,"用户名不存在");
		}
	}
	
	@RequestMapping(value = "/logout" , method = RequestMethod.POST)
	@ResponseBody
	public ExtReturn logout(HttpServletRequest request, HttpServletResponse response){
		request.getSession().removeAttribute("user");
		return new ExtReturn(true, "成功退出系统");
	}
	
	@RequestMapping(value = "add", method = RequestMethod.POST)
	@ResponseBody
	public Object add(HttpServletRequest request, HttpServletResponse response){
		User u = JSON.parseObject(request.getParameter("datas"), User.class);
		if(this.userService.getTotal(u) > 0){
			return new ExtReturn(false,"用户名已存在");
		}else{
			boolean in = this.userService.insert(u);
			return new ExtReturn(in,"操作成功");
		}
	}
	
	@RequestMapping(value = "reset", method = RequestMethod.POST)
	@ResponseBody
	public Object reset(HttpServletRequest request, HttpServletResponse response){
		User u = JSON.parseObject(request.getParameter("datas"), User.class);
		boolean in = this.userService.reset(u);
		return new ExtReturn(in,"操作成功");
	}
	
	@RequestMapping(value = "getAll", method = RequestMethod.POST)
	@ResponseBody
	public Object getAll(ExtPager pager, HttpServletRequest request){
		User user = new User();
		user.setName(request.getParameter("name"));
		
		int results = this.userService.getTotal(user);
		List<User> rows = this.userService.getItems(pager,user);
		
		return new ExtGridReturn(results, rows);
	}
}
