import { Page, chromium } from "@playwright/test";
import { Config } from "lighthouse";
import { playAudit } from "playwright-lighthouse";

//Setting threshold 70 for all metrices
const thresholds = {
  performance: 70,
  accessibility: 70,
  "best-practices": 70,
  seo: 70,
  pwa: 70,
};

export async function lhAudit(page: Page, port: number, config: Config) {
  await playAudit({
    page: page,
    thresholds: thresholds,
    port: port,
    config: config,
    reports: {
      formats: {
        json: true,
        html: true,
      },
    },
  });
}

export async function launchChromeForAudit(port: number) {
  return await chromium.launch({
    args: [`--remote-debugging-port=${port}`],
  });
}

export const mobileConfig = {
  extends: "lighthouse:default",
  settings: {
    onlyCategories: ["performance"],
    emulatedFormFactor: "mobile",
    skipAudits: [
      // Skip the h2 audit so it doesn't lie to us. See https://github.com/GoogleChrome/lighthouse/issues/6539
      "uses-http2",
      // There are always bf-cache failures when testing in headless. Reenable when headless can give us realistic bf-cache insights.
      "bf-cache",
    ],
  },
};
