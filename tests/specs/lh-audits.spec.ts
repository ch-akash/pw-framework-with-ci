import { chromium, test } from "@playwright/test";
import config from "lighthouse/core/config/desktop-config.js";
import { playAudit } from "playwright-lighthouse";
import {
  launchChromeForAudit,
  lhAudit,
} from "../../src/utils/lh-audit-util.ts";
import { TestTags } from "../../src/constants/test-tags.ts";
import {
  AnnotationDescription,
  AnnotationsType,
} from "../../src/constants/annotations.ts";

test(
  "Lighthouse Audit for Home Page(Non Logged-in)",
  {
    tag: [TestTags.LIGHTHOUSE_AUDIT, TestTags.PERFORMANCE],
    annotation: {
      type: AnnotationsType.PERFORMANCE,
      description: AnnotationDescription.PERFORMANCE,
    },
  },
  async ({ browserName }) => {
    test.skip(
      browserName !== "chromium",
      "LH Audit is only supported on Chromium"
    );

    const browser = await launchChromeForAudit(9222);
    const page = await browser.newPage();
    //Open the page you need to audit.
    await page.goto("/");
    await lhAudit(page, 9222, config);
    //Close the browser after audit.
    browser.close();
  }
);
