import { atom } from 'jotai';
import {  atomWithStorage } from 'jotai/utils';

export const usernameAtom = atomWithStorage('');
export const roleIdAtom = atom('');
export const registrationIdAtom = atomWithStorage();
export const roleNameAtom = atom('');
export const userImageAtom = atom('');