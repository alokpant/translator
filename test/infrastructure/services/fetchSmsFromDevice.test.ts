import { Message } from "@/domain/entities/Message";
import fetchSmsFromDevice from "@/infrastructure/services/fetchSmsFromDevice";
import { PermissionsAndroid } from "react-native";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SmsAndroid from 'react-native-get-sms-android'

vi.mock('react-native-get-sms-android', () => ({
  default: {
    list: vi.fn(),
  }
}));

vi.mock('react-native', () => ({
  PermissionsAndroid: {
    PERMISSIONS: {
      READ_EXTERNAL_STORAGE: true,
      READ_SMS: true,
      WRITE_EXTERNAL_STORAGE: true,
      CAMERA: true,

    },
    RESULTS: {
      NEVER_ASK_AGAIN: true,
      GRANTED: true,
    },
    check: vi.fn(),
    request: vi.fn()
  }
}));

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

describe('fetchSmsFromDevice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('should fetch SMS when permission is granted', async () => {
    vi.mocked(PermissionsAndroid.request).mockResolvedValue(PermissionsAndroid.RESULTS.GRANTED);
    SmsAndroid.list.mockImplementation((filter, fail, success) => {
      success(2, JSON.stringify(MOCK_MESSAGES));
    });

    const messages = await fetchSmsFromDevice();
    expect(messages).toEqual(MOCK_MESSAGES);
    expect(PermissionsAndroid.request).toHaveBeenCalledWith(PermissionsAndroid.PERMISSIONS.READ_SMS, expect.any(Object));
    expect(SmsAndroid.list).toHaveBeenCalledWith(expect.any(String), expect.any(Function), expect.any(Function));
  });

  it('should throw an error when permission is denied', async () => {
    const permissionDeniedMessage = 'SMS Permission denied';
    vi.mocked(PermissionsAndroid.request).mockResolvedValue(PermissionsAndroid.RESULTS.DENIED);
    
    await expect(fetchSmsFromDevice()).rejects.toThrow(permissionDeniedMessage);
  });

  it('should throw an error when fetching SMS fails', async () => {
    const errorMessage = 'Failed to fetch SMS';
    vi.mocked(PermissionsAndroid.request).mockResolvedValue(PermissionsAndroid.RESULTS.GRANTED);
    SmsAndroid.list.mockImplementation((filter, fail, success) => {
      fail(errorMessage);
    });
    await expect(fetchSmsFromDevice()).rejects.toThrow(errorMessage);
  });
});
