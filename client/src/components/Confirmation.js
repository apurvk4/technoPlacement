import Modal from "./Modal";

const Confirmation = (props) => {
  return (
    <Modal
      darken={true}
      outsideclick="allow"
      header={props.header}
      close={props.close}
    >
      <>
        <div className="card-title">
          <b>{props.message}</b>
        </div>
        <div className="d-flex justify-content-center align-items-center py-3">
          <div style={{ flexGrow: 0 }}>
            <b>{props.confimationMessage}</b>
          </div>
          <div style={{ flexGrow: 1, marginLeft: "5px" }}>
            <input
              type={"checkbox"}
              style={{ flexGrow: 1, width: "20px", height: "20px" }}
              onChange={(e) => {
                props.setConfirmation(e.target.checked);
              }}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end p-3">
          <button
            className="btn btn-danger"
            onClick={() => {
              props.action();
            }}
          >
            Confirm
          </button>
        </div>
      </>
    </Modal>
  );
};
export default Confirmation;
