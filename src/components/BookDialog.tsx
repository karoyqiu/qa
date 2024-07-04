import { forwardRef } from 'react';

type BookDialogProps = {};

const BookDialog = forwardRef<HTMLDialogElement, BookDialogProps>(function BookDialog(props, ref) {
  return (
    <dialog className="modal" ref={ref}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">Book</h3>
        <p>Whatever.</p>
        <div className="modal-action">
          <form action="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default BookDialog;
