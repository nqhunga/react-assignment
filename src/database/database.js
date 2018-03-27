export async function getUsers() {
  const response = await fetch("https://randomuser.me/api/?results=20");

  const responseData = response.json();

  return responseData;
}