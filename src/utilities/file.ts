import dayjs from "dayjs";

import type { Employees } from "@/types/employee";

const CSV_FILE_HEADERS: string[] = ["name", "birthday"];

/**
 * Parse and transform file contents into an array of `Employee`.
 */
export function parseFileContent(fileContent: string): Employees {
  // split monolithic string of employee data by carriage return and/or new line
  const employees = fileContent
    .split(/\r?\n/)

    // filter out CSV headers
    .filter((_, index) => index > 0)

    // remove quotation marks and white space
    .map((employee) => employee.replaceAll('"', "").trim())

    // split string of employee data by comma
    .map((employee) => employee.split(","))

    // mold into Employee object
    .map((employee) => {
      const [name, ...birthdayRaw] = employee;

      // raw birthday is in the form "MM DD, YYYY". the comma
      // in-between the day and year will be parsed and split.
      // place comma back to have valid date.
      const birthday = new Date(birthdayRaw.join(","));

      return { name, birthday };
    });

  return employees;
}

/**
 * Prepare `data` to be CSV file compliant.
 */
export function compileCSVData(data: Employees) {
  const csvRows = [];

  // add headers to CSV
  csvRows.push(CSV_FILE_HEADERS.join(","));

  // add employee data to CSV
  for (const row of data) {
    const values = Object.values({
      ...row,
      birthday: dayjs(row.birthday).format('["]MMMM DD, YYYY["]'),
    });

    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}
