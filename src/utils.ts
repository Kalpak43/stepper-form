import { supabase } from "./supbase";
import { jwtDecode } from "jwt-decode";

export const checkAdmin = async (): Promise<boolean> => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (!token) {
    return false;
  }

  const decodedToken = jwtDecode(token);
  //   @ts-ignore
  return decodedToken.role === "admin";
};
