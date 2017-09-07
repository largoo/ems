package com.ems.service;

import java.util.List;

import com.ems.pojo.Equip;

public interface IEquipService {

	List<Equip> getIds(Equip equip);

	boolean checkId(String id);

	boolean addId(Equip equip,String pid);

	Equip getInfo(String id);

	boolean updateInfo(Equip equip);

	boolean checkIdVer(int idver, String oid);

	boolean ishas(String id, String oid);

	boolean updateId(String id, String oid);

	boolean deleteId(String id);

	boolean lock(String id,int userid);

	boolean updateState(String equipid, Integer type);

	boolean updateStateBack(String equipid);
}
