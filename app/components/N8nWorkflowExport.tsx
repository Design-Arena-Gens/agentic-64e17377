'use client'

import { useState } from 'react'

export default function N8nWorkflowExport() {
  const [copied, setCopied] = useState(false)

  const workflowJson = {
    name: 'Kling AI to YouTube Daily Automation',
    nodes: [
      {
        parameters: {
          rule: {
            interval: [
              {
                field: 'cronExpression',
                expression: '0 9 * * *'
              }
            ]
          }
        },
        name: 'Schedule Trigger',
        type: 'n8n-nodes-base.scheduleTrigger',
        typeVersion: 1,
        position: [250, 300]
      },
      {
        parameters: {
          jsCode: `// Generate video prompt based on trending topics or themes
const topics = [
  'Amazing AI technology breakthrough',
  'Future of artificial intelligence',
  'Mind-blowing tech innovation',
  'The next generation of AI',
  'Revolutionary AI discoveries'
];

const randomTopic = topics[Math.floor(Math.random() * topics.length)];
const date = new Date().toLocaleDateString();

return {
  prompt: \`Create a stunning cinematic video about: \${randomTopic}. High quality, professional, engaging visuals.\`,
  title: \`\${randomTopic} - \${date}\`,
  description: \`Discover the latest in AI technology. Auto-generated daily content showcasing \${randomTopic}. Subscribe for daily AI insights!\\n\\n#AI #Technology #Innovation #KlingAI\`,
  tags: ['AI', 'Technology', 'Innovation', 'Future', 'Artificial Intelligence']
};`
        },
        name: 'Generate Prompt',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [450, 300]
      },
      {
        parameters: {
          method: 'POST',
          url: 'https://api.klingai.com/v1/videos/generate',
          authentication: 'genericCredentialType',
          genericAuthType: 'httpHeaderAuth',
          sendHeaders: true,
          headerParameters: {
            parameters: [
              {
                name: 'Content-Type',
                value: 'application/json'
              }
            ]
          },
          sendBody: true,
          bodyParameters: {
            parameters: [
              {
                name: 'prompt',
                value: '={{ $json.prompt }}'
              },
              {
                name: 'duration',
                value: '5'
              },
              {
                name: 'aspect_ratio',
                value: '16:9'
              }
            ]
          }
        },
        name: 'Kling AI - Generate Video',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4,
        position: [650, 300]
      },
      {
        parameters: {
          amount: 30,
          unit: 'seconds'
        },
        name: 'Wait',
        type: 'n8n-nodes-base.wait',
        typeVersion: 1,
        position: [850, 300]
      },
      {
        parameters: {
          method: 'GET',
          url: '=https://api.klingai.com/v1/videos/{{ $json.video_id }}',
          authentication: 'genericCredentialType',
          genericAuthType: 'httpHeaderAuth'
        },
        name: 'Check Video Status',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4,
        position: [1050, 300]
      },
      {
        parameters: {
          conditions: {
            string: [
              {
                value1: '={{ $json.status }}',
                value2: 'completed'
              }
            ]
          }
        },
        name: 'Is Completed?',
        type: 'n8n-nodes-base.if',
        typeVersion: 1,
        position: [1250, 300]
      },
      {
        parameters: {
          method: 'GET',
          url: '={{ $json.video_url }}',
          options: {
            response: {
              response: {
                responseFormat: 'file'
              }
            }
          }
        },
        name: 'Download Video',
        type: 'n8n-nodes-base.httpRequest',
        typeVersion: 4,
        position: [1450, 200]
      },
      {
        parameters: {
          operation: 'upload',
          title: '={{ $node["Generate Prompt"].json.title }}',
          description: '={{ $node["Generate Prompt"].json.description }}',
          tags: '={{ $node["Generate Prompt"].json.tags.join(",") }}',
          categoryId: '28',
          privacyStatus: 'public',
          binaryData: true,
          binaryPropertyName: 'data'
        },
        name: 'Upload to YouTube',
        type: 'n8n-nodes-base.youtube',
        typeVersion: 1,
        position: [1650, 200]
      },
      {
        parameters: {
          jsCode: `console.log('Video uploaded successfully!');
return {
  status: 'success',
  message: 'Video generated and uploaded to YouTube',
  youtubeUrl: $json.url,
  videoId: $json.id
};`
        },
        name: 'Success Log',
        type: 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [1850, 200]
      },
      {
        parameters: {
          operation: 'update'
        },
        name: 'Loop Back',
        type: 'n8n-nodes-base.wait',
        typeVersion: 1,
        position: [1450, 400]
      }
    ],
    connections: {
      'Schedule Trigger': {
        main: [
          [
            {
              node: 'Generate Prompt',
              type: 'main',
              index: 0
            }
          ]
        ]
      },
      'Generate Prompt': {
        main: [
          [
            {
              node: 'Kling AI - Generate Video',
              type: 'main',
              index: 0
            }
          ]
        ]
      },
      'Kling AI - Generate Video': {
        main: [
          [
            {
              node: 'Wait',
              type: 'main',
              index: 0
            }
          ]
        ]
      },
      Wait: {
        main: [
          [
            {
              node: 'Check Video Status',
              type: 'main',
              index: 0
            }
          ]
        ]
      },
      'Check Video Status': {
        main: [
          [
            {
              node: 'Is Completed?',
              type: 'main',
              index: 0
            }
          ]
        ]
      },
      'Is Completed?': {
        main: [
          [
            {
              node: 'Download Video',
              type: 'main',
              index: 0
            }
          ],
          [
            {
              node: 'Loop Back',
              type: 'main',
              index: 0
            }
          ]
        ]
      },
      'Download Video': {
        main: [
          [
            {
              node: 'Upload to YouTube',
              type: 'main',
              index: 0
            }
          ]
        ]
      },
      'Upload to YouTube': {
        main: [
          [
            {
              node: 'Success Log',
              type: 'main',
              index: 0
            }
          ]
        ]
      },
      'Loop Back': {
        main: [
          [
            {
              node: 'Check Video Status',
              type: 'main',
              index: 0
            }
          ]
        ]
      }
    },
    settings: {
      executionOrder: 'v1'
    }
  }

  const downloadWorkflow = () => {
    const dataStr = JSON.stringify(workflowJson, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'kling-youtube-automation.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(workflowJson, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        n8n Workflow Export
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Download or copy this workflow JSON to import into your n8n instance
      </p>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={downloadWorkflow}
          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Download JSON</span>
        </button>

        <button
          onClick={copyToClipboard}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
        </button>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto max-h-96 overflow-y-auto">
        <pre className="text-sm text-green-400 font-mono">
          {JSON.stringify(workflowJson, null, 2)}
        </pre>
      </div>

      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
          📝 Configuration Notes
        </h3>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Add your Kling AI API key in n8n credentials</li>
          <li>• Configure YouTube OAuth2 credentials</li>
          <li>• Adjust schedule timing in the Schedule Trigger node</li>
          <li>• Customize video prompts in the Generate Prompt node</li>
          <li>• Test workflow before activating</li>
        </ul>
      </div>
    </div>
  )
}
