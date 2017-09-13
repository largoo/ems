package com.ems.pojo;

public class Orders {
    private Integer id;

    private String equipid;

    private String starttime;

    private Integer type;

    private String illustrate;

    private String solution;

    private String endtime;

    private String replaces;

    private String remark;

    private Integer createuserid;

    private Integer updateuserid;

    private Integer state;

    private Integer ver;

    private Integer del;
    
    private User user;
    
    private String handlefilename;
    
    private String handlefilesavename;
    
    private String handlefilepath;
    
    public String getHandlefilename() {
		return handlefilename;
	}

	public void setHandlefilename(String handlefilename) {
		this.handlefilename = handlefilename;
	}

	public String getHandlefilesavename() {
		return handlefilesavename;
	}

	public void setHandlefilesavename(String handlefilesavename) {
		this.handlefilesavename = handlefilesavename;
	}

	public String getHandlefilepath() {
		return handlefilepath;
	}

	public void setHandlefilepath(String handlefilepath) {
		this.handlefilepath = handlefilepath;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEquipid() {
        return equipid;
    }

    public void setEquipid(String equipid) {
        this.equipid = equipid == null ? null : equipid.trim();
    }

    public String getStarttime() {
        return starttime;
    }

    public void setStarttime(String starttime) {
        this.starttime = starttime;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public String getIllustrate() {
        return illustrate;
    }

    public void setIllustrate(String illustrate) {
        this.illustrate = illustrate == null ? null : illustrate.trim();
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution == null ? null : solution.trim();
    }

    public String getEndtime() {
        return endtime;
    }

    public void setEndtime(String endtime) {
        this.endtime = endtime;
    }

    public String getReplaces() {
		return replaces;
	}

	public void setReplaces(String replaces) {
		this.replaces = replaces;
	}

	public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Integer getCreateuserid() {
        return createuserid;
    }

    public void setCreateuserid(Integer createuserid) {
        this.createuserid = createuserid;
    }

    public Integer getUpdateuserid() {
        return updateuserid;
    }

    public void setUpdateuserid(Integer updateuserid) {
        this.updateuserid = updateuserid;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getVer() {
        return ver;
    }

    public void setVer(Integer ver) {
        this.ver = ver;
    }

    public Integer getDel() {
        return del;
    }

    public void setDel(Integer del) {
        this.del = del;
    }
}