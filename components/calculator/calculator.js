// components/calculator/calculator.js
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
    value: '',
    okText: '=',
    result: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showCalculator: function (value) {
      this.setData({
        isShow: true,
        value: value || ''
      })
    },

    hideCalculator: function() {
      this.setData({
        isShow: false
      })
    },

    changeValue: function(e) {
      let value = this.data.value;
      let result = this.data.result;
      const last = value.charAt(value.length - 1);
      switch (e.target.dataset.val) {
        case '1':
          value = `${value}1`;
          break;
        case '2':
          value = `${value}2`;
          break;
        case '3':
          value = `${value}3`;
          break;
        case '4':
          value = `${value}4`;
          break;
        case '5':
          value = `${value}5`;
          break;
        case '6':
          value = `${value}6`;
          break;
        case '7':
          value = `${value}7`;
          break;
        case '8':
          value = `${value}8`;
          break;
        case '9':
          value = `${value}9`;
          break;
        case '0':
          value = `${value}0`;
          break;
        case '.':
          if (last !== '.') {
            value = `${value}.`;
          }
          break;
        case '+-':
          if (!/[+|\-|*|\/]/.test(last)) {
            value = `${value}+`;
          } else {
            value = value.substr(0, value.length - 1);
            value = last === '+' ? `${value}-` : value = `${value}+`;
          }
          break;
        case '*/':
          if (!/[+|\-|*|\/]/.test(last)) {
            value = `${value}*`;
          } else {
            value = value.substr(0, value.length - 1);
            value = last === '*' ? `${value}/` : value = `${value}*`;
          }
          break;
        case '<':
          value = value.substr(0, value.length - 1);
          break;
        case '<<':
          this.hideCalculator();
          return;
        case 'ok':
          result = eval(value);
          break;
      }
      this.setData({
        value,
        result
      })
    }
  }
})
