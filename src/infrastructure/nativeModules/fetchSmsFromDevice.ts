import { Message } from "@/domain/entities/Message";
import { SmsRepository } from "@/domain/repositories/SmsRepositories";
import fetchSmsFromDevice from "@/infrastructure/services/fetchSmsFromDevice";

export class SmsRepositoryImpl implements SmsRepository {
  async fetchSms(filter?: Record<string, any>): Promise<Message[]> {
    return fetchSmsFromDevice(filter);
  }
}
