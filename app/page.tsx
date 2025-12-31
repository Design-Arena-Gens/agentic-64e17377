'use client'

import { useState, useEffect } from 'react'
import WorkflowManager from './components/WorkflowManager'
import WorkflowStatus from './components/WorkflowStatus'
import N8nWorkflowExport from './components/N8nWorkflowExport'

export default function Home() {
  const [workflows, setWorkflows] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWorkflows()
  }, [])

  const fetchWorkflows = async () => {
    try {
      const response = await fetch('/api/workflows')
      const data = await response.json()
      setWorkflows(data.workflows || [])
    } catch (error) {
      console.error('Error fetching workflows:', error)
    } finally {
      setLoading(false)
    }
  }

  const triggerWorkflow = async () => {
    try {
      const response = await fetch('/api/workflows/trigger', {
        method: 'POST',
      })
      const data = await response.json()
      alert(data.message)
      fetchWorkflows()
    } catch (error) {
      console.error('Error triggering workflow:', error)
      alert('Failed to trigger workflow')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            n8n Kling AI → YouTube Automation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Automated AI video generation and YouTube posting workflow
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <WorkflowManager onTrigger={triggerWorkflow} />
          <WorkflowStatus workflows={workflows} loading={loading} />
        </div>

        <div className="mt-8">
          <N8nWorkflowExport />
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            Setup Instructions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                1. Configure Environment Variables
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm">
                <p>KLING_API_KEY=your_kling_api_key</p>
                <p>YOUTUBE_API_KEY=your_youtube_api_key</p>
                <p>YOUTUBE_CHANNEL_ID=your_channel_id</p>
                <p>N8N_WEBHOOK_URL=your_n8n_webhook_url (optional)</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                2. Import n8n Workflow
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>Download the workflow JSON from the "n8n Workflow Export" section below</li>
                <li>Open your n8n instance</li>
                <li>Click "Import from File" and select the downloaded JSON</li>
                <li>Configure the credentials for Kling AI and YouTube</li>
                <li>Activate the workflow</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                3. Workflow Features
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>🎬 Daily automated video generation using Kling AI</li>
                <li>📹 Automatic video download and processing</li>
                <li>📺 Direct upload to your YouTube channel</li>
                <li>⏰ Scheduled execution (daily at 9 AM)</li>
                <li>🔄 Error handling and retry logic</li>
                <li>📊 Status monitoring and logging</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400">
                4. How It Works
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Schedule triggers daily at 9 AM</li>
                  <li>Generate video prompt based on trending topics</li>
                  <li>Send request to Kling AI API to generate video</li>
                  <li>Poll for video completion status</li>
                  <li>Download generated video</li>
                  <li>Upload video to YouTube with title, description, and tags</li>
                  <li>Log success/failure and send notification</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
