export interface TelegramMessage {
  message_id: number;
  text: string;
  chat: {
    id: number;
    first_name: string;
    username: string;
  };
}
