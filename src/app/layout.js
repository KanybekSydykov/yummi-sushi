import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalError from './global-error';

export default function RootLayout({ children }) {
    return (
        <html lang="ru"> {/* You can set a default lang here */}
            <body>
                <ErrorBoundary FallbackComponent={GlobalError}>
                    {children}
                </ErrorBoundary>
            </body>
        </html>
    );
}
