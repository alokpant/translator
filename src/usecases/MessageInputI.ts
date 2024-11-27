// read, _id, address, and body cannot be picked together
// they are Ored, so only pick one.
interface MessageInputI {
  /**
   * The folder to filter messages from.
   * Example: "inbox", "sent"
   */
  box?: string;

  /**
   * The read status of the messages.
   * Example: 0 (unread), 1 (read)
   */
  read?: number;

  /**
   * The unique identifier of the message.
   * Example: 12345
   */
  _id?: number;

  /**
   * The unique identifier of the message thread.
   * Example: 67890
   */
  thread_id?: number;

  /**
   * The address (phone number) of the sender or receiver.
   * Example: "+1234567890"
   */
  address?: string;

  /**
   * The body content of the message.
   * Example: "Hello, how are you?"
   */
  body?: string;

  /**
   * A regular expression to match the body content of the message.
   * Example: ".*urgent.*"
   */
  bodyRegex?: string;

  /**
   * The starting index for the messages to be retrieved.
   * Example: 0
   */
  indexFrom?: number;

  /**
   * The maximum number of messages to retrieve.
   * Example: 50
   */
  maxCount?: number;

  /**
   * Additional selection criteria for the messages.
   * Example: "address = '+1234567890'"
   */
  selection?: string;

  /**
   * The sort order for the messages.
   * Example: "date DESC"
   */
  sortOrder?: string;

  /**
   * The maximum date for the messages to be retrieved.
   * Example: 1625097600000 (timestamp in milliseconds)
   */
  maxDate?: number;

  /**
   * The minimum date for the messages to be retrieved.
   * Example: 1609459200000 (timestamp in milliseconds)
   */
  minDate?: number;
}