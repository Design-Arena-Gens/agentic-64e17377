import { NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In production, use a database
let workflows: any[] = []

export async function GET() {
  return NextResponse.json({
    workflows: workflows.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newWorkflow = {
      ...body,
      timestamp: new Date().toISOString(),
    }
    workflows.push(newWorkflow)

    // Keep only last 50 workflows
    if (workflows.length > 50) {
      workflows = workflows.slice(-50)
    }

    return NextResponse.json({ success: true, workflow: newWorkflow })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save workflow' },
      { status: 500 }
    )
  }
}
