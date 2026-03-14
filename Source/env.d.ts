/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Environment variables from .env
interface ImportMetaEnv {
	readonly PUBLIC_AUTH_WORKER_URL: string;
	readonly PUBLIC_DOWNLOAD_WORKER_URL: string;
	readonly PUBLIC_ANALYTICS_WORKER_URL: string;
	readonly PUBLIC_STATUS_WORKER_URL: string;
	readonly PUBLIC_FRONTEND_URL: string;
	// Firebase (optional)
	readonly PUBLIC_FIREBASE_API_KEY?: string;
	readonly PUBLIC_FIREBASE_AUTH_DOMAIN?: string;
	readonly PUBLIC_FIREBASE_PROJECT_ID?: string;
	readonly PUBLIC_FIREBASE_STORAGE_BUCKET?: string;
	readonly PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string;
	readonly PUBLIC_FIREBASE_APP_ID?: string;
	readonly PUBLIC_FIREBASE_MEASUREMENT_ID?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
