import PuppeteerProxy from "./puppeteer-proxy";
import { Browser, Page } from "puppeteer";

const cookies = async (page: Page, puppeteerProxy: PuppeteerProxy) => {
    await page.waitForSelector('div[role="dialog"]');
    await puppeteerProxy.clickOnXpath(page, "//button[contains(., 'Accepter')]")
}

const sendMessageTo = async (username: string, message: string, page: Page, puppeteerProxy) => {
    await puppeteerProxy.openLink(page, `https://www.instagram.com/${username}/?hl=fr`);
    await puppeteerProxy.clickOnXpath(page, "//button[contains(., 'Contacter')]");
    await page.waitForNavigation();
    await puppeteerProxy.clickOnXpath(page, "//button[contains(., 'Plus tard')]");
    await page.type('textarea', message);
    await page.keyboard.press('Enter');
}

const login = async (page: Page, puppeteerProxy: PuppeteerProxy, username: string, password: string) => {
    await puppeteerProxy.openLink(page, 'https://www.instagram.com/accounts/login/?hl=fr');
    await cookies(page, puppeteerProxy);
    await page.waitForSelector('input[name="username"]');

    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

}

async function main () {
    //TODO: CATCH IT BY ENVIRONMENT VARIABLE
    const username = '____';
    const password = '____';
    const headless = false;
    const accountToMessage = '____';
    const messageToSend = '____';

    const puppeteerProxy: PuppeteerProxy = new PuppeteerProxy();
    const browser: Browser = await puppeteerProxy.getAndLaunchBrowser(headless);

    let page = null;

    try {
        page = await browser.newPage();
        await puppeteerProxy.openLink(page, 'https://www.instagram.com/accounts/login/');
        await login(page, puppeteerProxy, username, password);


        await sendMessageTo(accountToMessage, messageToSend, page, puppeteerProxy);

    } finally {
        if (page !== null) {
            await page.close();
        }
        await browser.close();
    }
}

main();