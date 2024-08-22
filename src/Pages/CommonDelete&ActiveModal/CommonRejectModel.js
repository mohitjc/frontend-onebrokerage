import React, { useEffect, useState } from "react";

export default function CommonRejectModal({ show, confirm, setShow }) {
  const [ShowModal, setShowModal] = useState("none");
  useEffect(() => {
    setShow(show);
  }, [show]);
  return (
    <div>
      <div
        class={`modal black-screen d-${show}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content p-4">
            {/* <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Delete</h5>
        <button type="button" class="close" onClick={e=>setShow("none")} data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> */}
            <div class="modal-body text-center">
              <img src="/assets/img/delete.png" className="delete_icon" />
              <h5 className="mt-3 mb-3">
                Are you sure you want to reject this?
              </h5>
            </div>
            <div class="text-center">
              <button
                type="button"
                onClick={(e) => setShow("none")}
                class="btn btn-secondary mr-2"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => confirm()}
                class="btn btn-primary"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
