'use client';
import {Component, ErrorInfo, ReactNode} from "react";
import Typography from "@mui/material/Typography";
import {getAnalytics, logEvent} from "firebase/analytics";
import * as Sentry from "@sentry/nextjs";


class ErrorBoundary extends Component<{children?: ReactNode}, { error: Error | null }> {
    constructor(props: {}) {
        super(props);
        this.state = {error: null};
    }

    static getDerivedStateFromError(error: Error) {
        console.log('getDerivedStateFromError:', error);
        return {error: error};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can also log the error to an error reporting service
        Sentry.captureException(error);
        const analytics = getAnalytics();
        logEvent(analytics, 'exception', {
            description: error.name,
            fatal: true,
            cause: JSON.stringify(error.cause),
            message: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
        });

        console.error(error, errorInfo);
    }

    render() {
        if (this.state.error)
            return <>
                <Typography variant="h1" textAlign="center">Something went wrong</Typography>
                <Typography whiteSpace="pre-wrap" textAlign="center">{this.state.error.message}</Typography>
            </>
        return this.props.children;
    }
}

export default ErrorBoundary;
