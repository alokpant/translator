import { Message } from "@/domain/entities/Message";
import { SmsRepository } from "@/domain/repositories/SmsRepositories";
import { FetchSmsUseCase } from "@/usecases/FetchSmsUseCase";
import { describe, expect, it, vi } from "vitest";

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    body: 'Hi! How are you doing?',
    sender: '1234567890',
    timestamp: 1627948800,
    read: false,
  },
  {
    id: '2',
    body: 'I am doing great! How about you?',
    sender: '0987654321',
    timestamp: 1627949800,
    read: false,
  }
];

const FILTER_MOCK = { read: 0 };

describe('FetchSmsUseCase', () => {
  it('should fetch unread messages', async () => {
    const mockSmsRepository: SmsRepository = {
      fetchSms: vi.fn().mockResolvedValue(MOCK_MESSAGES)
    }
    const fsUseCase = new FetchSmsUseCase(mockSmsRepository);
    const messages = await fsUseCase.execute(FILTER_MOCK);

    expect(messages).toEqual(MOCK_MESSAGES);
    expect(mockSmsRepository.fetchSms).toHaveBeenCalledWith(FILTER_MOCK);
  });

  it('should throw an error when fetching messages fails', async () => {
    const mockSmsRepository: SmsRepository = {
      fetchSms: vi.fn().mockRejectedValue(new Error('Failed to fetch messages'))
    }

    const fsUseCase = new FetchSmsUseCase(mockSmsRepository);
    const messages = fsUseCase.execute(FILTER_MOCK);

    expect(messages).rejects.toThrowError('Failed to fetch messages');
    expect(mockSmsRepository.fetchSms).toHaveBeenCalledWith(FILTER_MOCK);
  });
});
