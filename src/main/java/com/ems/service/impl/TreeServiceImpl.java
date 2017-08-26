package com.ems.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

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

}
