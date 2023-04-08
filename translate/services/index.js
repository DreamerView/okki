export async function loadServices() {
    const res = await fetch('http://localhost:3000/api/translate/services')
    const data = await res.json();
    return data;
}