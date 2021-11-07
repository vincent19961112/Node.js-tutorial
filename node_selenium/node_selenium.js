const { By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const { chromedriver } = require('chromedriver')

async function example() {
 let driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
 try {
  await driver.get('https://ecvip.pchome.com.tw/login/v3/login.htm');

  await driver.findElement(By.id('loginAcc')).sendKeys('0909050645');
  await driver.findElement(By.id('loginPwd')).sendKeys('v1996103123', Key.ENTER);
  console.log('login')

  // await driver.findElement(By.xpath('//*[@id="HEADER"]/div/div[1]/a')).click();

  setTimeout(() => {

   driver.get('https://shopping.pchome.com.tw/activity/campaign/C587489046');

   setTimeout(() => {
    driver.findElement(By.xpath('//*[@id="Prod1stContainer1"]/ul/li[1]')).click();
   }, 1000);
  }, 2000);


  console.log('我沒錯')
 } catch {
  console.log('error')
 }
 // finally {
 //  await driver.quit();
 // }
}

example()