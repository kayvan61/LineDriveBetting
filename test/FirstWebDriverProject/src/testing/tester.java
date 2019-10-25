package testing;
import org.openqa.selenium.By;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.support.ui.Select;
import java.net.HttpURLConnection;
import java.net.URL;


public class tester {
	
	public static void main(String[] args) {
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
					System.out.println(c + "Link is broken");
				}else {
					System.out.println(c + "Link is working");
				}
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
				driver.navigate().back();
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
//				try{
//				HttpURLConnection huc = (HttpURLConnection)(new URL(c.getAttribute("href")).openConnection());
//				huc.setRequestMethod("HEAD");
//					//huc.connect();
////					
//					int respCode = huc.getResponseCode();
//					if(respCode >= 400) {
//						System.out.println(c.getAttribute("href") +" is a broken link");
//						
//					}else {
//						System.out.println(c.getAttribute("href") + " is a valid link");
//					}
//				}catch(Exception e) {
//					System.out.println("unhandled IO exception");
//				}
				
				//driver.navigate().back();
//				try{
//					HttpURLConnection huc = (HttpURLConnection)(new URL(c.getAttribute("href")).openConnection());
//					huc.setRequestMethod("HEAD");
//					//huc.connect();
//					
//					int respCode = huc.getResponseCode();
//					if(respCode >= 400) {
//						System.out.println(c.getAttribute("href") +" is a broken link");
//						
//					}else {
//						System.out.println(c.getAttribute("href") + " is a valid link");
//					}
//				}catch(Exception e) {
//					System.out.println("unhandled IO exception");
//				}
//				driver.navigate().back();
				
			
			}
			driver.quit();
		//testLogin();
	}
	public static void testLogin()

	{
//		System.setProperty("webdriver.gecko.driver","C:\\Users\\15128\\Documents\\EE461L\\FirstWebDriverProject\\lib\\geckodriver.exe");
//		WebDriver driver = new FirefoxDriver();
//		
//		driver.get("https://linedrivebetting-255803.appspot.com/");
//
//			driver.findElement(By.linkText("Log-in")).click();

		/*driver.findElement(By.name("firstName")).sendKeys("User1");

		driver.findElement(By.name("lastName")).sendKeys("Surname1");

		driver.findElement(By.name("phone")).sendKeys("123456789");

		driver.findElement(By.name("userName")).sendKeys("user1@test.com");

		driver.findElement(By.name("address1")).sendKeys("Test Address");

		driver.findElement(By.name("city")).sendKeys("Test City");

		Select select = new Select(driver.findElement(By.name("country")));

	       select.selectByVisibleText("ANGOLA");

	       driver.findElement(By.name("email")).sendKeys("user1@test.com");

	       driver.findElement(By.name("password")).sendKeys("user1");

	       driver.findElement(By.name("confirmPassword")).sendKeys("user1");

	       driver.findElement(By.name("register")).click();

	       driver.close();

	       driver.quit();*/

	}
	

	}

