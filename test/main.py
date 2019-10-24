from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import Select
import re


def main():    
    options = webdriver.FirefoxOptions()
    options.add_argument('-headless')
    driver = webdriver.Firefox(options=options)

    #driver.get('http://www.espn.com/nfl/lines')
            
    driver.close()


if __name__ == "__main__":
    main()

