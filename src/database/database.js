import uuid from 'uuid/v1';

function mapUser(value) {
  const firstName = value.name.first.charAt(0).toUpperCase() + value.name.first.slice(1);
  const lastName = value.name.last.charAt(0).toUpperCase() + value.name.last.slice(1);
  const name = `${firstName} ${lastName}`;
  return {
    id: uuid(),
    name,
    email: value.email,
    phone: value.phone
  };
}

export default async function getUsers() {
  const response = await fetch('https://randomuser.me/api/?results=20');
  const { results } = await response.json();
  return results.map(mapUser);
}