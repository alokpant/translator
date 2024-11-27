import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button, DataTable, Title, Provider as PaperProvider, Divider } from "react-native-paper";
import useApp from "@/app/hooks/useApp";
import loadSms from "@/app/hooks/loadSms";
import { SafeAreaView } from "react-native-safe-area-context";
import { SmsMessage } from '@/domain/entities/Message';
// import * as Notifications from 'expo-notifications';

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
  const hasUserPermission = READ_SMS_PERMISSION_STATUS && RECEIVE_SMS_PERMISSION_STATUS;
  return (
    <View style={styles.permissionBody}> 
      {!hasUserPermission && (
        <Button onPress={requestReadSMSPermission} mode="contained">
          Request Permission
        </Button>
      )}

      {
        hasUserPermission && (
          <View>
            <Text>Read SMS Permission: {!!READ_SMS_PERMISSION_STATUS + ''} </Text>
            <Text>Read SMS Permission: {!!READ_SMS_PERMISSION_STATUS + ''} </Text>
          </View>
        )
      }
    </View>
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
    smsMessagesData,
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

  const Item = ({ body, address }: Pick<SmsMessage, 'body' | 'address'>) => (
    <View>
      <Text style={styles.headerText}>{ address }</Text>
      <Text>{body}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title style={styles.mainTitle}>Translator</Title>

        <PermissionStatus
          READ_SMS_PERMISSION_STATUS={hasReadSMSPermission}
          RECEIVE_SMS_PERMISSION_STATUS={hasReceiveSMSPermission}
          requestReadSMSPermission={requestReadSMSPermission}
        />

        <View>
          <Title style={styles.headerText}>Total unread messages: { smsMessagesData.length }</Title>
        </View>
        <DataTable>
          {
            <FlatList
              style={styles.flatListStyle}
              data={smsMessagesData}
              renderItem={({ item }) => <Item body={item.body} address={item.address} />}
              keyExtractor={item => item.id}
            />   
          }
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  mainTitle: {
    paddingBottom: 5,
    fontSize: 20,
  },
  permissionBody: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10,
  },
  flatListStyle: {
    overflow: 'scroll',
    paddingBottom: 30,
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});