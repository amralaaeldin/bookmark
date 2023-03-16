import Image from "next/image";
// import './../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="logo">
          <Image
            width="125"
            height="21"
            src="/assets/logo-bookmark-footer.svg"
            alt="logo-bookmark"
          />
          <ul>
            <li>features</li>
            <li>pricing</li>
            <li>contact</li>
          </ul>
        </div>
        <div className="social">
          <div className="facebook">
            <i className="fa-brands fa-facebook-square"></i>
          </div>
          <div className="twitter">
            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
