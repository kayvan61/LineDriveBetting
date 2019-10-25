package testing;
import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.concurrent.TimeUnit;

import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

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
		
		
		//fail("Not yet implemented");
	}
	
	
	
	/*
	 * This test all links through a depth first search, I think it would be
	 * a for loop or a while loop, (look at 422C psuedocode...)
	 * TODO:
	 */
	@Test
	void testAllLinks() {
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
		
		driver.get("https://linedrivebetting-255803.appspot.com/");

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
	@Test
	void testAllButtons() {
		
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
