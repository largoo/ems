package com.ems.dao;

import java.util.List;

import com.ems.pojo.Equip;

public interface EquipMapper {
    int deleteByPrimaryKey(String id);

    int insert(Equip equip);

    int insertSelective(Equip equip);

    Equip selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(Equip equip);

    int updateByPrimaryKey(Equip equip);
    
    List<Equip> getIds(Equip equip);

	int checkId(String id);

	int addId(Equip equip);

	int updateInfo(Equip equip);

	int getIdVer(String oid);

	int checkIdForUpdate(String nid, String oid);

	int updateId(String id, String oid);

	int deleteId(String id);

	int lock(String id,int userid,String lockdate);

	int updateState(String equipid, Integer type);

	int updateStateBack(String equipid);
}