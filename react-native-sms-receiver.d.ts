declare module "react-native-sms-receiver" {
  const SmsReceiver: {
    addListener: (message: Message) => void;
    removeListener?: (message: Message) => void;
  };

  export default SmsReceiver;
}