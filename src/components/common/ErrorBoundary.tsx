'use client';
import {Component, ErrorInfo, ReactNode} from "react";
import Typography from "@mui/material/Typography";
import posthog from 'posthog-js';
import '@/firebase';


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
        posthog.captureException(error, errorInfo);
        console.error(error, errorInfo);
    }

    render() {
        if (this.state.error)
            return <>
                <Typography variant="h1" sx={{textAlign: 'center', marginTop: 8}}>Something went wrong</Typography>
                <Typography sx={{whiteSpace: 'pre-wrap', textAlign: 'center'}}>{this.state.error.message}</Typography>
            </>
        return this.props.children;
    }
}

export default ErrorBoundary;
