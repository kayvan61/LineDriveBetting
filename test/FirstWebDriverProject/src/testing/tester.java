package testing;
import org.openqa.selenium.By;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;
import org.openqa.selenium.support.ui.Select;



public class tester {
	
	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		driver.get("https://linedrivebetting-255803.appspot.com/");

			//driver.findElement(By.linkText("Log-in")).click();
			List<WebElement> allLinks = driver.findElements(By.tagName("a"));
			System.out.println("There are " + allLinks.size() + " links");
			for(WebElement c: allLinks) {
				
				System.out.print(c.getText());
				System.out.println(" " + c.getAttribute("href"));
			}
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

