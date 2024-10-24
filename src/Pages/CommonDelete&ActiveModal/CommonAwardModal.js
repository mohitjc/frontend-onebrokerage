import React, { useEffect, useState } from "react";

export default function CommonAwardModal({ show, confirm, setShow, status }) {
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
          <div class="modal-content py-5 px-3">
            {/* <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{status=="active"?"Deactive":"Active"}</h5>
        <button type="button" class="close" onClick={e=>setShow("none")} data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> */}
            <div class="modal-body text-center p-0">
              <p className="custom-exclamation">!</p>
              <h5 className="mb-3">
                <span className="whites">
                  Are you sure you want to award this ?
                </span>
              </h5>
            </div>
            <div class="text-center">
              <button
                type="button"
                onClick={(e) => setShow("none")}
                class="btn btn-secondary mr-2"
                data-dismiss="modal"
                id="AcceptBidCloseBtn"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={(e) => confirm()}
                class="btn btn-primary"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
