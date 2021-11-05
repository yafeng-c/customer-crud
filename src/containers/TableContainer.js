import { useState } from "react";
import { useDispatch } from "react-redux";
import { cancelUser, deleteUser, getUser } from "../state/actions";
import { useSelector } from "react-redux";
import EditUserContainer from "./EditUserContainer";
import "./TableContainer.css";
const TableContainer = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.user);
  const [inEdit, setInEdit] = useState(false);
  const editUser = (user) => {
    setInEdit(true);
    dispatch(getUser(user));
  };
  const handleClose = () => {
    setInEdit(false);
    dispatch(cancelUser());
  };

  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Credit Card Number</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>···</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0
            ? users.map((user) => (
                <tr key={user.uid}>
                  <td>{user.username}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.credit_card.cc_number}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.email}</td>
                  <td className="op-cell">
                    <button
                      className="editButton"
                      onClick={() => editUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="deleteButton"
                      onClick={() => dispatch(deleteUser(users, user.id))}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {currentUser && (
        <EditUserContainer isOpen={inEdit} onCloseModal={handleClose} />
      )}
    </div>
  );
};

export default TableContainer;
