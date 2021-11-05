import "./App.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./state/actions";
import TableContainer from "./containers/TableContainer";
import AddUserContainer from "./containers/AddUserContainer";

function App() {
  const dispatch = useDispatch();
  const [inAdd, setInAdd] = useState(false); //controal add user modal
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const users = useSelector((state) => state.user.users); // get all users
  const handleAddUser = () => {
    setInAdd(true);
  };
  // close modal
  const handleClose = () => {
    setInAdd(false);
  };
  return (
    <div className="app">
      <div className="app-title">
        <h1>Bank Users ({users.length})</h1>
      </div>
      <div className="app-operations">
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <TableContainer />
      {inAdd && <AddUserContainer isOpen={inAdd} onCloseModal={handleClose} />}
    </div>
  );
}

export default App;
