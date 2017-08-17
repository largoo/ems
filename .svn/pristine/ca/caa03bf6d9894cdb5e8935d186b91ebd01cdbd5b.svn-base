package com.ems.service.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.ems.dao.UserMapper;
import com.ems.pojo.ExtPager;
import com.ems.pojo.User;
import com.ems.service.IUserService;

@Service("userService")
public class UserServiceImpl implements IUserService {
	@Resource
	private UserMapper userDao;

	@Override
	public User getUserById(int userId) {
		return this.userDao.selectByPrimaryKey(userId);
	}

	@Override
	public User checklogin(String username) {
		return this.userDao.checklogin(username);
	}

	@Override
	public boolean insert(User user) {
		if(userDao.insertSelective(user) > 0)
			return true;
		else 
			return false;
	}

	@Override
	public boolean reset(User u) {
		if(userDao.reset(u) > 0)
			return true;
		else 
			return false;
	}

	@Override
	public int getTotal(User user) {
		return userDao.getTotal(user);
	}

	@Override
	public List<User> getItems(ExtPager pager, User user) {
		PageHelper.startPage(pager.getStart()/pager.getLimit()+1, pager.getLimit());
		return this.userDao.getItems(user);
	}

}
