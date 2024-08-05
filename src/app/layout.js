import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalError from './global-error';

export default function RootLayout({ children }) {
    return (
        <ErrorBoundary FallbackComponent={GlobalError}>
            {children}  
        </ErrorBoundary>
    );
}
