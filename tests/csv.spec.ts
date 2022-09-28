import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import dayjs from "dayjs";
import { parseFileContent } from "../src/utilities/file";

const THIS_MONTH = dayjs().format("MMMM");

const PATH_TO_EMPLOYEE_DATA_CSV_FILE = path.join(
  __dirname,
  "../employee_data/employee_data.csv"
);
const PATH_TO_THIS_MONTH_EMPLOYEE_BIRTHDAYS_CSV_FILE = path.join(
  __dirname,
  `../employee_data/employee_${THIS_MONTH}_birthdays.csv`
);
const PATH_TO_DOWNLOAD_DIRECTORY = path.join(
  __dirname,
  `./data/downloaded_employee_${THIS_MONTH}_birthdays.csv`
);

/**
 * NOTE: there needs to be an accompanying `employee_data.csv`
 * and `employee_${THIS_MONTH}_birthdays.csv` file in the
 * `../employee_data` directory as one requirement for these
 * tests to pass. The tests will use those files to test against
 * either other file(s) or the UI.
 *
 * If either of those files do not exist, please follow the steps
 * in the README's Usage or Tests sections to make them.
 */
test.describe("CSV", () => {
  test.beforeEach(async ({ page }) => {
    // go to home page before each test
    await page.goto("http://localhost:5173/");
  });

  test("Upload CSV file", async ({ page }) => {
    // click button to upload and parse CSV file
    const uploadButton = page.locator("[data-test-upload-file-button]");
    await uploadButton.click();

    // set CSV file into input
    // NOTE: on `setInputFiles()` will trigger the file upload; _not_
    // the `uploadButton.click()` above. That simply opens the file explorer.
    const inputFile = await page
      .locator("[data-test-input-file]")
      .setInputFiles(PATH_TO_EMPLOYEE_DATA_CSV_FILE);

    // expect to see "Generate a new list" button and that it has the proper text
    const generateNewListButton = page.locator(
      "[data-test-gen-new-list-button]"
    );
    await expect(generateNewListButton).toBeVisible();
    await expect(generateNewListButton).toHaveText("Generate a new list");

    // expect to see "Export into CSV file" button and that it has the proper text
    const exportCSVButton = page.locator("[data-test-export-csv-button]");
    await expect(exportCSVButton).toBeVisible();
    await expect(exportCSVButton).toHaveText("Export as CSV");

    // expect generated list to contain all employees that have a birthday this month
    // (i.e., the generated list will be tested against the employees listed in
    // `PATH_TO_THIS_MONTH_EMPLOYEE_BIRTHDAYS_CSV_FILE` file)
    const employeeList = page.locator("[data-test-employee-list]");
    const thisMonthEmployeeBirthdaysCSVData = fs
      .readFileSync(PATH_TO_THIS_MONTH_EMPLOYEE_BIRTHDAYS_CSV_FILE)
      .toString();
    const employees = parseFileContent(thisMonthEmployeeBirthdaysCSVData);
    for (const employee of employees) {
      await expect(employeeList).toContainText(employee.name);
    }
  });

  test("Upload CSV file and then download filtered CSV file", async ({
    page,
  }) => {
    // click button to upload and parse CSV file
    const uploadButton = page.locator("[data-test-upload-file-button]");
    await uploadButton.click();

    // set CSV file into input
    // NOTE: on `setInputFiles()` will trigger the file upload; _not_
    // the `uploadButton.click()` above. That simply opens the file explorer.
    const inputFile = await page
      .locator("[data-test-input-file]")
      .setInputFiles(PATH_TO_EMPLOYEE_DATA_CSV_FILE);

    // expect to see "Generate a new list" button and that it has the proper text
    const generateNewListButton = page.locator(
      "[data-test-gen-new-list-button]"
    );
    await expect(generateNewListButton).toBeVisible();
    await expect(generateNewListButton).toHaveText("Generate a new list");

    // expect to see "Export into CSV file" button and that it has the proper text
    const exportCSVButton = page.locator("[data-test-export-csv-button]");
    await expect(exportCSVButton).toBeVisible();
    await expect(exportCSVButton).toHaveText("Export as CSV");

    // download/export CSV file
    const [download] = await Promise.all([
      // start waiting for the download
      page.waitForEvent("download"),
      // perform the action that initiates download
      exportCSVButton.click(),
    ]);

    // save downloaded file as `PATH_TO_DOWNLOAD_DIRECTORY`
    await download.saveAs(PATH_TO_DOWNLOAD_DIRECTORY);

    // expect downloaded CSV file to contain only employees that have a birthday this month
    // (i.e., test against CSV file that contains only employees that have a
    // birthday this month — filtered from `PATH_TO_EMPLOYEE_DATA_CSV_FILE` file)
    const thisMonthEmployeeBirthdaysCSVData = fs
      .readFileSync(PATH_TO_THIS_MONTH_EMPLOYEE_BIRTHDAYS_CSV_FILE)
      .toString();
    const downloadedThisMonthEmployeeBirthdaysCSVData = fs
      .readFileSync(PATH_TO_DOWNLOAD_DIRECTORY)
      .toString();
    expect(downloadedThisMonthEmployeeBirthdaysCSVData).toEqual(
      thisMonthEmployeeBirthdaysCSVData
    );
  });
});
