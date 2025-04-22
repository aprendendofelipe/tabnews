import { trimEnd, trimStart, truncate } from './strings.js';

describe('helpers', () => {
  describe('trimStart', () => {
    it('should remove invisible characters from the start of a string', () => {
      const input = '\u034f\u034fHello';
      const result = trimStart(input);
      expect(result).toBe('Hello');
    });

    it('should return the same string if no invisible characters are at the start', () => {
      const input = 'Hello';
      const result = trimStart(input);
      expect(result).toBe('Hello');
    });
  });

  describe('trimEnd', () => {
    it('should remove invisible characters from the end of a string', () => {
      const input = 'Hello\u034f\u034f';
      const result = trimEnd(input);
      expect(result).toBe('Hello');
    });

    it('should return the same string if no invisible characters are at the end', () => {
      const input = 'Hello';
      const result = trimEnd(input);
      expect(result).toBe('Hello');
    });
  });

  describe('truncate', () => {
    it('should truncate a string to the specified maxLength and append "..."', () => {
      const input = 'This is a long string.';
      const result = truncate(input, 10);
      expect(result).toBe('This is...');
    });

    it('should return the original string if it is shorter than maxLength', () => {
      const input = 'Short';
      const result = truncate(input, 10);
      expect(result).toBe('Short');
    });

    it('should return the original string if maxLength is not provided', () => {
      const input = 'No max length';
      const result = truncate(input);
      expect(result).toBe('No max length');
    });

    it('should return the original string if maxLength is 0', () => {
      const input = 'No max length';
      const result = truncate(input, 0);
      expect(result).toBe('No max length');
    });

    it('should handle emojis correctly', () => {
      const input = '😀 This is a long string with emojis.';
      const result = truncate(input, 12);
      expect(result).toBe('😀 This is...');
    });

    it('should handle emojis at the truncation point', () => {
      const emoji = '👩‍❤️‍💋‍👨';
      expect(emoji).toHaveLength(11);
      const input = `Truncate this ${emoji} string.`;

      expect(truncate(input, 16)).toBe('Truncate this...');
      expect(truncate(input, 17)).toBe('Truncate this...');
      expect(truncate(input, 18)).toBe('Truncate this 👩‍❤️‍💋‍👨...');
      expect(truncate(input, 19)).toBe('Truncate this 👩‍❤️‍💋‍👨...');
      expect(truncate(input, 20)).toBe('Truncate this 👩‍❤️‍💋‍👨 s...');
    });
  });
});
