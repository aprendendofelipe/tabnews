/* eslint-disable import/namespace */
import * as document from './_document.jsx';
import * as ui from './index.js';

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
  'Dialog',
  'Flash',
  'FormControl',
  'GlobalStyle',
  'GoToTopButton',
  'Heading',
  'IconButton',
  'Label',
  'LabelGroup',
  'NavList',
  'NoFlashGlobalStyle',
  'Overlay',
  'SegmentedControl',
  'Select',
  'Spinner',
  'TabNav',
  'Text',
  'TextInput',
  'ThemeProvider',
  'Tooltip',
  'TooltipV1',
  'Truncate',
  'useConfirm',
  'useTheme',
];

const exportedBy_document = ['Document'];

describe('ui', () => {
  describe('index', () => {
    it.each(exportedByIndex)('should export "%s"', (exported) => {
      expect(ui[exported]).toBeDefined();
    });
  });

  describe('_document', () => {
    it.each(exportedBy_document)('should export "%s"', (exported) => {
      expect(document[exported]).toBeDefined();
    });
  });
});
