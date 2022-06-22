const { test, expect } = require("@playwright/test");
const fs = require("fs");

const regionalLinks = [
  {
    name: "NCR/Metro Manila",
    url: "https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-metro-manila",
  },
  {
    name: "South Luzon",
    url: "https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-south-luzon",
  },
  {
    name: "North Luzon",
    url: "https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-north-luzon",
  },
  {
    name: "Visayas",
    url: "https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-visayas",
  },
  {
    name: "Mindanao",
    url: "https://www.doe.gov.ph/oil-monitor?q=retail-pump-prices-mindanao",
  },
];
let reports = [];
let cookieJson = null;
const REPORTS_DIRECTORY =
  process.env.REPORTS_DIRECTORY || __dirname + "/../reports";

let page;

test.describe.configure({ mode: "serial" });

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  if (reports.length > 0) {
    // Report in JSON format
    fs.writeFileSync(
      `${REPORTS_DIRECTORY}/${new Date()
        .toISOString()
        .slice(0, 10)}_retail_pump.json`,
      JSON.stringify(reports)
    );
    console.log("Reports saved!");
  } else {
    console.log("No reports found");
  }
  if (cookieJson !== null) {
    fs.writeFileSync(__dirname + "/cookies.json", cookieJson);
  }
  await page.close();
});

regionalLinks.forEach((link) => {
  test.describe("Retailing pump prices", () => {
    test(`Source: ${link.url}`, async ({ page, context }) => {
      let report = {
        name: link.name,
        url: link.url,
      };
      await page.goto(link.url, { timeout: 30000 * 2 });
      // await page.waitForTimeout(7000);
      await page.waitForSelector("#page-title", ".block__title");
      const title = page.locator("#page-title");
      // Get the latest of table data
      // TODO Iterate over the table data
      const description = await page
        .locator("td.views-field-title")
        .nth(0)
        .textContent();

      // There could be many attachments
      const attachments = await page.locator(
        "td.views-field-field-attachment >> nth=0 >> .file a"
      );
      let attachmentLinks = await attachments.evaluateAll((list) =>
        list.map((element) => [element.textContent, element.href])
      );
      report["description"] = description.trim();
      report["attachments"] = attachmentLinks;
      reports.push(report);

      // Get cookie data
      if (cookieJson === null) {
        const storageState = await context.storageState();
        const cookies = storageState.cookies;
        cookies.forEach((cookie) => {
          if (cookie.expires === -1) {
            delete cookie.expires; // Optional in Go cookie
          }
        });
        cookieJson = JSON.stringify(cookies);
      }
    });
  });
});
