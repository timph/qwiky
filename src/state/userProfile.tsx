import { createContext } from '@builder.io/qwik';

/**
 * Global state with this setup
 * 
 */

export interface UserProfile {
  name: string;
  theme: 'light' | 'dark';
  lastAction: string;
}

export const USER_CTX = createContext<UserProfile>('global-context-name');

export const initUserProfile:UserProfile = {
  name: 'Tim Pham',
  theme: 'light',
  lastAction: '',
}
