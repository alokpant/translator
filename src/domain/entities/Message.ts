export interface Message {
  // Unique identifier for the message
  id: string;

  // Text content of the message
  body: string;

  // Phone number or name of the sender
  sender: string;

  // Date of when the message was received
  timestamp: number;

  // Flag to indicate if the message has been read
  read: boolean;
}

// interface SMSMessage {
//   originatingAddress: string;
//   body: string;
//   timestamp: number;
// }

export interface SmsMessage {
  // Unique identifier for the message
  _id: number;

  // Phone number or name of the sender
  address: string;

  // Type of block (0 indicates no block)
  block_type: number;

  // Text content of the message
  body: string;

  // Creator of the message (usually the app that created it)
  creator: string;

  // Date when the message was received (in milliseconds since epoch)
  date: number;

  // Date when the message was sent (in milliseconds since epoch)
  date_sent: number;

  // Flag to indicate if the message has been deleted (0 for no, 1 for yes)
  deleted: number;

  // Error code associated with the message (0 indicates no error)
  error_code: number;

  // Flag to indicate if the message is marked as favourite (0 for no, 1 for yes)
  favourite: number;

  // Flag to indicate if the message is locked (0 for no, 1 for yes)
  locked: number;

  // Custom field for collected status (0 indicates not collected)
  oplus_collected: number;

  // Custom field for draft status (1 indicates it is a draft)
  oplus_drafts: number;

  // Custom field for mass message status (0 indicates not a mass message)
  oplus_mass: number;

  // Custom field for service message SMS type (0 indicates normal message)
  oplus_service_message_sms_type: number;

  // Custom field for SMS type (0 indicates normal message)
  oplus_sms_type: number;

  // Custom field for timer status (0 indicates no timer)
  oplus_timer: number;

  // Identifier for the phone (usually -1 for default)
  phone_id: number;

  // Priority of the message (-1 indicates normal priority)
  priority: number;

  // Protocol used for the message (0 indicates SMS)
  protocol: number;

  // Custom field for audio read status (0 indicates not read)
  rcs_audio_read: number;

  // Custom field for burn status (-1 indicates no burn)
  rcs_burn: number;

  // Custom field for chat type (-1 indicates no chat)
  rcs_chat_type: number;

  // Size of the file attached to the message (0 indicates no file)
  rcs_file_size: number;

  // Custom field for download status (0 indicates not downloaded)
  rcs_is_download: number;

  // Custom field for media played status (0 indicates not played)
  rcs_media_played: number;

  // Custom field for message type (-1 indicates normal message)
  rcs_msg_type: number;

  // Flag to indicate if the message has been read (0 for no, 1 for yes)
  read: number;

  // Flag to indicate if the reply path is present (0 for no, 1 for yes)
  reply_path_present: number;

  // Flag to indicate if the message has been seen (0 for no, 1 for yes)
  seen: number;

  // Service center address
  service_center: string;

  // Status of the message (-1 indicates no status)
  status: number;

  // Subscription ID associated with the message
  sub_id: number;

  // Sync state of the message (0 indicates not synced)
  sync_state: number;

  // Thread ID associated with the message
  thread_id: number;

  // Type of the message (1 indicates inbox message)
  type: number;
}