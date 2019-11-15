package testing;
import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.concurrent.TimeUnit;
import java.util.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
class JunitTester {
	
	
	//This will run before every test
	@Before
	void init() {
		//System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		//WebDriver driver = new ChromeDriver();
		
		//driver.get("https://linedrivebetting-255803.appspot.com/");
	}
	
	

	/* Have a depth first search of all elements within the website
	 * With the search have the jUnit test fail instead of printing fail 
	 * in the console
	 */
	@Test
	void testLoginButtons() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		//driver.get("https://linedrivebetting-255803.appspot.com/");
		driver.get("http://linedrivebet.appspot.com/login");
		List <WebElement> buttons;
		List <WebElement> innerButtons;
		List <WebElement> links;
		WebDriverWait wait = new WebDriverWait(driver,5);
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(//*[@id="root"]/div/div/div[3]/div/div/ul/li[1])));
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
		for(int i = 0; i <2; i++) {
			buttons = driver.findElements(By.tagName("button"));
			
			buttons.get(0).click();
			
			try{
				TimeUnit.SECONDS.sleep(5);
				innerButtons = driver.findElement(By.className("modal-footer")).findElements(By.tagName("button"));
				//System.out.println(innerButtons.size());
				innerButtons.get(i).click();
			}catch(Exception e) {
			
			}
			driver.get("http://linedrivebet.appspot.com/login");
		}
		
		
		//fail("Not yet implemented");
	}
	
	@Test
	void testLogin() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		//driver.get("https://linedrivebetting-255803.appspot.com/");
		driver.get("http://linedrivebet.appspot.com/login");
		List <WebElement> buttons;
		List <WebElement> innerButtons;
		List <WebElement> links;
		List <WebElement> inputs;
		
		WebDriverWait wait = new WebDriverWait(driver,5);
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(//*[@id="root"]/div/div/div[3]/div/div/ul/li[1])));
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		inputs = driver.findElements(By.tagName("input"));
		inputs.get(0).sendKeys("testbug");
		inputs.get(1).sendKeys("1234");
		buttons = driver.findElements(By.tagName("button"));
		buttons.get(1).click();
		buttons.clear();
		buttons = driver.findElements(By.tagName("button"));
		Assert.assertTrue(buttons.get(0).getText().equals("Hello, testbug"));
		
	}
	/*
	 * This test all links through a depth first search, I think it would be
	 * a for loop or a while loop, (look at 422C psuedocode...)
	 * TODO:
	 */
	@Test
	void testAllLinksLinking() {
		
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		//driver.get("https://linedrivebetting-255803.appspot.com/");
		driver.get("http://linedrivebet.appspot.com/");
			//driver.findElement(By.linkText("Log-in")).click();
			List<WebElement> allLinks = driver.findElements(By.tagName("a"));
			System.out.println("There are " + allLinks.size() + " links");
			String linkName[] = new String[allLinks.size()];
			int i = 0;
					
			for(WebElement c: allLinks) {
				System.out.println(c.getText());
				linkName[i] = c.getText();
				System.out.println("Title: " + driver.getTitle());
				
				System.out.println(" " + c.getAttribute("href"));
				i++;
			}
			for(String c: linkName) {
				
				System.out.print(c);
				if(c.contains("about")) {
					System.out.println("here!");
					continue;
				}
				
				driver.findElement(By.linkText(c)).click();
				if(!driver.getTitle().equals("LineDriveBetting")){
					System.out.println(c + " link is broken");
					Assert.fail(c + " link is broken");
				}else {
					System.out.println(c + " link is working");
				}
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
				driver.get("http://linedrivebet.appspot.com/");
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);

				
			
			}
			
			driver.quit();
	}
		
		
	
	@Test
	void testHomePageGameCards() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://linedrivebet.appspot.com/home");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("card")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		//List <WebElement> gameCards = driver.findElements(By.className("card"));
		List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		//ArrayList <ArrayList<WebElement>> subCards = new ArrayList <ArrayList <WebElement>>();
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		System.out.println(gameCards.size());
		subCardElements = driver.findElements(By.className("card"));
		System.out.println(subCardElements.size());
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://linedrivebet.appspot.com/home");
			subCardElements = driver.findElements(By.className("card"));
		}
		System.out.println("Done testing HomePage");
	}
	@Test
	void testBetNowButtons() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://linedrivebet.appspot.com/betnow");
		List <WebElement> buttons = driver.findElements(By.tagName("button"));
		WebDriverWait wait = new WebDriverWait(driver,5);
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(//*[@id="root"]/div/div/div[3]/div/div/ul/li[1])));
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
		buttons.get(1).click();
		try{
			TimeUnit.SECONDS.sleep(5);
		}catch(Exception e) {
			
		}
		buttons.get(1).click();
		try{
			TimeUnit.SECONDS.sleep(5);
		}catch(Exception e) {
			
		}
		buttons.get(0).click();
		try{
			TimeUnit.SECONDS.sleep(5);
		}catch(Exception e) {
			
		}
		buttons.get(0).click();
		try{
			TimeUnit.SECONDS.sleep(5);
		}catch(Exception e) {
			
		}
		System.out.println("Done running button test");
	}
	@Test
	void testBetNowPageLinks() {
		
		
			
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://linedrivebet.appspot.com/betnow");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("hoverBorder")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		
		subCardElements = driver.findElements(By.className("hoverBorder"));
		System.out.println(subCardElements.size());
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://linedrivebet.appspot.com/betnow");
			subCardElements = driver.findElements(By.className("hoverBorder"));
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		}
		
		driver.get("http://linedrivebet.appspot.com/betnow");
		
		subCardElements = driver.findElements(By.className("hoverBorderbottom"));
		System.out.println(subCardElements.size());
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://linedrivebet.appspot.com/betnow");
			subCardElements = driver.findElements(By.className("hoverBorderbottom"));
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		}
		
		
		
		
		System.out.println("Done testing betNowPage");
			
	}
	@Test
	void testBetNowPageLinks2() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://linedrivebet.appspot.com/betnow");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("hoverBorder")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		//List <WebElement> gameCards = driver.findElements(By.className("card"));
		//List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		//ArrayList <ArrayList<WebElement>> subCards = new ArrayList <ArrayList <WebElement>>();
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		///System.out.println(gameCards.size());
		driver.get("http://linedrivebet.appspot.com/betnow");
		//List <WebElement> gameCards = driver.findElements(By.className("card"));
		//List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		//ArrayList <ArrayList<WebElement>> subCards = new ArrayList <ArrayList <WebElement>>();
		//List <WebElement> subCardElements = new ArrayList <WebElement>();
		///System.out.println(gameCards.size());
		subCardElements = driver.findElements(By.className("hoverBorderbottom"));
		System.out.println(subCardElements.size());
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://linedrivebet.appspot.com/betnow");
			subCardElements = driver.findElements(By.className("hoverBorderbottom"));
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		}
		
		
		
		
		System.out.println("Done testing betNowPage");
	}
	@Test
	void testComments() {
		List <WebElement> commentInput;
		List <WebElement> comments;
		List <WebElement> buttons;
		List <WebElement> inputs;
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://linedrivebet.appspot.com/login");
		
		
		List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		
		inputs = driver.findElements(By.tagName("input"));
		inputs.get(0).sendKeys("testbug");
		inputs.get(1).sendKeys("1234");
		buttons = driver.findElements(By.tagName("button"));
		buttons.get(1).click();
		
		WebDriverWait wait = new WebDriverWait(driver,5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("card")));
		//driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		System.out.println(gameCards.size() + "This is number of gamecards");
		subCardElements = driver.findElements(By.className("card"));
		System.out.println(subCardElements.size());
		for(int i = 0; i < subCardElements.size(); i++) {
			
			subCardElements.get(i).click();
			System.out.println(i);
			commentInput = driver.findElements(By.tagName("textarea"));
			commentInput.get(0).sendKeys("This is a test of the comments section");
			System.out.println("It has written a comment");
			//driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			comments = driver.findElements(By.tagName("p"));
			buttons = driver.findElements(By.tagName("button"));
			buttons.get(buttons.size()-1).click();
			int j = 0;
			for(WebElement a: comments) {
				
				if(a.getText().equals("testbug: This is a test of the comments section"))
					j = 1;
			}
			//Assert.assertEquals(1, j);
			//driver.navigate().back();
			driver.get("http://linedrivebet.appspot.com/home");
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("card")));
			subCardElements = driver.findElements(By.className("card"));
			System.out.println(subCardElements.size());
			Assert.assertEquals(1, j);
		}
		
		
	}
	//Miguel's implementation of a user case
	@Test
	void testUserCase1() {
		
	}
	
	//Miguel's Implementation of another user case
	@Test
	void testUserCase2(){
		
	}
	
	

}
