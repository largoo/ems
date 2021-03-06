package com.ems.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ems.pojo.ExtGridReturn;
import com.ems.pojo.ExtPager;
import com.ems.pojo.ExtReturn;
import com.ems.pojo.Orders;
import com.ems.pojo.User;
import com.ems.service.IEquipService;
import com.ems.service.IOrderService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Controller
@RequestMapping("/order")
public class OrderController {
	
	@Resource
	private IOrderService oser;
	
	@Resource
	private IEquipService eser;
	
	@RequestMapping(value="addOrder",method= RequestMethod.POST)
	@ResponseBody
	@Transactional
	public ExtReturn addOrder(Orders order, HttpServletRequest request){
		User user = JSON.parseObject(request.getSession().getAttribute("user").toString(), User.class);
		order.setCreateuserid(user.getId());
		this.oser.addOrder(order);
		this.eser.updateState(order.getEquipid(),order.getType());
		return new ExtReturn(true, "操作成功");
	}
	
	@RequestMapping(value="getOrder",method= RequestMethod.POST)
	@ResponseBody
	public ExtReturn getOrder(HttpServletRequest request){
		String equipid = request.getParameter("equipid");
		Orders order = this.oser.getOrder(equipid);
		return new ExtReturn(true, "操作成功",order);
	}
	
	@RequestMapping(value="getOrders",method= RequestMethod.POST)
	@ResponseBody
	public ExtGridReturn getOrders(ExtPager pager, HttpServletRequest request){
		String equipid = request.getParameter("equipid");
		Page<?> page = PageHelper.startPage(pager.getStart()/pager.getLimit()+1, pager.getLimit());
		List<Orders> rows = this.oser.getOrders(equipid);
		return new ExtGridReturn((int)page.getTotal(), rows);
	}
	
	@RequestMapping(value="updateOrder",method= RequestMethod.POST)
	@ResponseBody
	@Transactional
	public ExtReturn updateOrder(Orders order, HttpServletRequest request){
		User user = JSON.parseObject(request.getSession().getAttribute("user").toString(), User.class);
		order.setUpdateuserid(user.getId());
		this.oser.updateOrder(order);
		this.eser.updateStateBack(order.getEquipid());
		return new ExtReturn(true, "操作成功");
	}
}
