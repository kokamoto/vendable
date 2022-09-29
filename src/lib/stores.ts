import { readable } from 'svelte/store';

export const user = readable({ 
  name: 'John'
});

export const auth = readable({ 
  loggedIn: true
});

