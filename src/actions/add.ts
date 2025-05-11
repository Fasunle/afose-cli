import {
  fetchRegistry,
  installDependencies,
  writeComponentFiles,
} from '@/registry';
import { Command } from 'commander';

const addCommand = new Command('add');

addCommand
  .option('-r, --registry <url>', 'Registry URL to fetch components from')
  .option('-s, --src <dir>', 'Source directory for components')
  .option('-f, --framework <framework>', 'Framework for components')
  .description('Add a new component')
  .action(
    async ({
      registry,
      framework,
      src,
    }: {
      registry: string;
      src: boolean;
      framework: string;
    }) => {
      if (!registry) {
        console.error('Please provide a registry URL with -r or --registry');
        process.exit(1);
      }

      const component = await fetchRegistry(registry);
      await writeComponentFiles(component, getBaseDir(src, framework));
      console.log(`🫰 Installing ${component.dependencies.join(', ')}`);
      await installDependencies(component.dependencies);
    },
  );

function getBaseDir(hasSrc: boolean, framework: string) {
  switch (framework) {
    case 'angular':
      return `${hasSrc ? 'src/' : ''}app`;
    case 'next':
      return `${hasSrc ? 'src/' : ''}app`;

    default:
      return hasSrc ? 'src/' : '';
  }
}

export default addCommand;
