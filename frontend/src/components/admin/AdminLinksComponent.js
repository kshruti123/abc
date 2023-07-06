import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logoutUser } from "../../redux/actions/UserActions";
import { useDispatch } from "react-redux";
const AdminLinksComponent = () => {
  const dispatch = useDispatch();
  return (
    <Navbar bg="light" variant="light">
      <Nav className="flex-column">
        <LinkContainer to="/admin/farmers">
          <Nav.Link>Farmers</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/admin/user">
          <Nav.Link>Users</Nav.Link>
        </LinkContainer>
        {/* <LinkContainer to="/admin/chats">
          <Nav.Link>Chats</Nav.Link>
        </LinkContainer > */}
        <Nav.Link onClick={() => dispatch(logoutUser())}>Logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AdminLinksComponent;

