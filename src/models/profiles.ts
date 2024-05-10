import {Age} from './age'
import {Gender} from './gender'
export interface Profiles {
  id?: string;
  username: string;
  bio: string;
  avatar_url: string;
  created_at?: string;
  updated_at?: string;
  age: number | Age;
  gender: number | Gender;
}