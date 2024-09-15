import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface IChatHistory extends Document {
  userId: string
  title: string
  messages: IMessage[]
  createdAt: Date
  updatedAt: Date
  isTitleEdited: boolean  // New field
}

const MessageSchema: Schema = new Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { _id: false })

const ChatHistorySchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    default: 'New Chat'
  },
  messages: {
    type: [MessageSchema],
    default: []
  },
  isTitleEdited: {  // New field
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const ChatHistory: Model<IChatHistory> = mongoose.models.ChatHistory || mongoose.model<IChatHistory>('ChatHistory', ChatHistorySchema)

export default ChatHistory