export class PersianNumber {
  /**
   *
   * @type {string}
   */
  delimiter = ' و ';

  /**
   *
   * @type {string}
   */
  zero = 'صفر';

  /**
   *
   * @type {string}
   */
  negative = 'منفی';

  /**
   *
   * @type {*[]}
   */
  letters = [['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'], ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده', 'بیست'], ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'], ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'], ['', ' هزار', ' میلیون', ' میلیارد', ' بیلیون', ' بیلیارد', ' تریلیون', ' تریلیارد', 'کوآدریلیون', ' کادریلیارد', ' کوینتیلیون', ' کوانتینیارد', ' سکستیلیون', ' سکستیلیارد', ' سپتیلیون', 'سپتیلیارد', ' اکتیلیون', ' اکتیلیارد', ' نانیلیون', ' نانیلیارد', ' دسیلیون', ' دسیلیارد']];

  /**
   * Decimal suffixes for decimal part
   * @type {string[]}
   */
  decimalSuffixes = ['', 'دهم', 'صدم', 'هزارم', 'ده‌هزارم', 'صد‌هزارم', 'میلیونوم', 'ده‌میلیونوم', 'صدمیلیونوم', 'میلیاردم', 'ده‌میلیاردم', 'صد‌‌میلیاردم'];

  /**
   * Clear number and split to 3 sections
   * @param {*} num
   */
  prepareNumber(num) {
    let Out = num;
    if (typeof Out === 'number') {
      Out = Out.toString();
    }
    const NumberLength = Out.length % 3;
    if (NumberLength === 1) {
      Out = `00${Out}`;
    } else if (NumberLength === 2) {
      Out = `0${Out}`;
    }
    // Explode to array
    return Out.replace(/\d{3}(?=\d)/g, '$&*')
      .split('*');
  }

  threeNumbersToLetter(num) {
    // return zero
    if (parseInt(num, 0) === 0) {
      return '';
    }
    const parsedInt = parseInt(num, 0);
    if (parsedInt < 10) {
      return this.letters[0][parsedInt];
    }
    if (parsedInt <= 20) {
      return this.letters[1][parsedInt - 10];
    }
    if (parsedInt < 100) {
      const one1 = parsedInt % 10;
      const ten10 = (parsedInt - one1) / 10;
      if (one1 > 0) {
        return this.letters[2][ten10] + this.delimiter + this.letters[0][one1];
      }
      return this.letters[2][ten10];
    }
    const one = parsedInt % 10;
    const hundreds = (parsedInt - (parsedInt % 100)) / 100;
    const ten = (parsedInt - ((hundreds * 100) + one)) / 10;
    const out = [this.letters[3][hundreds]];
    const SecondPart = ((ten * 10) + one);
    if (SecondPart > 0) {
      if (SecondPart < 10) {
        out.push(this.letters[0][SecondPart]);
      } else if (SecondPart <= 20) {
        out.push(this.letters[1][SecondPart - 10]);
      } else {
        out.push(this.letters[2][ten]);
        if (one > 0) {
          out.push(this.letters[0][one]);
        }
      }
    }
    return out.join(this.delimiter);
  }


  /**
   * Convert Decimal part
   * @param decimalPart
   * @returns {string}
   * @constructor
   */
  convertDecimalPart(decimalPart) {
    // Clear right zero
    decimalPart = decimalPart.replace(/0*$/, "");

    if (decimalPart === '') {
      return '';
    }

    if (decimalPart.length > 11) {
      decimalPart = decimalPart.substr(0, 11);
    }
    return ' ممیز ' + this.Num2persian(decimalPart) + ' ' + this.decimalSuffixes[decimalPart.length];
  }

  /**
   * Main function
   * @param input
   * @returns {string}
   * @constructor
   */
  // Num2persian = (input) => {
  Num2persian(input) {
    // Clear Non digits
    input = input.toString().replace(/[^0-9.]/g, '');

    // return zero
    if (isNaN(parseFloat(input))) {
      return this.zero;
    }

    // Declare Parts
    let decimalPart = '';
    let integerPart = input;
    const pointIndex = input.indexOf('.');
    // Check for float numbers form string and split Int/Dec
    if (pointIndex > -1) {
      integerPart = input.substring(0, pointIndex);
      decimalPart = input.substring(pointIndex + 1, input.length);
    }

    if (integerPart.length > 66) {
      return 'خارج از محدوده';
    }

    // Split to sections
    const slicedNumber = this.prepareNumber(integerPart);
    // Fetch Sections and convert
    const Output = [];
    const SplitLength = slicedNumber.length;
    for (let i = 0; i < SplitLength; i += 1) {
      const SectionTitle = this.letters[4][SplitLength - (i + 1)];
      const converted = this.threeNumbersToLetter(slicedNumber[i]);
      if (converted !== '') {
        Output.push(converted + SectionTitle);
      }
    }

    // Convert Decimal part
    if (decimalPart.length > 0) {
      decimalPart = this.convertDecimalPart(decimalPart);
    }

    return Output.join(this.delimiter) + decimalPart;
  }

  formatSplitter(amount: string): string {

    if (!amount) { return null; }

    let rawVal: string = amount.toString();
    rawVal = rawVal.replace(/,/g, '');

    const dividedValueList: string[] = [];
    while (rawVal.length > 0) {
      const rawValueLength = rawVal.length;
      const dividedValue = rawVal.substring(rawValueLength - 3);
      dividedValueList.push(dividedValue);
      rawVal = rawVal.substring(0, rawValueLength - 3);
    }

    let newValue = '';

    for (let i: number = dividedValueList.length; i >= 0; i--) {
      if (dividedValueList[i]) {
        newValue = newValue.concat(dividedValueList[i]);
        if (i !== 0) {
          newValue = newValue.concat(',');
        }
      }
    }
    // remove delimiter from decimal number
    // let newValue = newValue.split(".");
    // if (newValue.length > 1) {
    //   newValue[1].replace(',', '');
    //   newValue = newValue[0] +"."+ newValue[1];
    // }


    return newValue;
  }
}
