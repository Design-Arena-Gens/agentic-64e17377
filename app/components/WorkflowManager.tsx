'use client'

interface WorkflowManagerProps {
  onTrigger: () => void
}

export default function WorkflowManager({ onTrigger }: WorkflowManagerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Workflow Control
      </h2>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">Automated Schedule</h3>
          <p className="text-purple-100 mb-4">
            Workflow runs automatically every day at 9:00 AM
          </p>
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Next execution: Tomorrow at 9:00 AM</span>
          </div>
        </div>

        <button
          onClick={onTrigger}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          🚀 Trigger Workflow Now
        </button>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            ⚠️ Manual Trigger
          </h4>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Use this to test the workflow immediately. Ensure your API keys are configured before triggering.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">24h</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Schedule Interval</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Auto</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Upload Mode</div>
          </div>
        </div>
      </div>
    </div>
  )
}
