package com.ems.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ems.dao.TreeMapper;
import com.ems.pojo.Tree;
import com.ems.service.ITreeService;

@Service
public class TreeServiceImpl implements ITreeService{

	@Resource
	private TreeMapper dao;
	
	@Override
	public List<Tree> getRoots() {
		return dao.getRoots();
	}

	@Override
	public List<Tree> getChildren(Tree tree) {
		return dao.getChildren(tree);
	}

	@Override @Transactional
	public boolean insert(List<Tree> trees) {
		int i = 0;
		for(Tree tree : trees){
			i += dao.insertSelective(tree);
		}
		return i == trees.size() ? true : false;
	}

}
