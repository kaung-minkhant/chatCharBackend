import {TaskMaster} from './task_master'
export interface TaskTable {
  id?: number;
  created_at?: string;
  complete: boolean;
  token: number;
  user_id: string;
  type: number | TaskMaster;
}