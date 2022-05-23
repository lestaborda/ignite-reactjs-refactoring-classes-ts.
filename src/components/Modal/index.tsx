import { ReactNode, useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  setIsOpen: () => void;
}

const Modal = ({ setIsOpen, isOpen, children }: ModalProps): JSX.Element => {
  const [modalStatus, setModalStatus] = useState<boolean>(isOpen);

  const usePrevious = (value: boolean) => {
    const ref = useRef<boolean>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    if (prevIsOpen !== isOpen) {
      setModalStatus(isOpen);
    }
  }, [isOpen, prevIsOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#F0F0F5",
          color: "#000000",
          borderRadius: "8px",
          width: "736px",
          border: "none",
        },
        overlay: {
          backgroundColor: "#121214e6",
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
