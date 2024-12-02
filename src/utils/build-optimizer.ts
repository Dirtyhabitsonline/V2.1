import { buildDebugger } from './debugger';
import type { BuildConfig } from '../types/build';

class BuildOptimizer {
  private static instance: BuildOptimizer;
  private buildConfig: BuildConfig = {
    enableSourceMaps: true,
    minify: true,
    splitting: true
  };

  private constructor() {}

  static getInstance(): BuildOptimizer {
    if (!BuildOptimizer.instance) {
      BuildOptimizer.instance = new BuildOptimizer();
    }
    return BuildOptimizer.instance;
  }

  async validateBuild(): Promise<boolean> {
    try {
      // Validate critical files
      const criticalFiles = [
        '/src/main.tsx',
        '/src/App.tsx',
        '/src/vite-env.d.ts'
      ];

      for (const file of criticalFiles) {
        const isValid = await this.validateFile(file);
        if (!isValid) return false;
      }

      return true;
    } catch (error) {
      buildDebugger.logError({
        file: 'build-process',
        message: `Build validation failed: ${(error as Error).message}`
      });
      return false;
    }
  }

  private async validateFile(filePath: string): Promise<boolean> {
    try {
      const response = await fetch(filePath);
      const content = await response.text();
      return buildDebugger.validateFile(filePath, content);
    } catch (error) {
      buildDebugger.logError({
        file: filePath,
        message: `File validation failed: ${(error as Error).message}`
      });
      return false;
    }
  }

  setBuildConfig(config: Partial<BuildConfig>) {
    this.buildConfig = { ...this.buildConfig, ...config };
  }

  getBuildConfig(): BuildConfig {
    return this.buildConfig;
  }
}

export const buildOptimizer = BuildOptimizer.getInstance();