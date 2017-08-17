package com.ems.service;

import java.util.List;

import com.ems.pojo.Orders;

public interface IOrderService {

	boolean addOrder(Orders order);

	Orders getOrder(String equipid);

	boolean updateOrder(Orders order);

	List<Orders> getOrders(String equipid);

}
