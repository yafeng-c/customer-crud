import NewModal from "../components/NewModal";

const AddUserContainer = ({ isOpen, onCloseModal }) => {
  return (
    <div>
      <NewModal
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        isEdit={false}
        isAdd={true}
      />
    </div>
  );
};

export default AddUserContainer;
