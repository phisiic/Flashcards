import { API_URL } from "../../../config";

export const login = async (email: string, user_name: string, password: string) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      ContentType: "application/json",
      Authorization: 'Basic ' + window.btoa(email + ":" + user_name + ":" + password),
    },
    credentials: 'include',
  });

  if (response.status !== 200) throw new Error('Login failed');
  return await response.text();

}
