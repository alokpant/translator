declare module "react-native-get-sms-android" {
  export default {
    list: (filter: string, fail: Function, success: Function) => void;
  }
}