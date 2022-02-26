export { }

declare global {
    interface Navigator {
        wakeLock: {
            request: () => Promise<WakeLockSentinel>
        }
    }
}

export type WakeLockSentinel = any;
