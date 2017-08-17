package com.ems.service;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.mail.MessagingException;

import com.ems.pojo.Email;
import com.ems.pojo.ExtPager;
import com.ems.pojo.ExtReturn;

public interface IEmailService {

	int getTotal();

	List<Email> getAll(ExtPager pager);

	boolean hasAccount(Email email);

	boolean add(Email email);
	
	boolean hasSender();
	
	Email getById(int id);
	
	boolean update(Email email);
	
	boolean delete(String[] ids);

	ExtReturn push(String[] args) throws MessagingException, UnsupportedEncodingException;
	
}
