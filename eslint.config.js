// @ts-check
import stylistic from '@stylistic/eslint-plugin';
import tseslint from 'typescript-eslint';

const includedFolders = ['src', 'features'];

const customizedESLint = stylistic.configs.customize({
    indent: 4,
    quotes: 'single',
    semi: true,
    jsx: true,
    commaDangle: 'never',
    braceStyle: '1tbs',
});

export default tseslint.config(
    {
        ignores: [
            '**/{www,dist,build}/**/*.*',
            'projects/*/!(src)/**/*.*',
            `!(${includedFolders.join(',')})/**/*.*`,
            '!*.{js,ts,mjs,cjs}',
        ],
    },
    {
        name: 'typescript',
        files: ['**/*.{ts,js,tsx,jsx,mjs,cjs,mts}'],
        extends: [
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            ...customizedESLint.rules,
        },
    },
);
