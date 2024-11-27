import { SmsMessage } from "@/domain/entities/Message";
import { SmsRepository } from "@/domain/repositories/SmsRepositories";

export class FetchSmsUseCase {
  private smsRepository: SmsRepository;

  constructor(smsRepository: SmsRepository) {
    this.smsRepository = smsRepository;
  }

  async execute(filter?: Record<string, any>): Promise<SmsMessage[]> {
    const messages = this.smsRepository.fetchSms(filter);

    return messages;
  }
}
