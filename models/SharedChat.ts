import mongoose, { Schema, Document } from 'mongoose'

export interface ISharedChat extends Document {
  chatId: mongoose.Types.ObjectId
  shareId: string
  createdAt: Date
  expiresAt?: Date
}

const SharedChatSchema: Schema = new Schema({
  chatId: { type: Schema.Types.ObjectId, ref: 'ChatHistory', required: true },
  shareId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
})

// Create indexes
SharedChatSchema.index({ shareId: 1 }, { unique: true })
SharedChatSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

// Remove any unique constraint on chatId
SharedChatSchema.index({ chatId: 1 }, { unique: false })

export default mongoose.models.SharedChat || mongoose.model<ISharedChat>('SharedChat', SharedChatSchema)