import { useEffect } from 'react';
import { Toaster, toast } from 'sonner@2.0.3';

export function Toast() {
  return <Toaster position="top-center" richColors />;
}

export { toast };