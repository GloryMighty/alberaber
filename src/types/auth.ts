
import { User } from "@supabase/supabase-js";

export type AuthUser = User | null;

export interface AuthContextType {
  user: AuthUser;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
