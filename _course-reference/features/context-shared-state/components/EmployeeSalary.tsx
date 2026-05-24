import { useEmployeeContext } from "../context/EmployeeContext";

interface EmployeeSalaryProps {
  employeeId: number;
}

export function EmployeeSalary({ employeeId }: EmployeeSalaryProps) {
  const { employees, updateSalary } = useEmployeeContext();
  const employee = employees.find((emp) => emp.id === employeeId);

  if (!employee) {
    return null;
  }

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-300">
        Current Salary: ${employee.salary.toLocaleString()}
      </label>
      <div className="mt-2">
        <input
          type="number"
          className="border border-gray-600 rounded px-3 py-2 bg-gray-700 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          placeholder="Enter new salary"
          onChange={(e) => updateSalary(employeeId, Number(e.target.value))}
        />
      </div>
    </div>
  ); // The EmployeeSalary component is responsible for displaying the current salary of an employee and providing an input field to update the salary.
  // It uses the useEmployeeContext hook to access the employee context, which provides the list of employees and the function to update their salaries. 
  // The component finds the employee with the given employeeId and displays their current salary. 
  // It also includes an input field that allows the user to enter a new salary, which calls the updateSalary function from the context when changed, 
  // allowing the salary to be updated in the global state and reflected across all components that consume this context. 
}
