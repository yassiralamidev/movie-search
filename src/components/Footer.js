import React from 'react'
import '../style/footer.css'

function Footer() {
  return (
    <div className='footer'>
      <div className='footer__left'>
        <h3>About US</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tempus Proin commodo viverra nunc sit amet commodo. Sed pretium ullamcorper mi, in congue quam sagittis sit amet. Nulla a mollis metus. Etiam lobortis convallis massa. In eros ipsum, porttitor eget eleifend in, suscipit non erat.</p>
      </div>
      <div className='footer__center'>
        <h3>Get In Touch</h3>
        <ul>
          <li>mail@mail.com</li>
          <li>+21260000000</li>
          <li>Casablanca, Morocco</li>
        </ul>
      </div>
      <div className='footer__right'>
        <h3>Useful Links</h3>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Movies</a></li>
          <li><a href="/">TV Series</a></li>
          <li><a href="/">My Watchlist</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer