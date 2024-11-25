import { Message } from "../entities/Message";

export interface SmsRepository {
  fetchSms(filter?: Record<string, any>): Promise<Array<Message>>;
}
