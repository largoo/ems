package com.ems.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ems.dao.EquipMapper;
import com.ems.dao.TreeMapper;
import com.ems.pojo.Equip;
import com.ems.pojo.Tree;
import com.ems.service.IEquipService;
import com.ems.utils.Utils;

@Service
public class EquipServiceImpl implements IEquipService{

	@Resource
	private EquipMapper dao;
	
	@Resource
	private TreeMapper tdao;
	
	@Override
	public List<Equip> getIds(Equip equip,String eids) {
		String[] eid = null;
		if(null != eids && !"".equals(eids)){
			eid = eids.split(",");
		}
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("id", equip.getId());
		map.put("eids", eid);
		return dao.getIds(map);
	}

	@Override
	public boolean checkId(String id) {
		return dao.checkId(id) == 0 ? false : true;
	}

	@Override @Transactional
	public boolean addId(Equip equip, String pid) {
		int i = 0;
		i += dao.addId(equip);
		
		int eid = dao.getEid(equip.getId());
		Tree tree = new Tree();
		tree.setEid(eid);
		tree.setPid(Integer.valueOf(pid));
		tree.setText(equip.getId());
		i += tdao.insertSelective(tree);
		
		return  i == 2 ? true : false;
	}

	@Override
	public Equip getInfo(String id) {
		return dao.selectByPrimaryKey(id);
	}

	@Override
	public boolean updateInfo(Equip equip) {
		return dao.updateInfo(equip) == 1 ? true : false;
	}

	@Override
	public boolean checkIdVer(int idver, String oid) {
		int oidver = this.dao.getIdVer(oid); 
		return oidver == idver ? true : false;
	}

	@Override
	public boolean ishas(String nid, String oid) {
		return dao.checkIdForUpdate(nid,oid) > 0 ? true : false;
	}

	@Override
	public boolean updateId(String id,String oid) {
		return dao.updateId(id,oid) == 1 ? true : false;
	}

	@Override
	public boolean deleteId(String id) {
		return dao.deleteId(id) == 1 ? true : false;
	}

	@Override
	public boolean lock(String id,int userid) {
		return dao.lock(id,userid,Utils.formatdate(new Date())) == 1 ? true : false;
	}

	@Override
	public boolean updateState(String equipid, Integer type) {
		return dao.updateState(equipid,type) == 1 ? true : false;
	}

	@Override
	public boolean updateStateBack(String equipid) {
		return dao.updateStateBack(equipid) == 1 ? true : false;
	}

}
