import {Form} from "react-bootstrap";

const accelZ = () => {
  return (
    <div>
      <div class="unduh-box">
      <form action= " ">
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Mulai : </Form.Label>
          <Form.Control type="date" placeholder=" " />
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label>Sampai : </Form.Label>
          <Form.Control type="date" placeholder=" " />
        </Form.Group>
        <br />
        <button type="submit">Unduh</button>
        <br /><br />
        <button type="reset">Batal</button>
      </form>
    </div>
    </div>  
  );
}

export default accelZ