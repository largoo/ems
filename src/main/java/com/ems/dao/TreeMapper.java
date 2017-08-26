package com.ems.dao;

import java.util.List;

import com.ems.pojo.Tree;

public interface TreeMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Tree record);

    int insertSelective(Tree record);

    Tree selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Tree record);

    int updateByPrimaryKey(Tree record);

	List<Tree> getRoots();

	List<Tree> getChildren(Tree tree);
}