package com.ems.dao;

import java.util.List;

import com.ems.pojo.Orders;

public interface OrdersMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Orders record);

    int insertSelective(Orders record);

    Orders selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Orders record);

    int updateByPrimaryKey(Orders record);

	Orders getMaxIdOrder(String equipid);

	int updateOrder(Orders order);

	List<Orders> getOrders(String equipid);
}