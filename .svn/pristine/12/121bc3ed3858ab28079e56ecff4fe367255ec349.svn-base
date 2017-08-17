package com.ems.dao;

import java.util.List;

import com.ems.pojo.User;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);
    
    User checklogin(String username);

	int reset(User u);

	List<User> getItems(User user);

	int getTotal(User user);
	
}