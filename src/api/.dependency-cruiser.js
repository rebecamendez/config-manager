/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'api-contract-no-autocontained',
      severity: 'error',
      comment: 'This folder must be autocontained',
      from: { path: ['src/api-contract'] },
      to: { pathNot: ['src/api-contract', 'node_modules'] }
    },
    {
      name: 'shared-database-module-no-autocontained',
      severity: 'error',
      comment: 'This folder must be autocontained',
      from: { path: ['src/modules/shared/database'] },
      to: { pathNot: ['src/modules/shared/database', 'node_modules'] }
    },
    {
      name: 'config-manager-module-forbidden-imports',
      severity: 'error',
      comment: 'This folder must be autocontained',
      from: { path: ['src/modules/config-manager'] },
      to: { path: ['src/modules/graceful-shutdown', 'src/modules/root'] }
    },
    {
      name: 'root-module-forbidden-imports',
      severity: 'error',
      comment: 'This folder must be autocontained',
      from: { path: ['src/modules/root'] },
      to: { path: ['src/modules/graceful-shutdown', 'src/modules/config-manager'] }
    },
    {
      name: 'graceful-shutdown-module-forbidden-imports',
      severity: 'error',
      comment: 'This folder must be autocontained',
      from: { path: ['src/modules/graceful-shutdown'] },
      to: { path: ['src/modules/root', 'src/modules/config-manager'] }
    },
    // --- The rules below are generated from the initial configuration.
    {
      name: 'no-circular',
      severity: 'warn',
      comment:
        'This dependency is part of a circular relationship. You might want to revise ' +
        'your solution (i.e. use dependency inversion, make sure the modules have a single responsibility) ',
      from: {},
      to: {
        circular: true
      }
    },
    {
      name: 'no-orphans',
      comment:
        "This is an orphan module - it's likely not used (anymore?). Either use it or " +
        "remove it. If it's logical this module is an orphan (i.e. it's a config file), " +
        'add an exception for it in your dependency-cruiser configuration. By default ' +
        'this rule does not scrutinize dot-files (e.g. .eslintrc.js), TypeScript declaration ' +
        'files (.d.ts), tsconfig.json and some of the babel and webpack configs.',
      severity: 'warn',
      from: {
        orphan: true,
        pathNot: [
          '(^|/).[^/]+.(js|cjs|mjs|ts|json)$', // dot files
          '.d.ts$', // TypeScript declaration files
          '(^|/)tsconfig.json$', // TypeScript config
          '(^|/)(babel|webpack).config.(js|cjs|mjs|ts|json)$' // other configs
        ]
      },
      to: {}
    },
    {
      name: 'no-non-package-json',
      severity: 'error',
      comment:
        "This module depends on an npm package that isn't in the 'dependencies' section of your package.json. " +
        "That's problematic as the package either (1) won't be available on live (2 - worse) will be " +
        'available on live with an non-guaranteed version. Fix it by adding the package to the dependencies ' +
        'in your package.json.',
      from: {},
      to: {
        dependencyTypes: ['npm-no-pkg', 'npm-unknown']
      }
    },
    {
      name: 'not-to-unresolvable',
      comment:
        "This module depends on a module that cannot be found ('resolved to disk'). If it's an npm " +
        'module: add it to your package.json. In all other cases you likely already know what to do.',
      severity: 'error',
      from: {},
      to: {
        couldNotResolve: true
      }
    },
    {
      name: 'not-to-dev-dep',
      severity: 'error',
      comment:
        "This module depends on an npm package from the 'devDependencies' section of your " +
        'package.json. It looks like something that ships to production, though. To prevent problems ' +
        "with npm packages that aren't there on production declare it (only!) in the 'dependencies'" +
        'section of your package.json. If this module is development only - add it to the ' +
        'from.pathNot re of the not-to-dev-dep rule in the dependency-cruiser configuration',
      from: {
        pathNot: '.(spec|test).(js|mjs|cjs|ts|ls|coffee|litcoffee|coffee.md)$'
      },
      to: {
        dependencyTypes: ['npm-dev'],
        pathNot: ['express']
      }
    }
  ],
  options: {
    doNotFollow: {
      path: 'node_modules'
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.build.json'
    },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
      mainFields: ['main', 'types', 'typings']
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/(@[^/]+/[^/]+|[^/]+)'
      },
      archi: {
        collapsePattern: '^(packages|src|lib|app|bin|test(s?)|spec(s?))/[^/]+|node_modules/(@[^/]+/[^/]+|[^/]+)'
      },
      text: {
        highlightFocused: true
      }
    }
  }
};
// generated: dependency-cruiser@15.0.0 on 2023-10-22T22:56:46.514Z
