interface Employee {
  profile: File | null;
  work_email: string;
  email: string;
  first_name: string;
  last_name: string;
  display_name: string;
  phone_number: string;
  gender: "male" | "female" | "other";
  DOB: string;
  job_title: string;
  department: string;
  type: string;
  level: string;
  DOJ: string;
  location: string;
  salary: number;
  frequency: string;
  supervisor: string;
  shift: string;
  leaves: {
    annual: number;
    sick: number;
  };
  password: string;
}

interface EmployeeWithId extends Employee {
  id: number;
  profile: string;
}
