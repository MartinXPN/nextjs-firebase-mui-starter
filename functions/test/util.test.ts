import {expect} from '@jest/globals';
import {codeToFiles, localize} from '../services/util';
import {mockFirebase} from './firebaseMocks';


beforeAll(() => mockFirebase());

describe('TestCodeToFiles', () => {
    describe('basic file structure', () => {
        it('Should print proper files', async () => {
            const code = {
                'index.ts': 'console.log("Hello world")',
                'src': {
                    'index.ts': 'console.log("src")',
                    'sub': {
                        'index.ts': 'console.log("sub")',
                        'yoyo.ts': 'console.log("yoyo")',
                    },
                }
            };

            const expected = {
                'index.ts': 'console.log("Hello world")',
                'src/index.ts': 'console.log("src")',
                'src/sub/index.ts': 'console.log("sub")',
                'src/sub/yoyo.ts': 'console.log("yoyo")',
            };

            const result = codeToFiles(code);
            console.log(result);
            expect(result).toEqual(expected);
        });
    });
});


describe('Test Localization', function () {
    it('Should localize properly', () => {
        expect(localize(undefined, 'enUS')).toEqual('');
        expect(localize('hello', 'enUS')).toEqual('hello');
        expect(localize({'enUS': 'hi', 'hyAM': 'barev'}, 'enUS')).toEqual('hi');
        expect(localize({'enUS': 'hi', 'hyAM': 'barev'}, 'hyAM')).toEqual('barev');
        expect(localize({'enUS': 'hi', 'hyAM': 'barev'}, 'ruRU')).toEqual('hi');
    });
});
