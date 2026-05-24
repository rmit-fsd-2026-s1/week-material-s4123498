import { useEmployeeContext } from "../context/EmployeeContext";
import { EmployeeSalary } from "./EmployeeSalary";

export function EmployeeList() {
  const { employees } = useEmployeeContext(); // Use the custom hook to access the employee context, 
  // which provides the list of employees and the function to update their salaries.

  return (
    <div className="p-4 bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-white">Employee Salaries</h2>
      <div className="space-y-4">
        {employees.map((employee) => ( // Map over the list of employees and render a div for each employee,
          // displaying their name and salary using the EmployeeSalary component.

          <div
            key={employee.id} //
            className="border border-gray-700 p-4 rounded-lg bg-gray-800"
          >
            <h3 className="text-xl font-semibold text-white">
              {employee.name}
            </h3>
            <EmployeeSalary employeeId={employee.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
