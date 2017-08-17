import java.util.Date;

import org.apache.log4j.Logger;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)		//表示继承了SpringJUnit4ClassRunner类
@ContextConfiguration(locations = {"classpath:spring-mybatis.xml"})
public class TestMyBatis{
	private static Logger logger = Logger.getLogger(TestMyBatis.class);

	@Test  
    public void test(){ 
    	System.out.println(new Date("Sat Jul 01 00:00:00 CST 2017"));
    }
	
}
