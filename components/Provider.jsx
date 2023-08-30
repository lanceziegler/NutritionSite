'use client';
import { SessionProvider } from 'next-auth/react';

//! "We are using the browser's capabilities, so we need use client"

//! This is a higher-order component, AKA we will wrap other components with it
const Provider = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
