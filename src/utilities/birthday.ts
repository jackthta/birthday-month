import type { Employees } from "@/types/employee";

/**
 * Filters for employees that have a birthday in this month.
 */
export function filterCurrentMonthBirthdays(employees: Employees): Employees {
  return employees.filter((employee) => {
    const thisMonth = new Date().getMonth();
    const employeeBirthMonth = employee.birthday.getMonth();

    return employeeBirthMonth === thisMonth;
  });
}
