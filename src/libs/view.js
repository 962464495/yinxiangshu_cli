import iView from 'iview'

class view {
  static tip (message, type = 'success') {
    if (type === 'success') {
      iView.Notice.success({
        title: message
      })
    } else if (type === 'warning') {
      iView.Notice.warning({
        title: message
      })
    } else if (type === 'error') {
      iView.Notice.error({
        title: message
      })
    } else {
      iView.Notice.info({
        title: message
      })
    }

  }

  static startLoginbar () {
    iView.LoadingBar.start()
  }

  static finishLoginbar () {
    iView.LoadingBar.finish()
  }

  static errorLoginbar () {
    iView.LoadingBar.error()
  }

  static log (message) {
    console.log(message)
  }

  static showLoding (msg) {
    if (msg == undefined || msg == '') {
      msg = '请稍等...'
    }
    iView.Spin.show({
      render: (h) => {
        return h('div', [
          h('Icon', {
            'class': 'demo-spin-icon-load',
            props: {
              type: 'ios-loading',
              size: 64
            }
          }),
          h('div', msg)
        ])
      }
    })

  }

  static hideLoding () {
    iView.Spin.hide()
  }

  static showMsg (msg) {
    iView.Notice.warning({
      title: '提示信息',
      desc: msg
    })
  }

}

export default view
