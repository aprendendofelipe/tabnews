/* eslint-disable import/namespace */
import * as ui from '.';
import * as document from './_document';

const exportedByIndex = [
  'ActionList',
  'ActionMenu',
  'AnchoredOverlay',
  'AutoThemeProvider',
  'Box',
  'BranchName',
  'Button',
  'Checkbox',
  'CounterLabel',
  'Flash',
  'FormControl',
  'GlobalStyle',
  'Heading',
  'IconButton',
  'Label',
  'LabelGroup',
  'NavList',
  'NoFlashGlobalStyle',
  'Overlay',
  'Pagehead',
  'primer',
  'SegmentedControl',
  'Select',
  'Spinner',
  'Text',
  'TextInput',
  'ThemeProvider',
  'Truncate',
  'useConfirm',
  'useTheme',
];

const exportedBy_document = ['Document'];

describe('ui', () => {
  describe('index', () => {
    it.each(exportedByIndex)('should export %s', (exported) => {
      expect(ui[exported]).toBeDefined();
    });
  });

  describe('_document', () => {
    it.each(exportedBy_document)('should export %s', (exported) => {
      expect(document[exported]).toBeDefined();
    });
  });
});
