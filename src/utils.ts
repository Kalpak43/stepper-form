import { supabase } from "./supbase";
import * as Yup from "yup";

export const checkAdmin = async (): Promise<boolean> => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return false;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    console.error("Error fetching user role:", profileError?.message);
    return false;
  }

  return profile.role === "admin";
};

const uploadProfileImage = async (file: File) => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `profiles/${fileName}`;

  const { error } = await supabase.storage
    .from("employees")
    .upload(filePath, file);

  if (error) {
    console.error("Error uploading profile image:", error.message);
    return null;
  }

  console.log("IMage upload successful");

  // Get the public URL of the uploaded image
  const { data: urlData } = supabase.storage
    .from("employees")
    .getPublicUrl(filePath);
  return urlData.publicUrl;
};

const signupUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error || !data.user) return null;

  return data.user.id;
};

export const saveEmployeeData = async (employee: Employee) => {
  const uuid = await signupUser(employee.work_email, employee.password);

  if (!uuid)
    return {
      success: false,
      error: "Unable to register user",
    };

  console.log(0);
  let profileUrl = null;

  console.log(1);

  if (employee.profile) {
    profileUrl = await uploadProfileImage(employee.profile);
    console.log(2);
    if (!profileUrl) {
      console.error("Failed to upload profile image.");
      console.log(3);
      return;
    }
  }

  console.log(4);
  const { error } = await supabase.from("employees").insert([
    {
      profile: profileUrl,
      work_email: employee.work_email,
      email: employee.email,
      first_name: employee.first_name,
      last_name: employee.last_name,
      display_name: employee.display_name,
      phone_number: employee.phone_number,
      gender: employee.gender,
      DOB: employee.DOB,
      job_title: employee.job_title,
      department: employee.department,
      type: employee.type,
      level: employee.level,
      DOJ: employee.DOJ,
      location: employee.location,
      salary: employee.salary,
      frequency: employee.frequency,
      supervisor: employee.supervisor,
      shift: employee.shift,
      leaves: employee.leaves,
      password: employee.password, // Ideally, hash this before storing
      uuid: uuid,
    },
  ]);
  console.log(5);

  if (error) {
    return {
      success: false,
      error: "Unable to register user",
    };
  } else {
    return {
      success: true,
      error: null,
      employee: {
        ...employee,
        profile: profileUrl,
      } as EmployeeWithId,
    };
  }
};

export const fetchEmployees = async () => {
  const { data, error } = await supabase.from("employees").select("*");

  if (error) {
    console.error("Error fetching employees:", error.message);
    return [];
  }

  return data;
};

export const fetchEmployeeFromId = async (id: string) => {
  const { data, error } = await supabase
    .from("employees")
    .select("*") // Select all columns, modify if needed
    .eq("uuid", id) // Filter by UUID column
    .single(); // Ensure we get only one record

  if (error) {
    console.error("Error fetching employee:", error);
    return null;
  }

  return data;
};

export const editEmployeeData = async (employee: EditableEmployee) => {
  // const uuid = await signupUser(employee.work_email, employee.password);

  // if (!uuid)
  //   return {
  //     success: false,
  //     error: "Unable to register user",
  //   };

  if (employee.profile && employee.profile instanceof File) {
    let profileUrl = null;

    profileUrl = await uploadProfileImage(employee.profile);
    console.log(2);
    if (!profileUrl) {
      console.error("Failed to upload profile image.");
      console.log(3);
      return {
        success: false,
        error: "Unable to register user",
      };
    }

    employee.profile = profileUrl;
  }

  console.log(4);
  const { error } = await supabase
    .from("employees")
    .update([
      {
        profile: employee.profile,
        work_email: employee.work_email,
        email: employee.email,
        first_name: employee.first_name,
        last_name: employee.last_name,
        display_name: employee.display_name,
        phone_number: employee.phone_number,
        gender: employee.gender,
        DOB: employee.DOB,
        job_title: employee.job_title,
        department: employee.department,
        type: employee.type,
        level: employee.level,
        DOJ: employee.DOJ,
        location: employee.location,
        salary: employee.salary,
        frequency: employee.frequency,
        supervisor: employee.supervisor,
        shift: employee.shift,
        leaves: employee.leaves,
        password: employee.password, // Ideally, hash this before storing
        uuid: employee.uuid,
      },
    ])
    .eq("uuid", employee.uuid);
  console.log(5);

  if (error) {
    return {
      success: false,
      error: "Unable to register user",
    };
  } else {
    return {
      success: true,
      error: null,
      employee: {
        ...employee,
      } as EmployeeWithId,
    };
  }
};

export const deleteEmployee = async (id: string) => {
  const { error } = await supabase.from("employees").delete().eq("uuid", id);

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  } else {
    return {
      success: true,
      error: null,
    };
  }
};

export const stepSchemas = [
  // Step 1: Basic Information
  Yup.object({
    profile: Yup.mixed()
      .test("fileRequired", "Profile image is required", (value) => !!value)
      .test("fileType", "Only images are allowed", (value) => {
        if (typeof value === "string") {
          // If it's a URL, assume it's valid
          return true;
        }
        if (value instanceof File) {
          return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
        }
        return false; // Neither a file nor a URL
      }),
    email: Yup.string().email("Invalid email"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    display_name: Yup.string().required("Display name is required"),
    phone_number: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
      .required("Phone number is required"),
    gender: Yup.mixed<"male" | "female" | "other">()
      .oneOf(["male", "female", "other"], "Invalid gender")
      .required("Gender is required"),
    DOB: Yup.string()
      .test("valid-date", "Invalid date", (value) =>
        value ? !isNaN(new Date(value).getTime()) : false
      )
      .test("max-date", "DOB cannot be in the future", (value) =>
        value ? new Date(value) <= new Date() : false
      )
      .required("Date of Birth is required"),
    work_email: Yup.string()
      .email("Invalid work email")
      .required("Work email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      )
      .required("Password is required"),
  }),

  // Step 2: Job Details
  Yup.object({
    job_title: Yup.string().required("Job title is required"),
    department: Yup.string().required("Department is required"),
    type: Yup.string().required("Employement Type is required"),
    level: Yup.mixed<"junior" | "mid" | "senior" | "lead">()
      .oneOf(["junior", "mid", "senior", "lead"], "Invalid level")
      .required("Level is required"),
    DOJ: Yup.string()
      .test("valid-date", "Invalid date", (value) =>
        value ? !isNaN(new Date(value).getTime()) : false
      )
      .test("min-date", "DOB cannot be in the past", (value) =>
        value ? new Date(value) >= new Date() : false
      )
      .required("Date of Birth is required"),
    location: Yup.mixed<"office" | "remote" | "hybrid" | "">()
      .oneOf(["office", "remote", "hybrid"], "Invalid location")
      .required("Location is required"),
    salary: Yup.number()
      .min(0, "Salary must be at least 0")
      .required("Salary is required"),
    frequency: Yup.mixed<"monthly" | "weekly" | "biweekly">()
      .oneOf(["monthly", "weekly", "biweekly"], "Invalid Salary frequency")
      .required("Salary frequency is required"),
    supervisor: Yup.string().required("Supervisor is required"),
  }),

  // Step 3: Salary & Leave
  Yup.object({
    shift: Yup.mixed<"day" | "night" | "flexible">()
      .oneOf(["day", "night", "flexible"], "Invalid Shift")
      .required("Shift is required"),
    leaves: Yup.object().shape({
      annual: Yup.number()
        .integer("Annual leaves must be an integer")
        .min(0, "Annual leaves cannot be negative")
        .required("Annual leaves are required"),
      sick: Yup.number()
        .integer("Sick leaves must be an integer")
        .min(0, "Sick leaves cannot be negative")
        .required("Sick leaves are required"),
    }),
  }),
];

export const createEmployeeSchema = [
  // Step 1: Basic Information
  Yup.object({
    profile: Yup.mixed()
      .test("fileRequired", "Profile image is required", (value) => !!value)
      .test("fileType", "Only images are allowed", (value) =>
        value
          ? ["image/jpeg", "image/png", "image/gif"].includes(
              (value as File).type
            )
          : true
      ),
    email: Yup.string().email("Invalid email"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    display_name: Yup.string().required("Display name is required"),
    phone_number: Yup.string()
      .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
      .required("Phone number is required"),
    gender: Yup.mixed<"male" | "female" | "other">()
      .oneOf(["male", "female", "other"], "Invalid gender")
      .required("Gender is required"),
    DOB: Yup.string()
      .test("valid-date", "Invalid date", (value) =>
        value ? !isNaN(new Date(value).getTime()) : false
      )
      .test("max-date", "DOB cannot be in the future", (value) =>
        value ? new Date(value) <= new Date() : false
      )
      .required("Date of Birth is required"),
    work_email: Yup.string()
      .email("Invalid work email")
      .required("Work email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      )
      .required("Password is required"),
  }),

  // Step 2: Job Details
  Yup.object({
    job_title: Yup.string().required("Job title is required"),
    department: Yup.string().required("Department is required"),
    type: Yup.string().required("Employement Type is required"),
    level: Yup.mixed<"junior" | "mid" | "senior" | "lead">()
      .oneOf(["junior", "mid", "senior", "lead"], "Invalid level")
      .required("Level is required"),
    DOJ: Yup.string()
      .test("valid-date", "Invalid date", (value) =>
        value ? !isNaN(new Date(value).getTime()) : false
      )
      .test("min-date", "DOB cannot be in the past", (value) =>
        value ? new Date(value) >= new Date() : false
      )
      .required("Date of Birth is required"),
    location: Yup.mixed<"office" | "remote" | "hybrid" | "">()
      .oneOf(["office", "remote", "hybrid"], "Invalid location")
      .required("Location is required"),
    salary: Yup.number()
      .min(0, "Salary must be at least 0")
      .required("Salary is required"),
    frequency: Yup.mixed<"monthly" | "weekly" | "biweekly">()
      .oneOf(["monthly", "weekly", "biweekly"], "Invalid Salary frequency")
      .required("Salary frequency is required"),
    supervisor: Yup.string().required("Supervisor is required"),
  }),

  // Step 3: Salary & Leave
  Yup.object({
    shift: Yup.mixed<"day" | "night" | "flexible">()
      .oneOf(["day", "night", "flexible"], "Invalid Shift")
      .required("Shift is required"),
    leaves: Yup.object().shape({
      annual: Yup.number()
        .integer("Annual leaves must be an integer")
        .min(0, "Annual leaves cannot be negative")
        .required("Annual leaves are required"),
      sick: Yup.number()
        .integer("Sick leaves must be an integer")
        .min(0, "Sick leaves cannot be negative")
        .required("Sick leaves are required"),
    }),
  }),
];
