import { Input } from "../../components/form-elements";
import CardLayout from "../card-layout";

export default function StoreForm({
  nameEl,
  descriptionEl,
  saveEvent,
  title,
  router,
  children,
  errors,
}) {
  return (
    <CardLayout title={title}>
      <>
        {errors.general && (
          <div className="notification is-danger">{errors.general}</div>
        )}
        {children}
        <Input id="name" refEl={nameEl} type="text" placeholder="Store Name" />
        {errors.name && <p className="help is-danger">{errors.name}</p>}
        <textarea
          placeholder="Add a Description..."
          className="textarea"
          ref={descriptionEl}
        ></textarea>
        {errors.description && (
          <p className="help is-danger">{errors.description}</p>
        )}
      </>
      <>
        <a className="card-footer-item" onClick={saveEvent}>
          Save
        </a>
        <a className="card-footer-item" onClick={() => router.back()}>
          Cancel
        </a>
      </>
    </CardLayout>
  );
}
