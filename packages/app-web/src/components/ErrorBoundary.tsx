import { Component, ReactNode } from 'react'

export type FallbackParams = {
  clear: () => void;
  error: unknown
}

export type ErrorBoundaryProps = {
  fallback: ReactNode | ((params: FallbackParams) => ReactNode)
  children: ReactNode
}

export type ErrorBoundaryState = {
  error?: unknown
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError(error: unknown) {
    return { error }
  }

  render() {
    if (!this.state?.error) return this.props.children

    if (typeof this.props.fallback === 'function') {
      return this.props.fallback({
        clear: () => this.setState({ error: undefined }),
        error: this.state.error
      })
    }

    return this.props.fallback
  }
}
