package com.ems.service;

import java.util.List;

import com.ems.pojo.Tree;

public interface ITreeService {

	List<Tree> getRoots();

	List<Tree> getChildren(Tree tree);

}
