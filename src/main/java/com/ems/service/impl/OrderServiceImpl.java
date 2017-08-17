package com.ems.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ems.dao.OrdersMapper;
import com.ems.pojo.Orders;
import com.ems.service.IOrderService;

@Service
public class OrderServiceImpl implements IOrderService {

	@Resource
	private OrdersMapper dao;

	@Override
	public boolean addOrder(Orders order) {
		return dao.insertSelective(order) == 1 ? true : false;
	}

	@Override
	public Orders getOrder(String equipid) {
		return dao.getMaxIdOrder(equipid);
	}

	@Override
	public boolean updateOrder(Orders order) {
		return dao.updateOrder(order) == 1 ? true : false;
	}

	@Override
	public List<Orders> getOrders(String equipid) {
		return dao.getOrders(equipid);
	}
}
