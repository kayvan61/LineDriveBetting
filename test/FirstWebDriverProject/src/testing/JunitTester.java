package testing;
import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.concurrent.TimeUnit;
import java.util.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
class JunitTester {
	
	public static WebDriver driver;
	
	
	//This will run before every test
	@BeforeAll
	public static void init() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		
		
		driver = new ChromeDriver();
		
		
	}
	
	

	/* 
	 * With the search have the jUnit test fail instead of printing fail 
	 * in the console
	 */
	@Test
	void testLoginButtons() {
		
		
		
		
		driver.get("http://linedrivebet.appspot.com/login");
		List <WebElement> buttons;
		List <WebElement> innerButtons;
		
		
		
		
		
		for(int i = 0; i <2; i++) {
			buttons = driver.findElements(By.tagName("button"));
			buttons.get(0).click();
			try{
				TimeUnit.SECONDS.sleep(5);
				innerButtons = driver.findElement(By.className("modal-footer")).findElements(By.tagName("button"));
				innerButtons.get(i).click();
			}catch(Exception e) {
			}
			Assert.assertEquals("http://linedrivebet.appspot.com/login", driver.getCurrentUrl());
			driver.get("http://linedrivebet.appspot.com/login");
		}
	}
	
	@Ignore
	void testLogin() {
		
		driver.get("http://linedrivebet.appspot.com/login");
		List <WebElement> buttons;
		List <WebElement> inputs;
		
		WebDriverWait wait = new WebDriverWait(driver,5);
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		inputs = driver.findElements(By.tagName("input"));
		inputs.get(0).sendKeys("testbug");
		inputs.get(1).sendKeys("1234");
		buttons = driver.findElements(By.tagName("button"));
		buttons.get(1).click();
		buttons.clear();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("html/body/div/div/div/div[1]/nav/form/button")));
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
		
		
		
		
		driver.get("http://linedrivebet.appspot.com/");
			
			List<WebElement> allLinks = driver.findElements(By.tagName("a"));
			
			String linkName[] = new String[allLinks.size()];
			int i = 0;
					
			for(WebElement c: allLinks) {
				
				linkName[i] = c.getText();
				
				i++;
			}
			for(String c: linkName) {
				
				System.out.print(c);
				if(c.contains("about")) {
					
					continue;
				}
				
				driver.findElement(By.linkText(c)).click();
				if(!driver.getTitle().equals("LineDriveBetting")){
					Assert.fail(c + " link is broken");
				}else {
					
				}
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
				driver.get("http://linedrivebet.appspot.com/");
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);

				
			
			}
			
			driver.quit();
			
	}
		
		
	//visits every gamecard on the homepage to test if internal links work
	@Ignore
	void testHomePageGameCards() {
		
		driver.get("http://linedrivebet.appspot.com/home");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("card")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
		List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		
		subCardElements = driver.findElements(By.className("card"));
		
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://linedrivebet.appspot.com/home");
			subCardElements = driver.findElements(By.className("card"));
		}
		
	}
	//tests the carousel on the betnow page
	
	@Test
	void testBetNowButtons() {
		
		driver.get("http://linedrivebet.appspot.com/betnow");
		List <WebElement> buttons = driver.findElements(By.tagName("button"));
		WebDriverWait wait = new WebDriverWait(driver,5);
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		for(int i = 0; i < 2; i++) {
			buttons.get(1).click();
			try{
				TimeUnit.SECONDS.sleep(5);
			}catch(Exception e) {
				
			}
		}
		for(int i= 0; i < 2; i++) {
			buttons.get(0).click();
			try{
				TimeUnit.SECONDS.sleep(5);
			}catch(Exception e) {
				
			}
		}
		
		
		
	}
	//tests the first half of the links on the betnow page
	@Ignore
	void testBetNowPageLinks() {
		
		
			
		
		driver.get("http://linedrivebet.appspot.com/betnow");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("hoverBorder")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		
		subCardElements = driver.findElements(By.className("hoverBorder"));
		
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://linedrivebet.appspot.com/betnow");
			subCardElements = driver.findElements(By.className("hoverBorder"));
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		}
		
		driver.get("http://linedrivebet.appspot.com/betnow");
		
		subCardElements = driver.findElements(By.className("hoverBorderbottom"));
		
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://linedrivebet.appspot.com/betnow");
			subCardElements = driver.findElements(By.className("hoverBorderbottom"));
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		}
		
		
		
		
		
			
	}
	//Tests the second half of the links on the betnow page
	@Ignore
	void testBetNowPageLinks2() {
		
		driver.get("http://linedrivebet.appspot.com/betnow");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("hoverBorder")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		
		driver.get("http://linedrivebet.appspot.com/betnow");
		
		subCardElements = driver.findElements(By.className("hoverBorderbottom"));
	
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://linedrivebet.appspot.com/betnow");
			subCardElements = driver.findElements(By.className("hoverBorderbottom"));
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		}
		
		
		
		
		
	}
	//Test will log in on testbug account, and leave a comment on every page and check to see if a comment was made
	@Test
	void testComments() {
		List <WebElement> commentInput;
		List <WebElement> comments;
		List <WebElement> buttons;
		List <WebElement> inputs;
		
		driver.get("http://linedrivebet.appspot.com/login");
		
		
		List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		
		inputs = driver.findElements(By.tagName("input"));
		inputs.get(0).sendKeys("testbug");
		inputs.get(1).sendKeys("1234");
		buttons = driver.findElements(By.tagName("button"));
		buttons.get(1).click();
		
		WebDriverWait wait = new WebDriverWait(driver,5);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("card")));
		
		
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		
		subCardElements = driver.findElements(By.className("card"));
		
		for(int i = 0; i < subCardElements.size(); i++) {
			
			subCardElements.get(i).click();
			
			commentInput = driver.findElements(By.tagName("textarea"));
			commentInput.get(0).sendKeys("This is a test of the comments section");
			
			
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("textarea")));
			try{
				Thread.sleep(2000);
			}catch(Exception e) {
				
			}
			comments = driver.findElements(By.tagName("textarea"));
			
			buttons = driver.findElements(By.tagName("button"));
			buttons.get(buttons.size()-1).click();
			int j = 0; 
			
		
			
			driver.get("http://linedrivebet.appspot.com/home");
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("card")));
			subCardElements = driver.findElements(By.className("card"));
			
			
		}
		
		
	}
	//Tests if you can make multiple accounts with the same name but a different password. Test fails if you can
	@Test
	void testDupAccounts() {
		
		driver.get("http://linedrivebet.appspot.com/login");
		List <WebElement> buttons;
		List <WebElement> inputs;
		
		buttons = driver.findElements(By.tagName("button"));
		buttons.get(0).click();
		WebDriverWait wait = new WebDriverWait(driver,5);
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		inputs = driver.findElements(By.tagName("input"));
		
		inputs.get(2).sendKeys("testbug");
		inputs.get(3).sendKeys("12345");
		
		
		
		
		//Assert.assertTrue(buttons.get(0).getText().equals("Hello, testbug"));
		
		buttons = driver.findElements(By.tagName("button"));
		buttons.get(3).click(); //create account
		inputs = driver.findElements(By.tagName("input"));
		inputs.get(0).sendKeys("testbug");
		inputs.get(1).sendKeys("12345");
		buttons = driver.findElements(By.tagName("button"));
		buttons.get(1).click();
		buttons.clear();
		buttons = driver.findElements(By.className("btn"));
		boolean dupAccountNot = buttons.get(0).getText().equals("Log-in");
		
		driver.get("http://linedrivebet.appspot.com/login");
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		inputs = driver.findElements(By.tagName("input"));
		inputs.get(0).sendKeys("testbug");
		inputs.get(1).sendKeys("1234");
		buttons = driver.findElements(By.tagName("button"));
		buttons.get(1).click();
		buttons.clear();
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("html/body/div/div/div/div[1]/nav/form/button")));
		buttons = driver.findElements(By.tagName("button"));
		
		Assert.assertTrue(buttons.get(0).getText().equals("Hello, testbug") && dupAccountNot);
	}
	@Test
	void testGameCardButtons() {
		
		driver.get("http://linedrivebet.appspot.com/home");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("card")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		List <WebElement> buttons;
		
		
		subCardElements = driver.findElements(By.className("card"));
		
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			buttons = driver.findElements(By.className("MuiIconButton-label"));
			
			for(int j = 0; j < 2; j++) {
				buttons.get(j).click();
				try {
					Thread.sleep(2000);
				} catch (InterruptedException e) {
					
				}
			}
			buttons = driver.findElements(By.className("MuiIconButton-label"));
			for(int j = 0; j < 2; j++) {
				buttons.get(j).click();
				try {
					Thread.sleep(2000);
				} catch (InterruptedException e) {
					
				}
			}
			Assert.assertEquals(3, buttons.size());
			driver.get("http://linedrivebet.appspot.com/home");
			subCardElements = driver.findElements(By.className("card"));
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
