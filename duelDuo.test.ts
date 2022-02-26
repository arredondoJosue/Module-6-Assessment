
import { Builder, Capabilities, By } from "selenium-webdriver"

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeEach(async () => {
    driver.get('http://localhost:3000/')
})

afterAll(async () => {
    driver.quit()
})

test('Title shows up when page loads', async () => {
    const title = await driver.findElement(By.id('title'))
    const displayed = await title.isDisplayed()
    expect(displayed).toBe(true)
})

test('clicking the draw button displays the div with id = "choises"', async () => {
    await driver.findElement(By.id("draw")).click();
    await driver.sleep(2000)
    
    const cards = await driver.findElement(By.id("choices"))
    await driver.sleep(2000)


    expect(cards).toBeTruthy()
})

test('clicking an Add to Duo button displays the div with id="player-duo"', async () => {
    await driver.findElement(By.id("draw")).click();
    await driver.sleep(2000)
    await driver.findElement(By.xpath('//button[text()="Add to Duo"]')).click()
    await driver.sleep(2000)

    const selectedCards = await driver.findElement(By.className("container"))
    await driver.sleep(2000)
    

    expect(selectedCards).toBeTruthy()
})