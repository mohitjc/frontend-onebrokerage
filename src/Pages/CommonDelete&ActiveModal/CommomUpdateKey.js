import React, { useEffect, useState } from "react";

export default function CommonUpdateKeyModal({
  show,
  confirm,
  setShow,
  status,
}) {
  const [ShowModal, setShowModal] = useState("none");
  const [price, setprice] = useState(0);
 
  useEffect(() => {
    setShow(show);
    if (show == "none") {
      setprice("");
    }
  }, [show]);

  const submit = () => {
    if (price == 0 || price < 0) {
      return false;
    }
    confirm(price);
    setprice("");
    setShow("none");
  };
  return (
    <div>
      <div
        class={`modal black-screen d-${show}`}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content pt-2 px-4 pb-4">
            {/* <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{status=="active"?"Deactive":"Active"}</h5>
        <button type="button" class="close" onClick={e=>setShow("none")} data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> */}
            <div class="modal-body text-center">
              <p className="custom-exclamation custom-exclamationtwo">!</p>
              <h5 className="mb-1">Update margin value</h5>
            </div>
            <input
              placeholder="Enter Amount"
              className="form-control"
              value={price}
              type="number"
              name=""
              id=""
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
            <div class="text-center mt-4">
              <button
                type="button"
                onClick={(e) => {
                  submit();
                }}
                class="btn btn-primary"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={(e) => setShow("none")}
                class="btn btn-secondary ml-3"
                data-dismiss="modal"
                id="AcceptBidCloseBtn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
