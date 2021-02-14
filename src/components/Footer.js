import { useLocation } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      {useLocation().pathname === '/' && <a href="/about">About</a>}
      <p>Rafael Fonseca &copy; 2021</p>
    </footer>
  );
}

export default Footer;
