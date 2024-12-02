export interface BuildConfig {
  enableSourceMaps: boolean;
  minify: boolean;
  splitting: boolean;
}

export interface BuildResult {
  success: boolean;
  errors: string[];
  warnings: string[];
  duration: number;
}