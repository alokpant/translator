import { SmsMessage } from "@/domain/entities/Message";
import { SmsRepositoryImpl } from "@/infrastructure/nativeModules/fetchSmsFromDevice";
import { FetchSmsUseCase } from "@/usecases/FetchSmsUseCase";

const smsRepository = new SmsRepositoryImpl();
const fetchSmsUseCase = new FetchSmsUseCase(smsRepository)
const UNREAD_MESSAGES = 0;

export default async function loadSms(): Promise<SmsMessage[]> {
  try {
    // Fetch unread messages
    const messages = await fetchSmsUseCase.execute({ read: UNREAD_MESSAGES });
    // console.log('')
    // console.log('')
    // console.log('')
    // console.log(messages);
    // console.log('')
    // console.log('')
    // console.log('')
    return messages;
  } catch (error) {
    console.error('Error loading SMS', error);
  }
}
