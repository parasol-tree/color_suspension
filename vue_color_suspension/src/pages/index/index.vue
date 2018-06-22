<template>
  <div class="js-btn css-btn" @mousemove="mouseMoveHandler($event)">
    滑动我看看颜色 index
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      beroreThrottle: '', // 开始设置节流前执行的函数
      timeDelayFn: null, // 延时器函数
      startDelayTime: null, // 开始时间
      x: '', // 鼠标 的 x 轴 坐标
      y: '', // 鼠标 的 y 轴 坐标
      args: '', // 函数的 arguments
      timeNow: ''// 从 1970年1月1日0点0分0秒到当前时间的毫秒数
    }
  },
  mounted () {
    this.beroreThrottle = this.throttleFn(this.throttleFnFirstParameter, 50, 50)
  },
  methods: {
    // 页面 DOM 绑定的事件
    mouseMoveHandler (e) { this.beroreThrottle(e) },
    throttleFnFirstParameter () {
      const e = arguments[0]
      this.handleMouseMoveEvent(e)
    },
    /*
      以下是 节流函数 throttleFn() 的参数
      @ throttleFnFirstParameter 函数(设置 鼠标移动事件)
      @ delay 事件 延时执行的 的 时间间隔
      @ mustRunDelay 事件 必须执行的 时间间隔
    */
    throttleFn (throttleFnFirstParameter, delay, mustRunDelay) {
      return function () {
        this.args = arguments
        this.timeNow = +new Date()
        clearTimeout(this.timeDelayFn)
        // this.startDelayTime == null ? this.startDelayTime = this.timeNow : ''
        if (!this.startDelayTime) { this.startDelayTime = this.timeNow }
        let timeDifference = this.timeNow - this.startDelayTime
        timeDifference >= mustRunDelay ? this.handleResetStartDelayTimeFn(throttleFnFirstParameter, this.args) : this.handleSetTimeDelayFn(throttleFnFirstParameter, delay, this.args)
      }
    },
    handleMouseMoveEvent (e) {
      this.x = e.pageX - e.target.offsetLeft
      this.y = e.pageY - e.target.offsetTop
      e.target.style.setProperty('--x', `${this.x}px`)
      e.target.style.setProperty('--y', `${this.y}px`)
    },
    handleResetStartDelayTimeFn (throttleFnFirstParameter, args) {
      throttleFnFirstParameter.apply(this, args)
      this.startDelayTime = this.timeNow
    },
    handleSetTimeDelayFn (throttleFnFirstParameter, delay, args) {
      this.timeDelayFn = setTimeout(() => {
        throttleFnFirstParameter.apply(this, args)
      }, delay)
    }
  }
}
</script>

<style scoped>
.css-btn {
  width: 300px;
  height: 30px;
  border-radius: 100px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  background-color: #f72359;
}
  .css-btn > span {
    position: relative;
    z-index: 999;
  }
  .css-btn:hover::before {
      --size: 300px;
  }
  .css-btn::before {
    --size: 0;
    content: '';
    width: var(--size);
    height: var(--size);
    position: absolute;
    left: var(--x);
    top: var(--y);
    z-index: -1;
    background: radial-gradient(circle closest-side, #4405f7, transparent);
    transform: translate(-50%, -50%);
    transition: width .2s ease, height .2s ease;
  }
</style>
