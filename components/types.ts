export type ViewState = 'hero' | 'features' | 'branches' | 'developers';
export type Phase = 'idle' | 'transitioning';

export interface Developer {
  id: string;
  name: string;
  nameEn: string;
  email: string;
  bio: string;
  traits: { icon: string; label: string; desc: string }[];
  skills: { label: string }[];
}
