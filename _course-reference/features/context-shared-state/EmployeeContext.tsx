import { createContext, useContext, useState, ReactNode } from "react";

interface Employee {
  id: number;
  name: string;
  salary: number;
}

interface EmployeeContextType {
  employees: Employee[];
  updateSalary: (id: number, newSalary: number) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(
  undefined
);

export function EmployeeProvider({ children }: { children: ReactNode }) {

  // The EmployeeProvider component is responsible for managing the state of the employee data
  // and providing it to the rest of the application through the context.
  // It initializes the employee data using the useState hook and defines a function to update an employee's salary. 
  // The context value includes both the list of employees and the function to update their salaries, 
  // allowing any component that consumes this context to access and modify the employee data as needed.  
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, name: "John Doe", salary: 50000 },
    { id: 2, name: "Jane Smith", salary: 60000 },
    { id: 3, name: "Bob Johnson", salary: 55000 },
  ]);

  const updateSalary = (id: number, newSalary: number) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, salary: newSalary } : emp
      )
    );
  };

  return (
    <EmployeeContext.Provider value={{ employees, updateSalary }}>
      {children} // Render the children components that will consume this context
    </EmployeeContext.Provider> // Provide the context value to the children components
    // The value provided to the context includes the list of employees and the function to update their salaries
    // This allows any component that consumes this context to access the employees and update their salaries 
    // without needing to pass props down through multiple levels of the component tree

  );
}

export function useEmployeeContext() {
  const context = useContext(EmployeeContext);
  
  if (context === undefined) {
    throw new Error(
      "useEmployeeContext must be used within an EmployeeProvider"
    );
  }
  console.log("EmployeeContext value:", context); // Log the context value to verify it's being accessed correctly
  console.log("Employees in context:", context.employees); // Log the employees to verify they are being accessed correctly
  return context;
}
