import { Message } from '@/domain/entities/Message';
import { PermissionsAndroid } from 'react-native'
import SmsAndroid from 'react-native-get-sms-android'

export default async function fetchSmsFromDevice(filter?: Record<string, any>): Promise<Message[]> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'Read SMS',
        message: 'Need access to read SMS',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if(granted === PermissionsAndroid.RESULTS.GRANTED) {
      return new Promise((resolve, reject) => {
        SmsAndroid.list(
          JSON.stringify({
            box: 'inbox',
            maxCount: 10,
            ...filter,
          }),
          (fail) => reject(fail),
          (count, smsList) => resolve(JSON.parse(smsList)),
        );

      });
    } else {
      throw new Error('SMS Permission denied');
    }
  } catch (error) {
    console.warn('Error fetching SMS', error);
    throw error;
  }
}
