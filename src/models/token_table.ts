import {TaskMaster} from './task_master'
import {CreditResources} from './credit_resources'
export interface TokenTable {
  id?: string;
  created_at?: string;
  debit: boolean;
  token: number;
  credit_resource: number | CreditResources;
  task_type: number | TaskMaster;
  user_id: string;
}