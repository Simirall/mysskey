import Modal from "react-modal";
import { usePostModalContext } from "../utils/ModalContext";
import { useForm } from "react-hook-form";
import Note from "./Note";

export default function PostModal(props) {
  let socket = props.socket;
  const {
    postModal,
    updatePostModal,
    replyProp,
    updateReplyProp,
    renoteProp,
    updateRenoteProp,
  } = usePostModalContext();
  const { register, handleSubmit } = useForm();
  const onSubmitPost = (data) => {
    let createNoteObject = {
      type: "api",
      body: {
        id: "create",
        endpoint: "notes/create",
        data: {
          i: localStorage.getItem("UserToken"),
          text: data.text ? data.text : null,
          replyId: data.replyId ? data.replyId : null,
          renoteId: data.renoteId ? data.renoteId : null,
        },
      },
    };
    socket.send(JSON.stringify(createNoteObject));
    updateReplyProp("");
    updateRenoteProp("");
    updatePostModal(false);
  };
  return (
    <Modal
      isOpen={postModal}
      onRequestClose={() => {
        updateReplyProp("");
        updateRenoteProp("");
        updatePostModal(false);
      }}
      className="postModal"
      overlayClassName="Overlay"
    >
      {replyProp && (
        <div className="note">
          <Note
            data={replyProp}
            depth={1}
            type={
              !replyProp.renoteId
                ? "general"
                : replyProp.text || replyProp.files.length
                ? "quote"
                : "renote"
            }
          />
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmitPost)}>
        <textarea
          name="text"
          ref={register}
          placeholder={
            replyProp
              ? "このノートに返信..."
              : renoteProp
              ? "引用(空だと通常のRenoteになります)"
              : "何を考えていますか？"
          }
          onSubmit={handleSubmit(onSubmitPost)}
          autoFocus
          required
        ></textarea>
        <input
          type="hidden"
          name="replyId"
          value={replyProp ? replyProp.id : ""}
          ref={register}
        ></input>
        <input
          type="hidden"
          name="renoteId"
          value={renoteProp ? renoteProp.id : ""}
          ref={register}
        ></input>
        <input type="submit" value="投稿" />
      </form>
      {renoteProp && (
        <div className="note">
          <Note
            data={renoteProp}
            depth={1}
            type={
              !renoteProp.renoteId
                ? "general"
                : renoteProp.text || renoteProp.files.length
                ? "quote"
                : "renote"
            }
          />
        </div>
      )}
    </Modal>
  );
}