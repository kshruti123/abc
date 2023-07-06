import { Form } from "react-bootstrap";
// import { useSelector } from "react-redux";
const SortOptionsComponent = ({setSortOption}) => {
  return (
    <Form.Select aria-label="Default select example" onChange={(e)=>setSortOption(e.target.value)}>
      <option>Select Area</option>
      <option value="Chikkadpally">Chikkadpally</option>
      <option value="Himayathnagar">Himayathnagar</option>
      <option value="Abids">Abids</option>
      <option value="Lakdikapul">Lakdikapul</option>
      <option value="Secunderabad">Secunderabad</option>
      <option value="Kondapur">Kondapur</option>
      <option value="Miyapur">Miyapur</option>
      <option value="Madhapur">Madhapur</option>
      <option value="Manikonda">Manikonda</option>
      <option value="Gachibowli">Gachibowli</option>
      <option value="Nizampet">Nizampet</option>
      <option value="JNTUH">JNTUH</option>
      <option value="Erragadda">Erragadda</option>
      <option value="Ameerpet">Ameerpet</option>
    </Form.Select>
  );
};

export default SortOptionsComponent;

