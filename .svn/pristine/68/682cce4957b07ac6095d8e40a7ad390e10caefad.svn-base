package com.ems.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ems.pojo.Email;
import com.ems.pojo.ExtGridReturn;
import com.ems.pojo.ExtPager;
import com.ems.pojo.ExtReturn;
import com.ems.service.IEmailService;

@Controller
@RequestMapping("/email")
public class EmailController {
	
	@Resource
	private IEmailService service;
	
	@RequestMapping(value = "getAll", method = RequestMethod.POST)
	@ResponseBody
	public Object getAll(ExtPager pager, HttpServletRequest request){
		int results = this.service.getTotal();
		List<Email> rows = this.service.getAll(pager);
		return new ExtGridReturn(results, rows);
	}
	
	@RequestMapping(value = "add", method = RequestMethod.POST)
	@ResponseBody
	public Object add(HttpServletRequest request, HttpServletResponse response){
		Email email = (Email) JSON.parseObject(request.getParameter("datas"), Email.class);
		boolean boo = false;
		if(email.getType().equals("0")){
			if(this.service.hasSender()) {
				return new ExtReturn(false, "发送邮箱只能有一个");
			}else{
				boo = this.service.add(email);
				return new ExtReturn(boo, boo ? "操作成功" : "操作失败");
			}
		}else{
			if(this.service.hasAccount(email)){
				return new ExtReturn(false, "邮箱账号已存在");
			}else{
				boo = this.service.add(email);
				return new ExtReturn(boo, boo ? "操作成功" : "操作失败");
			}
		}
	}
	
	@RequestMapping(value = "update", method = RequestMethod.POST)
	@ResponseBody
	public Object update(HttpServletRequest request, HttpServletResponse response){
		Email email = (Email) JSON.parseObject(request.getParameter("datas"), Email.class);
		boolean boo = false;
		if(email.getType().equals("0")){//要更新的类型为发送邮箱
			if(this.service.getById(email.getId()).getType().equals("0")){//更新前是为发送邮箱
				boo = this.service.update(email);
				return new ExtReturn(boo, boo ? "操作成功" : "操作失败");
			}else{//更新前是接收邮箱
				if(this.service.hasSender()){//检查是否已有发送邮箱
					return new ExtReturn(false, "发送邮箱只能有一个");
				}else{
					if(this.service.hasAccount(email)){
						return new ExtReturn(false, "邮箱账号已存在");
					}else{
						boo = this.service.update(email);
						return new ExtReturn(boo, boo ? "操作成功" : "操作失败");
					}
				}
			}
		}else{//要更新的类型为接收邮箱
			if(this.service.hasAccount(email)){
				return new ExtReturn(false, "邮箱账号已存在");
			}else{
				boo = this.service.update(email);
				return new ExtReturn(boo, boo ? "操作成功" : "操作失败");
			}
		}
	}
	
	@RequestMapping(value = "delete", method = RequestMethod.POST)
	@ResponseBody
	public Object delete(HttpServletRequest request, HttpServletResponse response){
		String[] ids = request.getParameter("datas").split(",");
		boolean boo = this.service.delete(ids);
		return new ExtReturn(boo, boo ? "操作成功" : "操作失败");
	}
	
}
