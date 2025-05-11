import fs from 'fs';
import path from 'path';

type ProjectSetup = {
  framework: 'angular' | 'react' | 'next' | 'remix' | 'unknown';
  hasSrcDir: boolean;
};

export function detectProjectSetup(
  projectPath: string = process.cwd(),
): ProjectSetup {
  try {
    // Read package.json
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('package.json not found');
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    // Check for src directory
    const hasSrcDir = fs.existsSync(path.join(projectPath, 'src'));

    // Detect framework
    if (dependencies['angular']) {
      return { framework: 'angular', hasSrcDir };
    }

    if (dependencies['next']) {
      return { framework: 'next', hasSrcDir };
    }

    if (dependencies['@remix-run/react']) {
      return { framework: 'remix', hasSrcDir };
    }

    if (
      dependencies['react'] &&
      !dependencies['next'] &&
      !dependencies['@remix-run/react']
    ) {
      return { framework: 'react', hasSrcDir };
    }

    return { framework: 'unknown', hasSrcDir };
  } catch (error) {
    console.error('Error detecting project setup:', error);
    return { framework: 'unknown', hasSrcDir: false };
  }
}
