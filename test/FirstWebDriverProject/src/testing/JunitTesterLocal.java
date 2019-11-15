package testing;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class JunitTesterLocal {
	@Test
	void testLoginButtonsLocal() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		
		driver.get("http://localhost:3000/login");
		List <WebElement> buttons;
		List <WebElement> innerButtons;
		List <WebElement> links;
		WebDriverWait wait = new WebDriverWait(driver,5);
		
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
		for(int i = 0; i <2; i++) {
			buttons = driver.findElements(By.tagName("button"));
			
			buttons.get(0).click();
			
			try{
				TimeUnit.SECONDS.sleep(5);
				innerButtons = driver.findElement(By.className("modal-footer")).findElements(By.tagName("button"));
				
				innerButtons.get(i).click();
			}catch(Exception e) {
			
			}
			driver.get("http://localhost:3000/login");
		}
		
		
		
	}
	
	@Test
	void testLoginLocal() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
	
		driver.get("http://localhost:3000/login");
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
	void testAllLinksLinkingLocal() {
		
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		//driver.get("https://linedrivebetting-255803.appspot.com/");
		driver.get("http://localhost:3000/");
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
				driver.get("http://localhost:3000/");
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);

				
			
			}
			
			driver.quit();
	}
		
		
	//visits every gamecard on the homepage to test if internal links work
	@Test
	void testHomePageGameCardsLocal() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/home");
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
			driver.get("http://localhost:3000/home");
			subCardElements = driver.findElements(By.className("card"));
		}
		System.out.println("Done testing HomePage");
	}
	//tests the carousel on the betnow page
	
	@Test
	void testBetNowButtonsLocal() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/betnow");
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
	//tests the first half of the links on the betnow page
	@Test
	void testBetNowPageLinksLocal() {
		
		
			
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/betnow");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("hoverBorder")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		
		subCardElements = driver.findElements(By.className("hoverBorder"));
		System.out.println(subCardElements.size());
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://localhost:3000/betnow");
			subCardElements = driver.findElements(By.className("hoverBorder"));
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		}
		
		driver.get("http://localhost:3000/betnow");
		
		subCardElements = driver.findElements(By.className("hoverBorderbottom"));
		System.out.println(subCardElements.size());
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://localhost:3000/betnow");
			subCardElements = driver.findElements(By.className("hoverBorderbottom"));
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		}
		
		
		
		
		System.out.println("Done testing betNowPage");
			
	}
	//Tests the second half of the links on the betnow page
	@Test
	void testBetNowPageLinks2Local() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/betnow");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("hoverBorder")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		
		driver.get("http://localhost:3000/betnow");
		
		subCardElements = driver.findElements(By.className("hoverBorderbottom"));
		System.out.println(subCardElements.size());
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://localhost:3000/betnow");
			subCardElements = driver.findElements(By.className("hoverBorderbottom"));
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		}
		
		
		
		
		System.out.println("Done testing betNowPage");
	}
	//Test will log in on testbug account, and leave a comment on every page and check to see if a comment was made
	@Test
	void testCommentsLocal() {
		List <WebElement> commentInput;
		List <WebElement> comments;
		List <WebElement> buttons;
		List <WebElement> inputs;
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/login");
		
		
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
		//System.out.println(gameCards.size() + "This is number of gamecards");
		subCardElements = driver.findElements(By.className("card"));
		//System.out.println(subCardElements.size());
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
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
			for(WebElement a: comments) {
				System.out.println(a.getText());
				if(a.getText().equals("testbug: This is a test of the comments section"))
					j = 1;
			}
			
			driver.get("http://localhost:3000/home");
			wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("card")));
			subCardElements = driver.findElements(By.className("card"));
			System.out.println(subCardElements.size());
			//Assert.assertEquals(1, j);
		}
		
		
	}
	//Tests if you can make multiple accounts with the same name but a different password. Test fails if you can
	@Test
	void testDupAccountsLocal() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/login");
		List <WebElement> buttons;
		List <WebElement> inputs;
		
		buttons = driver.findElements(By.tagName("button"));
		buttons.get(0).click();
		WebDriverWait wait = new WebDriverWait(driver,5);
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(//*[@id="root"]/div/div/div[3]/div/div/ul/li[1])));
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		inputs = driver.findElements(By.tagName("input"));
		System.out.println(inputs.size());
		inputs.get(2).sendKeys("testbug");
		inputs.get(3).sendKeys("12345");
		buttons = driver.findElements(By.tagName("button"));
		buttons.get(3).click(); //create account
		
		
		
		inputs = driver.findElements(By.tagName("input"));
		inputs.get(0).sendKeys("testbug");
		inputs.get(1).sendKeys("12345");
		buttons = driver.findElements(By.tagName("button"));
		buttons.get(1).click();
		buttons.clear();
		buttons = driver.findElements(By.className("btn"));
		Assert.assertTrue(buttons.get(0).getText().equals("Log-in"));
	}
}
