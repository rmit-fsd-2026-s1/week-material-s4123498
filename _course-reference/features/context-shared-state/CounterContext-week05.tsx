import { createContext, useContext, ReactNode } from "react";

type CounterContextType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const CounterContext = createContext<CounterContextType | undefined>(undefined);
// we create a context using the createContext function from React,
// we specify that the context will be of type CounterContextType, which we defined earlier as an object containing the count, increment, and decrement properties
// we also set the default value of the context to undefined, 
// this is because we want to enforce that the context must be provided by a CounterProvider component, 
// and if it is not provided, we will throw an error when trying to use the context


type CounterProviderProps = {
  children: ReactNode; // ReactNode is a type that represents any valid React child, 
  // such as a string, number, element, or an array of these types. 
  // It is used here to specify that the children prop 
  // can accept any valid React content that will be rendered within the CounterProvider component.
  value: CounterContextType; // value is a prop that we will pass to the CounterProvider component, 
  // it will be of type CounterContextType, 
  // which we defined earlier as an object containing the count, increment, and decrement properties. 
  // This value will be provided to any components that consume the CounterContext, 
  // allowing them to access the current count and the functions to increment and decrement it.
};

export function CounterProvider({ children, value }: CounterProviderProps) {
  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  ); 
// the CounterProvider component is a wrapper component that uses the CounterContext.
// Provider to provide the context value to its children,
// it takes in the children and value props, and renders the children within the CounterContext.
// Provider, passing the value prop to the provider 
// so that it can be accessed by any components that consume the context

}

export function useCounter() { // EXAMPLE OF CUSTOM HOOK
  const context = useContext(CounterContext); //THE CONSUMER
  // the useCounter hook is a custom hook that uses the useContext hook to access the CounterContext,
  // it checks if the context is undefined, which means that the hook is being used outside of a CounterProvider,

  if (context === undefined) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;


}
