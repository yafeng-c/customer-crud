import Modal from "react-modal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, addUser } from "../state/actions";
import { v4 as uuidv4 } from "uuid";
import "./NewModal.css";

const NewModal = ({ isOpen, onCloseModal, isEdit, isAdd }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.user.users);
  const [username, setUsername] = useState(
    currentUser ? currentUser.username : ""
  );
  const [first_name, setFirstName] = useState(
    currentUser ? currentUser.first_name : ""
  );
  const [last_name, setLastName] = useState(
    currentUser ? currentUser.last_name : ""
  );
  const [cc_number, setCc_number] = useState(
    currentUser ? currentUser.credit_card.cc_number : ""
  );
  const [phone_number, setPhone] = useState(
    currentUser ? currentUser.phone_number : ""
  );
  const [email, setEmail] = useState(currentUser ? currentUser.email : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit && !isAdd) {
      for (let user of users) {
        if (user.id === currentUser.id) {
          user.username = username;
          user.first_name = first_name;
          user.last_name = last_name;
          user.credit_card.cc_number = cc_number;
          user.phone_number = phone_number;
          user.email = email;
        }
      }
      dispatch(editUser(users));
      onCloseModal();
    }

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
          />
          <label>First Name</label>
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last Name</label>
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Credit Card Number</label>
          <input
            type="text"
            value={cc_number}
            onChange={(e) => setCc_number(e.target.value)}
          />
          <label>Phone number</label>
          <input
            type="text"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default NewModal;
