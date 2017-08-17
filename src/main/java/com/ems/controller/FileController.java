package com.ems.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.ems.pojo.ExtFile;
import com.ems.pojo.ExtReturn;

@Controller
@RequestMapping("/file")
public class FileController {

	@RequestMapping(value = "upload", method = RequestMethod.POST)
	@ResponseBody
	public ExtReturn doUpload(@RequestParam(value = "F_FileType", required = true) String sType,
			@RequestParam(value = "F_FileOfId", required = true) String sId, HttpServletRequest request) {
		MultipartHttpServletRequest fileRequest = (MultipartHttpServletRequest) request;
		MultipartFile file = fileRequest.getFile("fileupload");
		String path = request.getSession().getServletContext().getRealPath("upload") + "\\" + sId + "\\";
		String fileName = sType + System.currentTimeMillis() + file.getOriginalFilename();

		ExtFile rf = new ExtFile();
		rf.setName(file.getOriginalFilename());
		rf.setPath(path);
		rf.setSavename(fileName);

		File targetFile = new File(path, fileName);
		if (!targetFile.exists()) {
			targetFile.mkdirs();
		}
		try {
			file.transferTo(targetFile);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return new ExtReturn(true, "上传成功", rf);
	}

	@RequestMapping(value = "download", method = RequestMethod.GET)
	@ResponseBody
	public void download(String name, String savename, String path, HttpServletRequest request,
			HttpServletResponse response) {
		// 第一步设置相应文件内容，告诉浏览器，现在要输出的是下载文件，不要用普通的html页面解析
		response.setContentType("application/x-msdownload");
		// 设置下载的文件名字（可以从数据库中取出）
		String FileName = name;
		// URLEncoder.encode(FileName, "utf-8")作用更改编码格式 url的编码格式转码
		// 第二步，告诉浏览器，需要用户自定义选择下载，不用浏览器客户端自动解析
		try {
			response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(FileName, "utf-8"));

			// 第三步使用流写到浏览器上
			OutputStream FileOut = response.getOutputStream();
			// 定义需要下载的文件位置，不一定文件要在webRoot下（可以数据库记录文件位置，然后使用这个能找到就行）
			String DownFileName = path + savename;
			// 使用流读出来然后写入
			InputStream in = new FileInputStream(DownFileName);
			// Spring提供的
			// FileCopyUtils.copy(in, FileOut);
			byte[] buffer = new byte[in.available()];
			// 通过流读出到内存
			in.read(buffer);
			// 写入流向客户端
			FileOut.write(buffer);
			// 关闭流
			in.close();
			FileOut.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
