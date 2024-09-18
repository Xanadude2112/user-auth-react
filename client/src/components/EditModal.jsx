import lightning from "../assets/images/blue-lightning.png";
import "../styles/EditModal.scss";

export const EditModal = ({ handleEditModal }) => {


  return(
    <div className="modal">
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="edit-title">EDIT MEMBER <img className="modal-lightning" src={lightning} alt="" /></h2>
          <form>
            <div className="modal-inputs">
              <p className="input-top username">Username</p>
              <input type="text" name="username" value="hello world" />
              <p className="input-top email">Email</p>
              <input type="email" name="email" value="hello world" />
            </div>
          </form>
          <div className="modal-interact-edit">
            <button className="btn cancel" onClick={handleEditModal}>Cancel</button>
            <button className="btn save">Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}