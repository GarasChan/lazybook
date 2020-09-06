// components/calculator/calculator.js

/**
 * 代码写得很垃圾，将就用，有时间再优化
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    first: '',
    second: '',
    operation: '',
    result: 0,
    value: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showCalculator: function (value) {
      // this.setData({
      //   isShow: true,
      //   value: value || ''
      // })
      const first = first || '';
      this.setData({
        isShow: true,
        first,
        value: first,
        result: first
      })
    },

    hideCalculator: function() {
      this.setData({
        isShow: false,
        first: '',
        second: '',
        operation: '',
        result: '',
        value: ''
      })
    },

    clearValue: function() {
      this.setData({
        first: '',
        second: '',
        operation: '',
        result: '',
        value: ''
      })
    },

    changeValue: function(e) {
      let first = this.data.first;
      let second = this.data.second;
      let operation = this.data.operation;
      let result = this.data.result;
      let value = this.data.value;
      const last = value.charAt(value.length - 1);
      const val = e.target.dataset.val;
      switch (val) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
          if ((val === '.' && last === '.')) {
            return;
          }
          if (operation) {
            if (second.split('.')[1] && second.split('.')[1].length > 1) {
              return;
            }
            second = `${second}${val}`;
            this.setData({
              second,
              value: `${first}${operation}${second}`
            })
          } else {
            if (first.split('.')[1] && first.split('.')[1].length > 1) {
              return;
            }
            first = `${first}${val}`;
            this.setData({
              first,
              value: `${first}${operation}${second}`
            })
          }
          break;
        case '+-':
          if (/\./.test(last)) {
            return;
          }
          if (/[+\-*\/\.]/.test(last)) {
            operation = last === '+' ? '-' : '+';
            this.setData({ 
              operation,
              value: `${first}${operation}${second}`
            });
          } else {
            if (/[+\-*\/]/.test(value)) {
              result = this.calculator(+first, +second, operation);
              first = result;
              second = '';
              this.triggerEvent('confirmEvent', { result });
            }
            operation = '+';
            this.setData({
              first,
              second,
              operation,
              result,
              value: `${first}${operation}${second}`
            });
          }
          break;
        case '*/':
          if (/\./.test(last)) {
            return;
          }
          if (/[+\-*\/\.]/.test(last)) {
            operation = last === '*' ? '/' : '*';
            this.setData({ 
              operation,
              value: `${first}${operation}${second}`
            });
          } else {
            if (/[+\-*\/]/.test(value)) {
              result = this.calculator(+first, +second, operation);
              first = result;
              second = '';
              this.triggerEvent('confirmEvent', { result });
            }
            operation = '*';
            this.setData({
              first,
              second,
              operation,
              result,
              value: `${first}${operation}${second}`
            });
          }
          break;
        case '<':
          if (!first) {
            return;
          }
          if (operation) {
            if(second.length) {
              second = second.substr(0, second.length - 1);
              this.setData({
                second,
                value: `${first}${operation}${second}`
              })
            } else {
              operation = '';
              this.setData({
                operation,
                value: `${first}${operation}${second}`
              })
            }
          } else {
            first = first.substr(0, first.length - 1);
            this.setData({
              first,
              value: `${first}${operation}${second}`
            })
          }
          break;
        case '<<':
          this.hideCalculator();
          return;
        case 'ok':
          if (first === '') {
            return;
          }
          try {
            result = this.calculator(+first, +second, this.data.operation);
            if (result !== Infinity) {
              this.triggerEvent('confirmEvent', { result });
            }
          } catch(ex) {
          } finally {
            this.hideCalculator();
          }
          return;
      }
    },

    calculator: function(first, second, operation) {
      let result = 0;
      if (/\//.test(operation)) {
        second = second !== '' ? second : 1;
      }
      switch (operation) {
        case '+': 
          result = first + second;
          break;
        case '-':
          result = first - second;
          break;
        case '*':
          result = first * second;
          break;
        case '/':
          result = first / second;
          break;
        default:
          result = first + second;
          break;
      }
      if (/\./.test(result)) {
        result = result.toFixed(2);
      }
      return result;
    }
  }
})
