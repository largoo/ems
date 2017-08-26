package com.ems.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ems.pojo.Tree;
import com.ems.service.ITreeService;

@Controller
@RequestMapping("/tree")
public class TreeController {
	
	@Resource
	private ITreeService service;
	
	@RequestMapping(value="getTree", method=RequestMethod.POST)
	@ResponseBody
	public Object getTree(HttpServletRequest request){
		List<Tree> roots = service.getRoots();
		List<Tree> trees = getNodes(roots);
		return JSON.toJSON(trees);
	}

	private List<Tree> getNodes(List<Tree> trees) {
		if(trees.size() == 0)
			return null;
		
		for(Tree tree : trees){
			List<Tree> children = service.getChildren(tree);
			if(children.size() == 0){
				tree.setLeaf(true);
			}else{
				tree.setLeaf(false);
				tree.setChildren(getNodes(children));
			}
		}
		return trees;
	}
	
}
