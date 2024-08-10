import { Navbar, Container, Nav, Modal, Button } from "react-bootstrap";
import { useState } from "react";

const NavBar = () => {
  const [showModal, setShowModal] = useState(false); // State untuk mengontrol visibilitas modal
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setShowModal(false); // Sembunyikan modal setelah logout
  };

  return (
    <div>
      <Navbar className="navbar-box">
        <Container>
          <Navbar.Brand><img src="./logo.png" alt="hero" /></Navbar.Brand>
          <Navbar className="navbar">
            <Navbar.Collapse className="justify-content-end">
              <Nav className="justify-content-end">
                <Nav.Link className="item-list" href="about">About</Nav.Link>
                {isLoggedIn ? (
                  <>
                    <Nav.Link className="item-list" href="dashboard">Dashboard</Nav.Link>
                    <Nav.Link className="item-list" href="feeds">Feeds</Nav.Link>
                    <Nav.Link className="item-list"  onClick={() => setShowModal(true)}>Logout</Nav.Link>
                  </>
                ) : (
                  <Nav.Link className="item-list" href="login">Login</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </Navbar>
      <br />

      {/* Modal untuk konfirmasi logout */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmasi Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Anda yakin ingin logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button href="/" variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NavBar;
