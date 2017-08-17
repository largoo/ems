package com.ems.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;
import javax.mail.Address;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.stereotype.Service;

import com.ems.dao.EmailMapper;
import com.ems.pojo.Email;
import com.ems.pojo.ExtPager;
import com.ems.pojo.ExtReturn;
import com.ems.service.IEmailService;
import com.github.pagehelper.PageHelper;

@Service
public class EmailServiceImple implements IEmailService {

	@Resource
	private EmailMapper dao;

	@Override
	public int getTotal() {
		return this.dao.getTotal();
	}

	@Override
	public List<Email> getAll(ExtPager pager) {
		if(pager != null){
			PageHelper.startPage(pager.getStart()/pager.getLimit()+1, pager.getLimit());
		}
		return this.dao.getAll();
	}

	@Override
	public boolean hasAccount(Email email) {
		return this.dao.hasAccount(email) > 0 ? true : false;
	}

	@Override
	public boolean add(Email email) {
		return this.dao.insertSelective(email) == 1 ? true : false;
	}

	@Override
	public boolean hasSender() {
		return this.dao.hasSender() > 0 ? true : false;
	}

	@Override
	public Email getById(int id) {
		return this.dao.selectByPrimaryKey(id);
	}

	@Override
	public boolean update(Email email) {
		return this.dao.updateByPrimaryKeySelective(email) == 1 ? true : false;
	}

	@Override
	public boolean delete(String[] ids) {
		return this.dao.deleteByPrimaryKey(ids) == ids.length ? true : false;
	}
	
	@Override
	public ExtReturn push(String[] args) throws MessagingException, UnsupportedEncodingException {
		Email fromemail = null;
		List<Email> toemail = new ArrayList<Email>();
		List<Email> em = this.getAll(null);
		for (Email e : em) {
			if (e.getType().equals("0")) {
				fromemail = e;
			} else {
				toemail.add(e);
			}
		}
		if(fromemail == null || toemail.size() == 0){
			return new ExtReturn(false, "发送邮箱为空或没有接收邮箱");
		}
		Properties prop = new Properties();
		prop.setProperty("mail.transport.protocol", "smtp");
		prop.setProperty("mail.smtp.host", fromemail.getSmtp());
		prop.setProperty("mail.smtp.auth", "true");

		final String smtpPort = "465";
		prop.setProperty("mail.smtp.port", smtpPort);
		prop.setProperty("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
		prop.setProperty("mail.smtp.socketFactory.fallback", "false");
		prop.setProperty("mail.smtp.socketFactory.port", smtpPort);

		Session session = Session.getDefaultInstance(prop);
		session.setDebug(true);
		MimeMessage message = createMimeMessage(session, fromemail.getAccount(), toemail);
		Transport ts = session.getTransport();
		ts.connect(fromemail.getAccount(), fromemail.getPassword());
		ts.sendMessage(message, message.getAllRecipients());
		ts.close();
		return new ExtReturn(true, "已发送");
	}

	private MimeMessage createMimeMessage(Session session, String from, List<Email> to)
			throws MessagingException, UnsupportedEncodingException {
		MimeMessage mime = new MimeMessage(session);
		Address[] a = new Address[to.size()];
		for (int i = 0; i < to.size(); i++) {
			a[i] = new InternetAddress(to.get(i).getAccount(), to.get(i).getAccount(), "UTF-8");
		}
		mime.setFrom(from);
		mime.addRecipients(MimeMessage.RecipientType.TO, a);
		mime.setSubject("发送于̬" + new Date().toString());
		mime.setContent("ceshi", "text/html;charset=UTF-8");
		mime.setSentDate(new Date());
		mime.saveChanges();

		return mime;
	}

}
