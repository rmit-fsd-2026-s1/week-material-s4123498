type LaptopModel = {
  id: number;
  name: string;
  dailyRate: number;
};

type LoanRequest = {
  id: number;
  studentName: string;
  studentEmail: string;
  laptopModel: string;
  startDate: string;
  numberOfDays: number;
  reason: string;
};

export type { LaptopModel, LoanRequest };
