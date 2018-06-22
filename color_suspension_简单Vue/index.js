;
var vm = new Vue({
  el: "#app",
  data () {
    return {
      beroreThrottle: ''
    }
  },
  mounted () {
    this.beroreThrottle = this.throttle(this.fn, 50, 50)
  },
  methods: {
    mouseStartMove (e) {
      this.beroreThrottle(e)
    },
    fn () {
      const  e = arguments[0]
      this.move(e)
      console.log('fn')
    },
    throttle (fn, delay, mustRunDelay) {
      console.log("throttle 被执行")
      var timer = null
      var t_start
      return function () {
        var context = this,
          args = arguments,
          t_curr = +new Date()
        clearTimeout(timer)
        if(!t_start){
          t_start = t_curr
          console.log("!t_start")
        }
        if(t_curr - t_start >= mustRunDelay){
          fn.apply(context, args)
          t_start = t_curr
          console.log("t_curr - t_start >= mustRunDelay")
        } else {
          timer = setTimeout(function(){
            fn.apply(context, args)
          }, delay)
          console.log("timer")
        }
      }
    },
    move (e) {
      var x = e.pageX - e.target.offsetLeft
      var y = e.pageY - e.target.offsetTop
      e.target.style.setProperty('--x', `${ x }px`)
      e.target.style.setProperty('--y', `${ y }px`)
    }
  }
})
