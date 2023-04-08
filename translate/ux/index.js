export async function loadUX() {
    const res = await fetch('http://localhost:3000/api/translate/ux')
    const data = await res.json();
    return data;
}