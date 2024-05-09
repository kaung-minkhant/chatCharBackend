export interface TokenTable {
  id?: string;
  created_at?: string;
  debit: boolean;
  token: number;
  credit_resource: number;
  task_type: number;
  user_id: string;
}