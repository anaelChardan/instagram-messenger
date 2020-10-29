import {launch, LaunchOptions, FrameBase, Page, Browser, Frame} from 'puppeteer';

/**
 * Wrapper for Puppeteer
 */
class PuppeteerProxy {
    constructor(private timeout: number = 60000) {}

    /**
     * Provide a browser and launch it
     */
    public async getAndLaunchBrowser(headless: boolean = true) : Promise<Browser> {
        return await launch({timeout: this.timeout, headless: headless});
    }

    /**
     * @param browser the browser
     */
    public async getNewPage(browser: Browser): Promise<Page> {
        return await browser.newPage();
    }

    /**
     * Wrapper for puppeteer openLink
     *
     * @param {Page} container the container on which you want to open a link
     * @param {string} url the url to open
     */
    public async openLink(container: Page, url: string): Promise<void> {
        await container.goto(url, {timeout: this.timeout})
    }

    /**
     * Wrapper for puppeteer click
     *
     * @param {Page} container the container on which you want to click an element
     * @param {string} selector the element's selector you want to click
     */
    public async clickOn(container: Page, selector: string): Promise<void> {
        await this.waitForSelector(container, selector);
        await container.click(selector);
    }

    /**
     * Wrapper for puppeteer click using XPath
     *
     * @param {Page} container the container on which you want to click an element
     * @param {string} selector the element's selector you want to click
     */
    public async clickOnXpath(container: Page, selector: string): Promise<void> {
        const element = await container.waitForXPath(selector, {timeout: this.timeout})
        await element.click()
    }

    /**
     * Wrapper for puppeteer waitForSelector
     *
     * @param {FrameBase} container the container on which you want to wait an element
     * @param {string} selector the element's selector you want to wait
     */
    public async waitForSelector(container: FrameBase, selector: string): Promise<void> {
        await container.waitForSelector(selector, {visible: true, timeout: this.timeout});
    }

        /**
     * Wrapper for puppeteer waitForXpath
     *
     * @param {FrameBase} container the container on which you want to wait an element
     * @param {string} selector the element's selector you want to wait
     */
    public async waitForSelectorXpath(container: FrameBase, selector: string): Promise<void> {
        await container.waitForXPath(selector, {timeout: this.timeout});
    }
}

export default PuppeteerProxy;