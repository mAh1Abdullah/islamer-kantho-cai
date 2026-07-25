'use client';

import { useEffect, useState } from 'react';

/** True only after client mount. Use to gate client-only UI (e.g. widgets reading localStorage/geolocation). */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
