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
  const [isLoading, setIsLoading] = React.useState(true);
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

  React.useEffect(() => {
    handleSmsRead();
  }, []);

  const handleSmsRead = async () => {
    setIsLoading(true);
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
    await buttonClickHandler();
    setIsLoading(false);
  }

  const Item = ({ body, address, read, seen, deleted }: Pick<SmsMessage, 'deleted' | 'body' | 'address' | 'read' | 'seen'>) => (
    <View>
      <Text style={styles.headerText}>{ `${address} - ${deleted ? 'Deleted' : 'Not deleted'} - ${read ? 'Read' : 'Unread'} - ${seen ? 'Seen' : 'Not'}` }</Text>
      <Text>{body}</Text>
    </View>
  );

  const showData = () => {
    return !isLoading && !smsError;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Title style={styles.mainTitle}>Translator</Title>

        <PermissionStatus
          READ_SMS_PERMISSION_STATUS={hasReadSMSPermission}
          RECEIVE_SMS_PERMISSION_STATUS={hasReceiveSMSPermission}
          requestReadSMSPermission={requestReadSMSPermission}
        />

        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={checkPermissions} mode="contained" disabled={isLoading}>
            Recheck permission
          </Button>
          <Button onPress={handleSmsRead} mode="contained" disabled={isLoading}>
            Start
          </Button>
        </View>

        {
          showData && (
            <View>
              <Title style={styles.headerText}>Total unread messages: { smsMessagesData.length }</Title>
            </View>
          )
        }

        {
          showData && <FlatList
            style={styles.flatListStyle}
            data={smsMessagesData}
            renderItem={({ item }) => <Item deleted={item.deleted} seen={item.seen} read={item.read} body={item.body} address={item.address} />}
            keyExtractor={item => `${item._id}${item.date}`}
          />   
        }

        {
          isLoading && <Text>Loading...</Text>
        }

        {
          smsError && <Text>Error: {smsError}</Text>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 10,
    gap: 10,
  },
  button: {
    flex: 1,
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