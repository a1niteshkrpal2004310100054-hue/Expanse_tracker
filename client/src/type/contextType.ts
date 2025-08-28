// types.ts
export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
}
