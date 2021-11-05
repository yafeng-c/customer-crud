import NewModal from "../components/NewModal";

const EditUserContainer = ({ isOpen, onCloseModal }) => {
  return (
    <div>
      <NewModal
        isOpen={isOpen}
        onCloseModal={onCloseModal}
        isEdit={true}
        isAdd={false}
      />
    </div>
  );
};

export default EditUserContainer;
