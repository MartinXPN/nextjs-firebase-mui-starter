import {BatchLogRecordProcessor, LoggerProvider} from '@opentelemetry/sdk-logs';
import {OTLPLogExporter} from '@opentelemetry/exporter-logs-otlp-http';
import {logs} from '@opentelemetry/api-logs';
import {resourceFromAttributes} from '@opentelemetry/resources';

// Create LoggerProvider outside register() so it can be exported and flushed in route handlers
export const loggerProvider = new LoggerProvider({
    resource: resourceFromAttributes({'service.name': 'next-firebase-mui-starter'}),
    processors: [
        new BatchLogRecordProcessor(
            new OTLPLogExporter({
                url: 'https://us.i.posthog.com/i/v1/logs',
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTHOG_KEY}`,
                    'Content-Type': 'application/json',
                },
            })
        ),
    ],
});

export function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        logs.setGlobalLoggerProvider(loggerProvider);
    }
}
