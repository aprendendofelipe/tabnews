import { extractPhoneNumber, maskPhone, validatePhoneCodes, validatePhoneNumber, validatePhoneObject } from './phone';

describe('forms', () => {
  describe('phone field', () => {
    describe('maskPhone', () => {
      it('should remove/replace invalid characters', () => {
        const result = maskPhone('+abc1(2+3)!4@#5-6$7 %8^9&0*><?');
        expect(result).toBe('+1(23)45-67-890');
      });

      it('should be able to start with a plus sign (+)', () => {
        expect(maskPhone('+')).toBe('+');
        expect(maskPhone('+3')).toBe('+3');
        expect(maskPhone('++5')).toBe('+5');
        expect(maskPhone('+987')).toBe('+987');
        expect(maskPhone('+8765')).toBe('+876(5');
        expect(maskPhone('+7(6)54')).toBe('+7(6)54');
      });

      it('should be able to start with a numeric character (no country code)', () => {
        expect(maskPhone('1')).toBe('(1');
        expect(maskPhone('21')).toBe('(21');
        expect(maskPhone('351')).toBe('(35)1');
      });

      it('should be able to start with opening parentheses', () => {
        expect(maskPhone('(')).toBe('(');
        expect(maskPhone('(1')).toBe('(1');
        expect(maskPhone('(21')).toBe('(21');
        expect(maskPhone('((21')).toBe('(21');
      });

      it('should replace initial characters with opening parentheses', () => {
        expect(maskPhone(' ')).toBe('');
        expect(maskPhone('  ')).toBe('');
        expect(maskPhone(')')).toBe('(');
        expect(maskPhone('-')).toBe('(');
        expect(maskPhone(' 1')).toBe('(1');
        expect(maskPhone(')2')).toBe('(2');
        expect(maskPhone('-4')).toBe('(4');
        expect(maskPhone(' 21')).toBe('(21');
        expect(maskPhone(')32')).toBe('(32');
        expect(maskPhone('-43')).toBe('(43');
        expect(maskPhone('  21')).toBe('(21');
        expect(maskPhone('))32')).toBe('(32');
        expect(maskPhone('--43')).toBe('(43');
        expect(maskPhone(' -)43')).toBe('(43');
      });

      it('should be able to recognize some country codes', () => {
        expect(maskPhone('+16')).toBe('+1(6');
        expect(maskPhone('+554')).toBe('+55(4');
        expect(maskPhone('+3512')).toBe('+351(2');
      });

      it('should add area code parentheses', () => {
        expect(maskPhone('2191')).toBe('(21)91');
        expect(maskPhone('11998765432')).toBe('(11)998765432');
        expect(maskPhone('1199876-5432')).toBe('(11)99876-5432');
        expect(maskPhone('119987 65432')).toBe('(11)9987-65432');
        expect(maskPhone('+17')).toBe('+1(7');
        expect(maskPhone('+2345')).toBe('+234(5');
        expect(maskPhone('+55219')).toBe('+55(21)9');
        expect(maskPhone('+5511998765432')).toBe('+55(11)998765432');
        expect(maskPhone('+55 11 99876 5432')).toBe('+55(11)99876-5432');
        expect(maskPhone('+  55  11  998765432')).toBe('+55(11)998765432');
        expect(maskPhone(' +  55  (11)  998(765)432')).toBe('+55(11)998-765-432');
        expect(maskPhone('  +  55  11  99876-5432')).toBe('+55(11)99876-5432');
      });

      it('should handle input with extra parentheses', () => {
        expect(maskPhone('11998(765)432')).toBe('(11)998-765-432');
        expect(maskPhone('+55 (11) 99876 (5432)')).toBe('+55(11)99876-5432-');
      });
    });

    describe('extractPhoneNumber', () => {
      it('should extract country code, area code, and number correctly', () => {
        const result = extractPhoneNumber('+1 (212) 555-1212');
        expect(result).toStrictEqual({
          country_code: '1',
          area_code: '212',
          number: '5551212',
        });
      });

      it('should handle numbers without country code', () => {
        const result = extractPhoneNumber('(21) 99876-5432');
        expect(result).toStrictEqual({
          country_code: '55',
          area_code: '21',
          number: '998765432',
        });
      });

      it('should not handle numbers without area code', () => {
        const result = extractPhoneNumber('+55199876-5432');
        expect(result).toStrictEqual({
          country_code: '551998765432',
          area_code: '',
          number: '',
        });
      });

      it('should handle numbers without country code and area code', () => {
        const result = extractPhoneNumber('99876-5432');
        expect(result).toStrictEqual({
          country_code: '55',
          area_code: '',
          number: '998765432',
        });
      });

      it('should handle numbers with invalid characters', () => {
        const result = extractPhoneNumber('+ + 55(21) 99% 876-5432abc');
        expect(result).toStrictEqual({
          country_code: '55',
          area_code: '21',
          number: '998765432',
        });
      });
    });

    describe('validatePhoneCodes', () => {
      it('should return empty string for valid codes', () => {
        expect(validatePhoneCodes({ area_code: '1', country_code: '4' })).toBe('');
      });

      it('should return error message for invalid area code', () => {
        const errorMessage = 'Código de área inválido. Insira o DDD entre parênteses.';

        expect(validatePhoneCodes({ area_code: '' })).toBe(errorMessage);
        expect(validatePhoneCodes({ area_code: 'w' })).toBe(errorMessage);
        expect(validatePhoneCodes({ area_code: '+' })).toBe(errorMessage);
      });

      it('should return error message for invalid country code', () => {
        const errorMessage = 'Código do país inválido.';

        expect(validatePhoneCodes({ area_code: '1', country_code: '' })).toBe(errorMessage);
        expect(validatePhoneCodes({ area_code: '2', country_code: '1234' })).toBe(errorMessage);
        expect(validatePhoneCodes({ area_code: '3', country_code: 'x' })).toBe(errorMessage);
      });
    });

    describe('validatePhoneNumber', () => {
      it('should return empty string for valid phone number', () => {
        expect(validatePhoneNumber({ number: '123456' })).toBe('');
      });

      it('should return error message for short phone number', () => {
        expect(validatePhoneNumber({ number: '12345' })).toBe('Número muito curto.');
      });
    });

    describe('validatePhoneObject', () => {
      it('should return empty string for valid phone number', () => {
        expect(validatePhoneObject({ area_code: '1', country_code: '4', number: '123456' })).toBe('');
      });

      it('should return error message for invalid area code', () => {
        const errorMessage = 'Código de área inválido. Insira o DDD entre parênteses.';

        expect(validatePhoneObject({ area_code: '' })).toBe(errorMessage);
        expect(validatePhoneObject({ area_code: 'w' })).toBe(errorMessage);
        expect(validatePhoneObject({ area_code: '+' })).toBe(errorMessage);
      });

      it('should return error message for invalid country code', () => {
        const errorMessage = 'Código do país inválido.';

        expect(validatePhoneObject({ area_code: '1', country_code: '' })).toBe(errorMessage);
        expect(validatePhoneObject({ area_code: '2', country_code: '1234' })).toBe(errorMessage);
        expect(validatePhoneObject({ area_code: '3', country_code: 'x' })).toBe(errorMessage);
      });

      it('should return error message for short phone number', () => {
        expect(validatePhoneObject({ area_code: '1', country_code: '4', number: '12345' })).toBe('Número muito curto.');
      });
    });
  });
});
