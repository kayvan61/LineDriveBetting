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
	void testLogin() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		//driver.get("https://linedrivebetting-255803.appspot.com/");
		driver.get("http://localhost:3000/login");
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
				System.out.println(innerButtons.size());
				innerButtons.get(i).click();
			}catch(Exception e) {
			
			}
			driver.get("http://localhost:3000/login");
		}
		links = driver.findElements(By.tagName("a"));
		links.get(0).click();
		System.out.println("Done running button test");
		
		//fail("Not yet implemented");
	}
	
	
	/*
	 * This test all links through a depth first search, I think it would be
	 * a for loop or a while loop, (look at 422C psuedocode...)
	 * TODO:
	 */
	@Test
	void testAllLinksLinking() {
		//driver.findElement(By.linkText("Log-in")).click();
//		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
//		WebDriver driver = new ChromeDriver();
//		
//		driver.get("https://linedrivebetting-255803.appspot.com/");
//		List<WebElement> allLinks = driver.findElements(By.tagName("a"));
//		System.out.println("There are " + allLinks.size() + " links");
//		String linkName[] = new String[allLinks.size()];
//		int i = 0;
//				
//		for(WebElement c: allLinks) {
//			System.out.println(c.getText());
//			linkName[i] = c.getText();
//			System.out.println("Title: " + driver.getTitle());
//			
//			System.out.println(" " + c.getAttribute("href"));
//			i++;
//		}
//		for(String c: linkName) {
//			
//			System.out.print(c);
//			if(c.contains("about")) {
//				System.out.println("here!");
//				continue;
//			}
//			
//			driver.findElement(By.linkText(c)).click();
//			if(!driver.getTitle().equals("LineDriveBetting")){
//				System.out.println(c + "Link is broken");
//			}else {
//				System.out.println(c + "Link is working");
//			}
//			driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
//			driver.navigate().back();
//			driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
//			
//		}
//			
//		assertEquals(0,0);
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
				driver.navigate().back();
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);

				
			
			}
			
			driver.quit();
	}
		
		
	/*probably find a way to test all buttons by searching through all the pages
	 * for a button, try not to hard code this but simply navigate through all the 
	 * possible pages. If you don't want to repeat pages, just make a hashmap and check 
	 * if the page hasn't been checked yet.'
	 * Todo:	
	 */
	/*@Test
	void testAllLinksCorrect() {
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
				if(!driver.getCurrentUrl().contains(c)){
					System.out.println(c + " link is incorrect");
					System.out.println(c);
					System.out.println(driver.getCurrentUrl());
					Assert.fail(c + " link is incorrect");
				}else {
					System.out.println(c + " link is correct");
				}
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
				driver.navigate().back();
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);

				
			
			}
			driver.quit();
	}*/
	@Test
	void testHomePageGameCards() {
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
	@Test
	void testBetNowButtons() {
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
	@Test
	void testBetNowPageLinks() {
		
		/*
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		HashMap<WebElement,String> websitesVisited = new HashMap<WebElement,String>();
		
		//driver.get("https://linedrivebetting-255803.appspot.com/");
		driver.get("http://localhost:3000/betnow");
			//driver.findElement(By.linkText("Log-in")).click();
			List<WebElement> allLinks = driver.findElements(By.tagName("a"));
		
			System.out.println("There are " + allLinks.size() + " links");
			String linkName[] = new String[allLinks.size()];
			
			List<WebElement> externalLinks = driver.findElements(By.className("hoverBorder")) ;
			
			
			System.out.println("There are this many external links " + externalLinks.size());
			int i = 0;
			
//			for(WebElement c: allLinks) {
//				System.out.println(c.getText());
//				//linkName[i] = c.getText();
//				System.out.println("Title: " + driver.getTitle());
//				
//				//driver.navigate().to(c.getAttribute("href"));
//				
//				c.click();
//				
//				
//				
//			}
			
		
			driver.findElement(By.id("BettingSiteImage1")).click();
			driver.get("http://localhost:3000/betnow");
			driver.findElement(By.id("BettingSiteImage2")).click();
			driver.get("http://localhost:3000/betnow");
			driver.findElement(By.id("BettingSiteImage3")).click();
			driver.get("http://localhost:3000/betnow");
			driver.findElement(By.id("BettingSiteImage4")).click();
			driver.get("http://localhost:3000/betnow");
			driver.findElement(By.id("BettingSiteImage5")).click();
			driver.get("http://localhost:3000/betnow");
			driver.findElement(By.id("BettingSiteImage6")).click();
			driver.get("http://localhost:3000/betnow");
//			int count = 0;
//			System.out.println("before alllinks");
			//driver.get("http://localhost:3000/betnow");
//			for(int j = 0; j < allLinks.size(); j++) {
//				System.out.println("starting to click " + linkName[j]);
//				driver.findElement(By.linkText(linkName[j])).click();
//				/*
//				if(!driver.getTitle().equals("LineDriveBetting")) {
//					externalLinks.add(allLinks.get(j));
//					
//				}
//				*/
//				//System.out.println(allLinks.get(j).getText());
////				if(!allLinks.get(j).getAttribute("href").contains(driver.getCurrentUrl())) {
////					if(driver.getTitle().equals("LineDriveBetting")) {
////						Assert.fail("external link failed");
////					}
////					Assert.fail("link failed");
////				}
//				
//				
//				driver.get("http://localhost:3000/betnow");
//				//allLinks = driver.findElements(By.tagName("a"));
//				
//			}
			
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/betnow");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("hoverBorder")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		//List <WebElement> gameCards = driver.findElements(By.className("card"));
		//List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		//ArrayList <ArrayList<WebElement>> subCards = new ArrayList <ArrayList <WebElement>>();
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		///System.out.println(gameCards.size());
		subCardElements = driver.findElements(By.className("hoverBorder"));
		System.out.println(subCardElements.size());
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://localhost:3000/betnow");
			subCardElements = driver.findElements(By.className("hoverBorder"));
			driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		}
		
		driver.get("http://localhost:3000/betnow");
		//List <WebElement> gameCards = driver.findElements(By.className("card"));
		//List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		//ArrayList <ArrayList<WebElement>> subCards = new ArrayList <ArrayList <WebElement>>();
		//List <WebElement> subCardElements = new ArrayList <WebElement>();
		///System.out.println(gameCards.size());
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
	@Test
	void testBetNowPageLinks2() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/betnow");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("hoverBorder")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		//List <WebElement> gameCards = driver.findElements(By.className("card"));
		//List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		//ArrayList <ArrayList<WebElement>> subCards = new ArrayList <ArrayList <WebElement>>();
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		///System.out.println(gameCards.size());
		driver.get("http://localhost:3000/betnow");
		//List <WebElement> gameCards = driver.findElements(By.className("card"));
		//List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		//ArrayList <ArrayList<WebElement>> subCards = new ArrayList <ArrayList <WebElement>>();
		//List <WebElement> subCardElements = new ArrayList <WebElement>();
		///System.out.println(gameCards.size());
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
	@Test
	void testComments() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		driver.get("http://localhost:3000/game");
		List <WebElement> buttons = driver.findElements(By.tagName("button"));
		buttons.get(0).click();
		
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
