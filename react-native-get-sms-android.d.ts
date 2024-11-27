declare module "react-native-get-sms-android" {
  const SmsAndroid = {
    list: (filter: string, fail: Function, success: Function) => void;
  }
  export default SmsAndroid;
}