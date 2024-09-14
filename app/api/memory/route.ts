import { NextResponse, NextRequest } from 'next/server'
import dbConnect from '@/lib/mongodb'
import UserMemory from '@/models/UserMemory'
import { getAuth } from '@clerk/nextjs/server'

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()

  const userMemory = await UserMemory.findOne({ userId })

  return NextResponse.json({ memory: userMemory?.memory || '' })
}

export async function POST(req: NextRequest) {
  const { memory } = await req.json()
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (typeof memory !== 'string') {
    return NextResponse.json({ error: 'Invalid memory format' }, { status: 400 })
  }

  await dbConnect()

  let userMemory = await UserMemory.findOne({ userId })

  if (userMemory) {
    userMemory.memory = memory
    await userMemory.save()
  } else {
    userMemory = new UserMemory({ userId, memory })
    await userMemory.save()
  }

  return NextResponse.json({ success: true })
}