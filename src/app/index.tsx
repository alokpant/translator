import React from "react";
import { View, Text } from "react-native";
import { Button, DataTable, Title, Provider as PaperProvider, Divider } from "react-native-paper";
import useApp from "@/app/hooks/useApp";
import { SafeAreaView } from "react-native-safe-area-context";
// import * as Notifications from 'expo-notifications'

const PermissionStatus = ({
  READ_SMS_PERMISSION_STATUS,
  RECEIVE_SMS_PERMISSION_STATUS,
  requestReadSMSPermission,
}) => {
  console.log(
    "READ_SMS_PERMISSION_STATUS, RECEIVE_SMS_PERMISSION_STATUS:",
    READ_SMS_PERMISSION_STATUS,
    RECEIVE_SMS_PERMISSION_STATUS
  );
  return (
    <SafeAreaView>
      <View>
        <Text>{READ_SMS_PERMISSION_STATUS + "" || "null"}</Text>
        <Text>{RECEIVE_SMS_PERMISSION_STATUS + "" || "null"}</Text>
        {(!READ_SMS_PERMISSION_STATUS || !RECEIVE_SMS_PERMISSION_STATUS) && (
          <Button onPress={requestReadSMSPermission} mode="contained">
            Request Permission
          </Button>
        )}
      </View>
    </SafeAreaView>
  );
};

export default function Page() {
  const {
    appState,
    buttonClickHandler,
    checkPermissions,
    errorCallbackStatus,
    hasReceiveSMSPermission,
    hasReadSMSPermission,
    requestReadSMSPermission,
    smsPermissionState,
    successCallbackStatus,
    smsMessageBody,
    smsMessageNumber,
    smsError,
  } = useApp();

  const handleSmsRead = () => {
    console.log('SMS Read')
    // Notifications.scheduleNotificationAsync({
    //   content: {
    //     title: 'Look at that notification',
    //     body: "I'm so proud of myself!",
    //     autoDismiss: false,
    //     sticky: true
    //   },
    //   trigger: {
    //     seconds: 10,
    //     repeats: true,
    //   },
    //   identifier: 'notification-sms'
    // })
    buttonClickHandler();
  }

  return (
    <PaperProvider>
      <View>
        <Title>ExpoReadSMS - Test Application (Expo)</Title>

        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>App State:</DataTable.Cell>
            <DataTable.Cell>{appState}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <Divider />
        <PermissionStatus
          READ_SMS_PERMISSION_STATUS={hasReadSMSPermission}
          RECEIVE_SMS_PERMISSION_STATUS={hasReceiveSMSPermission}
          requestReadSMSPermission={requestReadSMSPermission}
        />
        <DataTable>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>smsPermissionState:</Text>
            </DataTable.Cell>
            <DataTable.Cell>{smsPermissionState + "" || "null"}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>smsMessageNumber:</Text>
            </DataTable.Cell>
            <DataTable.Cell>{smsMessageNumber + "" || "null"}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>smsMessageBody:</Text>
            </DataTable.Cell>
            <DataTable.Cell>{smsMessageBody + "" || "null"}</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>
              <Text>smsError:</Text>
            </DataTable.Cell>
            <DataTable.Cell>{smsError + "" || "null"}</DataTable.Cell>
          </DataTable.Row>

          <Button onPress={checkPermissions} mode="contained">
            Recheck permission state
          </Button>
          <Button onPress={handleSmsRead} mode="contained">
            Start
          </Button>
        </DataTable>
      </View>
    </PaperProvider>
  );
}