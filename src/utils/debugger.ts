import { toast } from 'sonner';

interface BuildError {
  file: string;
  message: string;
  line?: number;
  column?: number;
}

export class BuildDebugger {
  private static instance: BuildDebugger;
  private errors: BuildError[] = [];
  private buildCache = new Map<string, boolean>();

  private constructor() {}

  static getInstance(): BuildDebugger {
    if (!BuildDebugger.instance) {
      BuildDebugger.instance = new BuildDebugger();
    }
    return BuildDebugger.instance;
  }

  logError(error: BuildError) {
    this.errors.push(error);
    console.error(`Build Error in ${error.file}:`, error.message);
    toast.error(`Build Error: ${error.message}`);
  }

  clearErrors() {
    this.errors = [];
    this.buildCache.clear();
  }

  validateFile(filePath: string, content: string): boolean {
    if (this.buildCache.has(filePath)) {
      return this.buildCache.get(filePath)!;
    }

    try {
      // Basic syntax validation
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        new Function(content);
      }
      
      this.buildCache.set(filePath, true);
      return true;
    } catch (error) {
      this.logError({
        file: filePath,
        message: (error as Error).message
      });
      this.buildCache.set(filePath, false);
      return false;
    }
  }
}

export const buildDebugger = BuildDebugger.getInstance();