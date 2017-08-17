package com.ems.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ems.pojo.Equip;
import com.ems.pojo.ExtGridReturn;
import com.ems.pojo.ExtPager;
import com.ems.pojo.ExtReturn;
import com.ems.pojo.User;
import com.ems.service.IEquipService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping("/equip")
public class EquipController {

	@Resource
	private IEquipService service;
	
	@RequestMapping(value="getIds", method=RequestMethod.POST)
	@ResponseBody
	public ExtGridReturn getIds(ExtPager pager, HttpServletRequest request){
		String id = request.getParameter("id");
		Equip e = new Equip();
		if(id != null && !id.trim().equals(""))
			e.setId(id);
		Page<?> page = PageHelper.startPage(pager.getStart()/pager.getLimit()+1, pager.getLimit());
		List<Equip> rows = this.service.getIds(e);
		return new ExtGridReturn((int)page.getTotal(), rows);
	}
	
	@RequestMapping(value="addId", method=RequestMethod.POST)
	@ResponseBody
	public ExtReturn addId(Equip equip, HttpServletRequest request){
		equip.setId(equip.getId().toUpperCase().replaceAll(" ", ""));
		String id = equip.getId();
		User user = JSON.parseObject(request.getSession().getAttribute("user").toString(), User.class);
		if(!this.service.checkId(id)){
			equip.setCreateuserid(user.getId());
			boolean boo = this.service.addId(equip);
			return new ExtReturn(boo, boo ? "操作成功" : "操作失败");
		}else{
			return new ExtReturn(false, "设备唯一名称已存在");
		}
	}
	
	@RequestMapping(value="getInfo", method=RequestMethod.POST)
	@ResponseBody
	public ExtReturn getInfo(Equip equip, HttpServletRequest request){
		Equip e = this.service.getInfo(equip.getId());
		boolean boo = e == null ? false : true;
		return new ExtReturn(boo, boo ? "操作成功" : "操作失败",e);
	}
	
	@RequestMapping(value="updateInfo", method=RequestMethod.POST)
	@ResponseBody
	public ExtReturn updateInfo(HttpServletRequest request){
		Equip equip = JSON.parseObject(request.getParameter("datas"), Equip.class);
		boolean boo = this.service.updateInfo(equip);
		return new ExtReturn(boo, boo ? "操作成功" : "操作失败");
	}
	
	@RequestMapping(value="updateId", method=RequestMethod.POST)
	@ResponseBody
	public ExtReturn updateId(Equip equip, HttpServletRequest request){
		equip.setId(equip.getId().toUpperCase().replaceAll(" ", ""));
		String oid = request.getParameter("oid");
		int idver = Integer.parseInt(request.getParameter("idver"));
		boolean isver = this.service.checkIdVer(idver,oid);
		if(isver){
			boolean ishas = this.service.ishas(equip.getId(), oid);
			if(ishas){
				return new ExtReturn(false, "设备名称已存在");
			}else{
				this.service.updateId(equip.getId(),oid);
				return new ExtReturn(true, "操作成功");
			}
		}else{
			return new ExtReturn(false, "数据已失效，请重新操作");
		}
	}
	
	@RequestMapping(value="deleteId", method=RequestMethod.POST)
	@ResponseBody
	public ExtReturn deleteId(HttpServletRequest request){
		String id = request.getParameter("id");
		boolean boo = this.service.deleteId(id);
		return new ExtReturn(boo, boo ? "操作成功" : "操作失败");
	}
	
	@RequestMapping(value="lock", method=RequestMethod.POST)
	@ResponseBody
	public ExtReturn lock(HttpServletRequest request){
		User user = JSON.parseObject(request.getSession().getAttribute("user").toString(), User.class);
		String id = request.getParameter("id");
		boolean boo = this.service.lock(id,user.getId());
		return new ExtReturn(boo, boo ? "操作成功" : "操作失败");
	}
}
