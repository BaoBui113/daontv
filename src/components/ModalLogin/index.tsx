import Modal from "../CommonModal";
import LoginForm from "../LoginForm";

export default function ModalLogin({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <LoginForm />
    </Modal>
  );
}
