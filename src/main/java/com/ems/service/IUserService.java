package com.ems.service;

import java.util.List;

import com.ems.pojo.ExtPager;
import com.ems.pojo.User;

public interface IUserService {
	User getUserById(int userId);
	
	User checklogin(String username);
	
	boolean insert(User user);

	boolean reset(User u);

	int getTotal(User user);

	List<User> getItems(ExtPager pager, User user);
	
}
