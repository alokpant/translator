import { SmsRepositoryImpl } from "@/infrastructure/nativeModules/fetchSmsFromDevice";
import { FetchSmsUseCase } from "@/usecases/FetchSmsUseCase";
import { useEffect } from "react";

const smsRepository = new SmsRepositoryImpl();
const fetchSmsUseCase = new FetchSmsUseCase(smsRepository)
const UNREAD_MESSAGES = 0;

async function loadSms() {
  try {
    // Fetch unread messages
    const messages = await fetchSmsUseCase.execute({ read: UNREAD_MESSAGES });
    console.log(messages);
    return messages;
  } catch (error) {
    console.error('Error loading SMS', error);
  }
}

useEffect(() => {
  loadSms();
}, []);
