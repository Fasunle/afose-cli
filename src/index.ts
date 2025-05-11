#!/usr/bin/env node
import 'module-alias/register'; // Import aliases
import { Command, program } from 'commander';
import { version } from '../package.json'; // Import version from package.json
import addCommand from './actions/add';
import { detectProjectSetup } from '@/detector';

const versionCommand = new Command('version')
  .description('displays version number')
  .action(() => {
    console.log(`Version: ${version}`);
  });

// IIFE
(async () => {
  const projectPath = process.cwd();
  const { framework, hasSrcDir } = detectProjectSetup(projectPath);

  console.log(`Detected framework: ${framework}`);

  program
    .addCommand(
      addCommand
        .setOptionValue('src', hasSrcDir)
        .setOptionValue('framework', framework),
    )
    .addCommand(versionCommand)
    .parse(process.argv);
})();
