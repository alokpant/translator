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