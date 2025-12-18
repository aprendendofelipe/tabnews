const NEXT_PHASE = process.env.NEXT_PHASE;
const NEXT_PUBLIC_VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV;
const VERCEL = process.env.VERCEL;

export const isBuildTime = NEXT_PHASE === 'phase-production-build';

export const isProduction = NEXT_PUBLIC_VERCEL_ENV === 'production';

export const isServerlessRuntime = !!VERCEL;

export const isEdgeRuntime = typeof globalThis.EdgeRuntime !== 'undefined';

export const isLambdaRuntime = isServerlessRuntime && !isEdgeRuntime;
