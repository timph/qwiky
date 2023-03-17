import { component$, Slot, useContextProvider, useStore } from '@builder.io/qwik';
import { USER_CTX, initUserProfile } from '~/state/userProfile';

export default component$(() => {
  const userData = useStore(initUserProfile);
  useContextProvider(USER_CTX, userData);
  
  return <><Slot /></>;
})

