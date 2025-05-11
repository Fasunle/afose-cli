import path from 'path';
import { execSync } from 'child_process';
import { ComponentRegistry } from '@/types/component';

export async function writeComponentFiles(
  component: ComponentRegistry,
  baseDir: string,
) {
  const { default: prettier } = await import('prettier');
  const { default: fs } = await import('fs-extra');

  for (const file of component.files) {
    const targetPath = path.resolve(baseDir, file.target);
    // Ensure the directory exists
    await fs.ensureDir(path.dirname(targetPath));
    const content = file.content.replace(/\+\s*\\n/g, '').replace(/\\n/g, '\n');

    // Format the content using Prettier
    const formattedContent = await prettier.format(content, {
      parser: 'typescript',
      singleQuote: true,
      trailingComma: 'all',
      printWidth: 80,
      tabWidth: 2,
      semi: true,
      useTabs: false,
      endOfLine: 'lf',
      bracketSpacing: true,
      arrowParens: 'avoid',
      quoteProps: 'as-needed',
      jsxSingleQuote: false,
      htmlWhitespaceSensitivity: 'strict',
      proseWrap: 'preserve',
      embeddedLanguageFormatting: 'auto',
    });

    const filePath = path.join(baseDir, file.path);
    await fs.outputFile(filePath, formattedContent);
    console.log(
      `Created: ${filePath.replace('components/ui/', '').replace('components\\ui\\.tsx', '')}`,
    );
  }
}

export async function fetchRegistry(url: string): Promise<any> {
  const { default: fetch } = await import('node-fetch');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch registry: ${res.statusText}`);
  return res.json();
}

export function installDependencies(deps: string[]) {
  if (!deps || deps.length === 0) return;
  const depsStr = deps.join(' ');
  console.log(`Installing dependencies: ${depsStr}`);
  execSync(`npm install ${depsStr}`, { stdio: 'inherit' });
}
