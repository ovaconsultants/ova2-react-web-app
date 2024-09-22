const API_URL = 'https://praveer-001-site5.ctempurl.com/api/ContactUs';

export const getContacts = async() => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch contacts');
    }
    return await response.json();
};
