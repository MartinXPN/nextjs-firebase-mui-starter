import {defineConfig} from 'tsdown';

export default defineConfig({
    entry: 'index.ts',
    outDir: 'lib',
    fixedExtension: false,
    dts: false,
    sourcemap: false,
    deps: {
        alwaysBundle: ['dayjs'],
        onlyBundle: ['dayjs'],
    },
});
