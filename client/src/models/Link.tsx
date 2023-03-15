import { ReactNode } from 'react';

export interface LinkData {
  label: string;
  to: string;
}

export interface NavLinkData extends LinkData {
  icon: ReactNode;
}
