import {Age} from './age'
import {Gender} from './gender'
import {Language} from './language'
export interface Profiles {
  id?: string;
  username: string;
  bio: string;
  avatar_url: string;
  created_at?: string;
  updated_at?: string;
  age: number | Age;
  gender: number | Gender;
  language: number | Language;
}