import { atomWithStorage } from 'jotai/utils';

// Atoms with storage for persistence across page reloads
export const usernameAtom = atomWithStorage('username', ''); // Default empty string for username
export const roleIdAtom = atomWithStorage('roleId', ''); // Default empty string for roleId
export const registrationIdAtom = atomWithStorage('registrationId', ''); // Default empty string for registrationId
export const roleNameAtom = atomWithStorage('roleName', ''); // Default empty string for roleName
export const userImageAtom = atomWithStorage('userImage', ''); // Default empty string for userImage
