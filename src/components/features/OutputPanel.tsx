import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  outputData?: any
  children?: React.ReactNode
}

const OutputPanel = ({ children, outputData, className = '' }: Props) => {

  const [isCopied, setIsCopied] = React.useState(false)

  const handleCopy = () => {
    if (outputData) {
      navigator.clipboard.writeText(outputData)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 5000)
    }
  }

  return (
    <div className={cn("w-full sm:p-8 px-4 py-8 bg-secondary/5 remove-shadow shadow-lg border-special-1", className)}>
      <h3 className="text-2xl font-bold text-foreground mb-3">Preview</h3>

      {/* Live Grid Preview */}
      <div className="h-fit flex items-center justify-center p-4 bg-white mb-8 overflow-auto">
        {children || <p className="text-muted">Live preview will be displayed here.</p>}
      </div>

      {/* Generated CSS Output */}
      <div className="relative">
        <label htmlFor="cssOutput" className="text-muted text-base font-bold mb-2 block">
          Generated CSS
        </label>
        <textarea
          id="cssOutput"
          readOnly
          value={outputData || ''}
          className="w-full p-4 bg-muted text-background font-medium remove-shadow font-mono text-base overflow-y-auto border-special-1 h-40 resize-none outline-none"
        />
        <button
          onClick={handleCopy}
          disabled={!outputData}
          className="absolute top-4 right-4 bg-accent text-foreground border border-accent font-bold py-1 px-3 hover:bg-background transition duration-300 transform hover:scale-105 text-sm"
        >
          {isCopied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}


OutputPanel.displayName = 'OutputPanel'
export default OutputPanel