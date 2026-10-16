'use client';

import { useEffect } from 'react';

export default function ErrorNotice({ message }: { message: string }) {
  useEffect(() => {
    window.history.replaceState(null, '', '/login');
  }, []);

  return <p role="alert" className="mt-4 text-sm text-red-700">{message}</p>;
}
