import mongoose, { Schema, model, models } from 'mongoose'

interface IUserMemory {
  userId: string
  memory: string
}

const UserMemorySchema: Schema = new Schema<IUserMemory>({
  userId: { type: String, required: true, unique: true },
  memory: { type: String, default: '' },
})

const UserMemory = models.UserMemory || model<IUserMemory>('UserMemory', UserMemorySchema)

export default UserMemory