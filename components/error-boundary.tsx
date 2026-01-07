"use client"

import type React from "react"
import { Component, type ReactNode } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  componentName?: string
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`[v0] ErrorBoundary caught error in ${this.props.componentName || "component"}:`, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <Card className="border-0 shadow-lg rounded-[20px] bg-orange-50 dark:bg-orange-900/20">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center text-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-800 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800 dark:text-orange-200">حدث خطأ مؤقت / Temporary Error</h3>
                <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
                  يرجى المحاولة مرة أخرى / Please try again
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={() => this.setState({ hasError: false })} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                إعادة المحاولة / Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName?: string,
  fallback?: ReactNode,
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary componentName={componentName} fallback={fallback}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    )
  }
}
