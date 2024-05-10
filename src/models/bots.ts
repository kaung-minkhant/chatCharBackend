import { BotPersonas } from "./bot_personas";
import {BotCommunicationStyles} from './bot_communication_styles'
import {BotPurposes} from './bot_purposes'
import {Language} from './language'

export interface Bots {
  id?: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  user_id: string;
  instruction: string;
  personality: number | BotPersonas;
  communication_style: number | BotCommunicationStyles;
  purpose: number | BotPurposes;
  language: number | Language;
}