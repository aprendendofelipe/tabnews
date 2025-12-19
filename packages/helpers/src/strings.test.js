import { trimEnd, trimStart, truncate } from './strings.js';

describe('helpers', () => {
  describe('trimStart', () => {
    it('should remove invisible characters from the start of a string', () => {
      expect(trimStart(' A')).toBe('A');
      expect(trimStart('\nB')).toBe('B');
      expect(trimStart('\tC')).toBe('C');
      expect(trimStart('\rD')).toBe('D');
      expect(trimStart('\u034fE')).toBe('E');
      expect(trimStart('\u17b4F')).toBe('F');
      expect(trimStart('\u17b5G')).toBe('G');
      expect(trimStart('\u2800F')).toBe('F');
      expect(trimStart('\u115fH')).toBe('H');
      expect(trimStart('\u1160I')).toBe('I');
      expect(trimStart('\u3164J')).toBe('J');
      expect(trimStart('\uffa0K')).toBe('K');
    });

    it('should return the same string if no invisible characters are at the start', () => {
      const input = 'Hello';
      const result = trimStart(input);
      expect(result).toBe('Hello');
    });

    it('should not hang (ReDoS) on long string of invisible chars', () => {
      const long = '\u034f'.repeat(1_000_000) + 'Hello';
      const result = trimStart(long);
      expect(result).toBe('Hello');
    }, 200);
  });

  describe('trimEnd', () => {
    it('should remove invisible characters from the end of a string', () => {
      expect(trimEnd('A ')).toBe('A');
      expect(trimEnd('B\n')).toBe('B');
      expect(trimEnd('C\t')).toBe('C');
      expect(trimEnd('D\r')).toBe('D');
      expect(trimEnd('E\u034f')).toBe('E');
      expect(trimEnd('F\u17b4')).toBe('F');
      expect(trimEnd('G\u17b5')).toBe('G');
      expect(trimEnd('F\u2800')).toBe('F');
      expect(trimEnd('H\u115f')).toBe('H');
      expect(trimEnd('I\u1160')).toBe('I');
      expect(trimEnd('J\u3164')).toBe('J');
      expect(trimEnd('K\uffa0')).toBe('K');
    });

    it('should return the same string if no invisible characters are at the end', () => {
      const input = 'Hello';
      const result = trimEnd(input);
      expect(result).toBe('Hello');
    });

    it('should not hang (ReDoS) on long string of invisible chars', () => {
      const long1 = 'Hello' + '\u3164'.repeat(1_000_000);
      const long2 = 'A'.repeat(1_000_000) + '\u17b5'.repeat(1_000_000);
      const long3 = 'B' + '\u034f'.repeat(1_000_000) + 'C';
      const long4 = '\u2800'.repeat(1_000_000) + 'D';
      const long5 = 'E'.repeat(1_000_000) + '\u034f' + 'F';

      expect.soft(trimEnd(long1)).toBe('Hello');
      expect.soft(trimEnd(long2)).toBe('A'.repeat(1_000_000));
      expect.soft(trimEnd(long3)).toBe(long3);
      expect.soft(trimEnd(long4)).toBe(long4);
      expect.soft(trimEnd(long5)).toBe(long5);
    }, 1_000);
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

    it('should return the original string if maxLength is not a number', () => {
      const input = 'Max length is not a number';
      const result = truncate(input, 'not a number');
      expect(result).toBe(input);
    });

    it('should return the same object if input is not a string', () => {
      const input = 1234567890;
      const result = truncate(input, 5);
      expect(result).toBe(input);
    });

    it('should return empty string if maxLength is 0', () => {
      const input = 'Max length = 0';
      const result = truncate(input, 0);
      expect(result).toBe('');
    });

    it('should return empty string if maxLength is negative', () => {
      const input = 'negative max length';
      const result = truncate(input, -5);
      expect(result).toBe('');
    });

    it('should handle empty strings', () => {
      const input = '';
      const result = truncate(input, 10);
      expect(result).toBe(input);
    });

    it('should truncate ellipsis if maxLength is less than ellipsis length', () => {
      const input = 'This is a long string.';
      const result = truncate(input, 2);
      expect(result).toBe('..');
    });

    it('should not truncate if content fits, even when maxLength < ellipsis length', () => {
      const input = '👩‍❤️‍💋‍👨';
      expect(input).toHaveLength(11);
      const result = truncate(input, 2);
      expect(result).toBe('👩‍❤️‍💋‍👨');
    });

    it('should not truncate when grapheme count is below maxLength', () => {
      const input = 'Hello 👩‍❤️‍💋‍👨!';
      expect(input).toHaveLength(18);

      const result = truncate(input, 15);
      expect(result).toBe(input);
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

    it('should handle very long strings efficiently and correctly', () => {
      const longString = '👩‍❤️‍💋‍👨a'.repeat(100_000); // > 1MB
      const result = truncate(longString, 100);

      expect.soft(result.endsWith('...')).toBeTruthy();
      expect.soft(result.startsWith('👩‍❤️‍💋‍👨a'.repeat(48))).toBeTruthy();
      expect.soft(result === '👩‍❤️‍💋‍👨a'.repeat(48) + '👩‍❤️‍💋‍👨' + '...').toBeTruthy();

      // Truncate to a length less than ellipsis
      const result2 = truncate(longString, 2);
      expect.soft(result2).toBe('..');

      // Truncate to a length greater than the string
      const result3 = truncate(longString, 200_000);
      expect(result3).toBe(longString);
    }, 100);
  });
});
