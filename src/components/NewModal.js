import Modal from "react-modal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, addUser } from "../state/actions";
import { v4 as uuidv4 } from "uuid";
import "./NewModal.css";

const NewModal = ({ isOpen, onCloseModal, isEdit, isAdd }) => {
  const dispatch = useDispatch();
  const user2edit = useSelector((state) => state.user.user2edit); // user to be edited, otherwise null
  const users = useSelector((state) => state.user.users);
  // get initial content for modal based on add or edit modal
  const [username, setUsername] = useState(user2edit ? user2edit.username : "");
  const [first_name, setFirstName] = useState(
    user2edit ? user2edit.first_name : ""
  );
  const [last_name, setLastName] = useState(
    user2edit ? user2edit.last_name : ""
  );
  const [cc_number, setCc_number] = useState(
    user2edit ? user2edit.credit_card.cc_number : ""
  );
  const [phone_number, setPhone] = useState(
    user2edit ? user2edit.phone_number : ""
  );
  const [email, setEmail] = useState(user2edit ? user2edit.email : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    // edit modal
    if (isEdit && !isAdd) {
      for (let u of users) {
        if (u.id === user2edit.id) {
          u.username = username;
          u.first_name = first_name;
          u.last_name = last_name;
          u.credit_card.cc_number = cc_number;
          u.phone_number = phone_number;
          u.email = email;
        }
      }
      dispatch(editUser(users));
      onCloseModal();
    }
    // add modal
    if (!isEdit && isAdd) {
      let newUser = {
        username: username,
        first_name: first_name,
        last_name: last_name,
        credit_card: {
          cc_number: cc_number,
        },
        phone_number: phone_number,
        email: email,
        id: uuidv4(),
      };
      // clean modal contents
      dispatch(addUser(users, newUser));
      setUsername("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      onCloseModal();
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        ariaHideApp={false}
        style={{
          content: {
            background: "#D9EEE1",
          },
        }}
      >
        <div className="close-modal">
          <button onClick={onCloseModal}>x</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>First Name</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label>Credit Card Number</label>
          <input
            type="text"
            value={cc_number}
            onChange={(e) => setCc_number(e.target.value)}
            required
          />
          <label>Phone number</label>
          <input
            type="text"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default NewModal;
