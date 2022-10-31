<template>
  <div :class="keyboardClass"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import layout from 'simple-keyboard-layouts/build/layouts/chinese';//中文输入法

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String,
    },
    input: {
      type: String,
    },
    layout: {
      type: Object,
      default: function () {
        return {
          default: [
            // "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "{shift} z x c v b n m {bksp}",
            "123 . , {space} {change} {esc} ok",
          ],
          shift: [
            "Q W E R T Y U I O P",
            'A S D F G H J K L',
            "{shift} Z X C V B N M {bksp}",
            "123 . , {space} {change} {esc} ok",

          ],
        };
      },
    },
  },
  data: () => ({
    keyboard: null,
    displayDefault: {
      '{bksp}': 'backspace',
      '{lock}': 'caps',
      '{enter}': '> enter',
      '{tab}': 'tab',
      '{shift}': 'shift',
      '{change}': '英文',
      '{space}': ' ',
      '{clear}': '清空',
      '{close}': '关闭',
    },
  }),
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
    });
    this.keyboard.setOptions({
      layoutName: "default",
      theme: "hg-theme-default hg-layout-default myTheme",
      layout: this.layout,
      display: {
        "{enter}": "close",
        "{shift}": "shift",
        "{bksp}": "del",
        "{tab}": "tab",
        "{space}": "space",
        "{lock}": "caps",
      },
      // 按钮展示文字
      display: this.displayDefault,
    });

  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button,$event) {
      // console.log(button,$event);
      // this.$emit("onKeyPress", button);
      // 点击关闭
      if (button === '{close}') {
        let keyboard = $event.path[3];
        keyboard.style.visibility = 'hidden';
        return false;
      } else if (button === '{change}') {
        // 切换中英文输入法
        if (this.keyboard.options.layoutCandidates !== null) {
          this.$set(this.displayDefault, '{change}', '中文');
          // 切换至英文
          this.keyboard.setOptions({
            layoutCandidates: null,
            display: this.displayDefault,
          });
        } else {
          // 切换至中文
          this.$set(this.displayDefault, '{change}', '英文');
          this.keyboard.setOptions({
            layoutCandidates: layout.layoutCandidates,
            display: this.displayDefault,
          });
        }
      } else if (button === '{clear}') {
        this.keyboard.clearInput();
      } else {
        let value =
          $event.target.offsetParent.parentElement.children[0].children[0]
            .value;
        // 输入框有默认值时，覆写
        if (value) {
          this.keyboard.setInput(value);
        }
        this.$emit('onKeyPress', button);
    }

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle,
      });
    },
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    },
  },
  destroyed(){
    this.keyboard.clearInput()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hg-theme-default .hg-row {
  height: 25%;
}
.hg-theme-default .hg-rows {
  box-sizing: border-box;
  height: 100%;
  padding: 30px;
}
.hg-theme-default .hg-button {
  background-color: #cedce4 !important;
  width: 115px;
  height: 85px;
  margin: 0 10px;
  font-size: 24px;
  font-weight: 700;
  border-radius: 3px;
}
.hg-button .hg-functionBtn .hg-button-space {
  width: 300px;
}
.hg-theme-default {
  background-color: #fff;
}
</style>

<!-- <style>
  .simple-keyboard {
    max-width: 850px;
    padding: 15px;
    margin: 0 auto;
    margin-top: 380px;
    box-shadow: 0 4px 0 #b2b2b2, 0 7px 16px rgba(0,0,0,.6);
  }

  .hg-theme-default .hg-button.hg-standardBtn{
    height: 50px;
    margin: 8px 10px;
    font-size: 23px;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    -webkit-box-shadow: 0 4px 0 #b2b2b2, 0 5px 10px rgba(0,0,0,.7);
    box-shadow: 0 3px 0 #b2b2b2, 0 4px 6px rgba(0,0,0,.7);
  }

  .hg-theme-default .hg-button.hg-standardBtn:active {
    box-shadow: 0 4px 0 #717070, 0 5px 3px rgba(0,0,0,.9);
    background-color: #efefef;
  }


  .simple-keyboard.hg-layout-default .hg-button.bksp {
    height: 50px;
    margin: 8px 10px;
    font-size: 23px;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    -webkit-box-shadow: 0 4px 0 #b2b2b2, 0 5px 10px rgba(0,0,0,.7);
    box-shadow: 0 3px 0 #b2b2b2, 0 4px 6px rgba(0,0,0,.7);
    background: #a8001e;
    color: white;
  }

  .simple-keyboard.hg-layout-default .hg-button.bksp:active {
    box-shadow: 0 4px 0 #717070, 0 5px 3px rgba(0,0,0,.9);
    background-color: #efefef;
    color: #000000;
  }

   .simple-keyboard.hg-layout-default .hg-button.enter {
    height: 50px;
    margin: 8px 10px;
    font-size: 23px;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    -webkit-box-shadow: 0 4px 0 #b2b2b2, 0 5px 10px rgba(0,0,0,.7);
    box-shadow: 0 3px 0 #b2b2b2, 0 4px 6px rgba(0,0,0,.7);
    background: #a8001e;
    color: white;
  }

  .simple-keyboard.hg-layout-default .hg-button.enter:active {
    box-shadow: 0 4px 0 #717070, 0 5px 3px rgba(0,0,0,.9);
    background-color: #efefef;
    color: #000000;
  }
</style> -->

