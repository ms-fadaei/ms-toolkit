import { expect } from 'chai';
import { toEnglishDigits, toPersianDigits, thousandSeparator } from '../dist/index.mjs';

describe('Helpers', () => {
  it('convert Persian digits to English digits', () => {
    const digits = '۱۲۳۴۵۶۷۸۹۰';
    const englishDigits = '1234567890';

    expect(toEnglishDigits(digits)).to.be.equal(englishDigits);
  });

  it('convert Arabic digits to English digits', () => {
    const digits = '١٢٣٤٥٦٧٨٩٠';
    const englishDigits = '1234567890';

    expect(toEnglishDigits(digits)).to.be.equal(englishDigits);
  });

  it('convert digits inside a text to English digits', () => {
    const text = 'This is text containing ۱۲۳۴۵۶۷۸۹۰ and ١٢٣٤٥٦٧٨٩٠ for testing.';
    const englishDigitsText = 'This is text containing 1234567890 and 1234567890 for testing.';

    expect(toEnglishDigits(text)).to.be.equal(englishDigitsText);
  });

  it('convert English digits to Persian digits', () => {
    const digits = '1234567890';
    const persianDigits = '۱۲۳۴۵۶۷۸۹۰';

    expect(toPersianDigits(digits)).to.be.equal(persianDigits);
  });

  it('convert Arabic digits to Persian digits', () => {
    const digits = '١٢٣٤٥٦٧٨٩٠';
    const persianDigits = '۱۲۳۴۵۶۷۸۹۰';

    expect(toPersianDigits(digits)).to.be.equal(persianDigits);
  });

  it('convert digits inside a text to English digits', () => {
    const text = 'This is text containing 1234567890 and ١٢٣٤٥٦٧٨٩٠ for testing.';
    const persianDigitsText = 'This is text containing ۱۲۳۴۵۶۷۸۹۰ and ۱۲۳۴۵۶۷۸۹۰ for testing.';

    expect(toPersianDigits(text)).to.be.equal(persianDigitsText);
  });

  it('separate thousands with comma in a text', () => {
    expect(thousandSeparator('1')).to.be.equal('1');
    expect(thousandSeparator('123')).to.be.equal('123');
    expect(thousandSeparator('1234')).to.be.equal('1,234');
    expect(thousandSeparator('123456')).to.be.equal('123,456');
    expect(thousandSeparator('1234567890')).to.be.equal('1,234,567,890');
    expect(thousandSeparator('this a text with 1 and 12345')).to.be.equal(
      'this a text with 1 and 12,345',
    );
  });

  it('separate thousands with slash in a text', () => {
    expect(thousandSeparator('1', '/')).to.be.equal('1');
    expect(thousandSeparator('123', '/')).to.be.equal('123');
    expect(thousandSeparator('1234', '/')).to.be.equal('1/234');
    expect(thousandSeparator('123456', '/')).to.be.equal('123/456');
    expect(thousandSeparator('1234567890', '/')).to.be.equal('1/234/567/890');
    expect(thousandSeparator('this a text with 1 and 12345', '/')).to.be.equal(
      'this a text with 1 and 12/345',
    );
  });
});
