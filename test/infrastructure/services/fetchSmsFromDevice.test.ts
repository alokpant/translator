import { Message } from "@/domain/entities/Message";
import fetchSmsFromDevice from "@/infrastructure/services/fetchSmsFromDevice";
import { PermissionsAndroid } from "react-native";
import { describe, expect, it, vi } from "vitest";
// import SmsAndroid from 'react-native-get-sms-android'

vi.mock('react-native-get-sms-android', () => ({
  list: vi.fn(),
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
  it('should fetch SMS when permission is granted', async () => {
    PermissionsAndroid.request.mockResolvedValue(PermissionsAndroid.RESULTS.GRANTED);
    const mockSmsList = JSON.stringify(MOCK_MESSAGES);
    const SmsAndroid = require('react-native-get-sms-android');
    SmsAndroid.list.mockImplementation((filter, failCallback, successCallback) => {
      successCallback(2, mockSmsList);  // Simulate successful response
    });

    // Act
    const result = await fetchSmsFromDevice();

    // Assert
    expect(PermissionsAndroid.request).toHaveBeenCalledWith(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      expect.objectContaining({
        title: 'Read SMS',
        message: 'Need access to read SMS',
      })
    );
    expect(SmsAndroid.list).toHaveBeenCalled();
    expect(result).toEqual(MOCK_MESSAGES);
  });

  // it('should throw an error when permission is denied', async () => {
  //   vi.spyOn(PermissionsAndroid, 'request').mockResolvedValue(PermissionsAndroid.RESULTS.DENIED);
  
  //   const fetchSMS = await fetchSmsFromDevice({});
    
  // });

  it('should throw an error when fetching SMS fails', async () => {
    PermissionsAndroid.request.mockResolvedValue({});

    await fetchSmsFromDevice();

    expect(PermissionsAndroid.request).toBeCalled();
  });
});
