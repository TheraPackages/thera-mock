/* auto created by dumplings server with weex-devtool */

define('@weex-component/test.we', function (require, exports, module) {

;
  module.exports = {
    data: function () {return {
      itemList: [
        {itemId: '520421163634', title: '宝贝标123123题111', pictureUrl: 'https://gd2.alicdn.com/bao/uploaded/i2/T14H1LFwBcXXXXXXXX_!!0-item_pic.jpg'},
        {itemId: '522076777462', title: '宝贝标题', pictureUrl: 'https://gd1.alicdn.com/bao/uploaded/i1/TB1PXJCJFXXXXciXFXXXXXXXXXX_!!0-item_pic.jpg'}
      ]
    }},
    methods: {
      gotoDetail: function (e) {
        this.$openURL('https://item.taobao.com/item.htm?id=' + e.target.attr.itemId);
      }
    }
  };


;module.exports.style = {
  "container": {
    "flexDirection": "row"
  },
  "thumb": {
    "width": 200,
    "height": 200
  },
  "title": {
    "flex": 1,
    "color": "#ff0000",
    "fontSize": 48,
    "fontWeight": "bold",
    "backgroundColor": "#eeeeee"
  }
}

;module.exports.template = {
  "type": "container",
  "children": [
    {
      "type": "container",
      "classList": [
        "container"
      ],
      "repeat": function () {return this.itemList},
      "events": {
        "click": "gotoDetail"
      },
      "attr": {
        "itemId": function () {return this.itemId}
      },
      "children": [
        {
          "type": "image",
          "classList": [
            "thumb"
          ],
          "attr": {
            "src": function () {return this.pictureUrl}
          }
        },
        {
          "type": "text",
          "classList": [
            "title"
          ],
          "attr": {
            "value": function () {return this.title}
          }
        }
      ]
    }
  ]
}

;})

// require module
bootstrap('@weex-component/test.we', {"transformerVersion":"0.3.1"})