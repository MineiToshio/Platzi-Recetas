import React from 'react'

export default class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { timer: 3, timeLeft: 0 }
  }

  start = async () => {
    //Verificar si el browser soporta notificaciones
    if(!('Notification' in window) || !('serviceWorker' in navigator)) {
      return alert('Tu browser no soporta notificaciones')
    }

    //Si las notificaciones se encuentran por defecto
    if(Notification.permission === 'default') {
      await Notification.requestPermission()
    }

    //Si las notificaciones se encuentran bloqueadas
    if (Notification.permission === 'blocked') {
      alert('Bloqueaste las notificaciones')
    }

    //Si las notificaciones tienen algún permiso que no sea habilitado
    if(Notification.permission !== 'granted') {
      return
    }

    var timer = this.state.timer
    this.setState({ timeLeft: timer })

    var countdownInterval = setInterval(() => {
      timer = timer - 1;
      this.setState({ timeLeft: timer }) 
      if( timer <= 0 ) { 
        clearInterval(countdownInterval) 
        this.showNotification()
      }
    }, 1000)
  }

  showNotification = async () => {
    //Obtener la registración del service worker
    const registration = await navigator.serviceWorker.getRegistration()

    if(!registration) return alert("No hay un service worker")

    registration.showNotification("Listo el timer!", {
      body: 'Ding ding ding',
      img: '/icon.png'
    })
  }

  handleChange = (e) => {
    this.setState({timer: e.target.value})
  }

  render () {
    const { timer, timeLeft } = this.state

    return <div className="Timer">
      <div className="name">Timer</div>
      { timeLeft === 0 ? 
        <div className="center">
          <input type="number" min="0" max="999" step="1" value={timer} onChange={this.handleChange} />
          <button onClick={ this.start }>Start</button>
        </div>
      :
        <div className="timeLeft">{ timeLeft }s</div>
      }
    </div>
  }
}
