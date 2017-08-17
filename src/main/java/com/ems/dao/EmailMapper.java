package com.ems.dao;

import java.util.List;

import com.ems.pojo.Email;

public interface EmailMapper {
    int deleteByPrimaryKey(String[] ids);

    int insert(Email record);

    int insertSelective(Email record);

    Email selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Email record);

    int updateByPrimaryKey(Email record);

	List<Email> getAll();

	int getTotal();

	int hasAccount(Email email);
	
	int hasSender();
	
}