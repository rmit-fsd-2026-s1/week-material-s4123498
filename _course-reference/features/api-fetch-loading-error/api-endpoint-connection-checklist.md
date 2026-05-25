# API Endpoint Connection Checklist

Use this when the business case gives you an API service URL.

## Step 1: Test In Postman First

Before writing React code, test the endpoint in Postman.

Check:

```text
1. What is the base URL?
2. What is the path?
3. Is it GET, POST, PUT, or DELETE?
4. Does it need headers?
5. Does POST need a JSON body?
6. What JSON shape comes back?
7. What happens when the request fails?
```

Example:

```text
Base URL: http://localhost:3001/api
GET:      /laptops
POST:     /loan-requests
```

Full URLs:

```text
http://localhost:3001/api/laptops
http://localhost:3001/api/loan-requests
```

## Step 2: Put API Calls In `src/api/api.ts`

Do not put fetch code directly everywhere in your components.

```text
src/api/api.ts       -> API functions
src/components/Form  -> calls API function
src/pages/Requests   -> calls API function or localStorage
```

## Fetch GET Pattern

```ts
export type LaptopModel = {
  id: number;
  name: string;
  dailyRate: number;
};

const API_BASE_URL = "http://localhost:3001/api";

export async function getLaptopModels(): Promise<LaptopModel[]> {
  const response = await fetch(`${API_BASE_URL}/laptops`);

  if (!response.ok) {
    throw new Error("Could not load laptop models");
  }

  return response.json();
}
```

Component use:

```ts
useEffect(() => {
  async function loadLaptopModels() {
    try {
      const data = await getLaptopModels();
      setLaptopModels(data);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  }

  loadLaptopModels();
}, []);
```

## Fetch POST Pattern

```ts
export type LoanRequest = {
  id?: number;
  studentName: string;
  studentEmail: string;
  laptopModel: string;
  startDate: string;
  numberOfDays: number;
  reason: string;
};

export async function postLoanRequest(
  request: LoanRequest
): Promise<LoanRequest> {
  const response = await fetch(`${API_BASE_URL}/loan-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Could not submit loan request");
  }

  return response.json();
}
```

Component use:

```ts
async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const errors = validateLoanRequest(formData);
  setErrors(errors);

  if (errors.length > 0) {
    return;
  }

  try {
    const result = await postLoanRequest(formData);
    setResultMessage(`Submitted for ${result.studentName}`);
  } catch (error) {
    setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
  }
}
```

## Axios Option

Only use Axios if it is installed or you are allowed to install it.

Install:

```powershell
npm install axios
```

API file:

```ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export async function getLaptopModels(): Promise<LaptopModel[]> {
  const response = await api.get("/laptops");
  return response.data;
}

export async function postLoanRequest(
  request: LoanRequest
): Promise<LoanRequest> {
  const response = await api.post("/loan-requests", request);
  return response.data;
}
```

## Memory Rules

```text
GET on page load       -> useEffect
POST after submit      -> handleSubmit
API URL works first    -> test in Postman
fetch code location    -> src/api/api.ts
component job          -> state, loading, errors, display
```

