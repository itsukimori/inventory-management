import { cookies } from 'next/headers';

export async function getCookieValue(name: string) {
    const cookieStore = cookies();
    const cookie = cookieStore.get(name);
    return cookie?.value;
}

export async function deleteCookie(name: string) {
    const cookieStore = cookies();
    cookieStore.set(name, '', { maxAge: -1 });
}
