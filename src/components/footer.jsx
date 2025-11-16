import "./footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-inner-container">
          <div className="footer-title">Fakturera</div>
          <nav>
            <ul className="footer-links">
              <li>Home</li>
              <li>Order</li>
              <li>Contact us</li>
            </ul>
          </nav>
        </div>

        <hr />

        <p className="copyright">&copy; Fakturera, CRO no.638537, 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};
