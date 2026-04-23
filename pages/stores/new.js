import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { addStore } from "../../data/stores";
import StoreForm from "../../components/store/form";
import Layout from "../../components/layout";
import Navbar from "../../components/navbar";

NewStore.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};

export default function NewStore() {
  const nameEl = useRef();
  const descriptionEl = useRef();
  const router = useRouter();

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    general: "",
  });

  const saveStore = () => {
    setErrors({
      name: "",
      description: "",
      general: "",
    });

    addStore({
      name: nameEl.current.value,
      description: descriptionEl.current.value,
    })
      .then((res) => {
        console.log("STORE CREATE RESPONSE:", res);

        if (!res || !res.id) {
          return;
        }

        router.push(`/stores/${res.id}`);
      })
      .catch((err) => {
        console.log("FULL ERROR:", err);
        console.log("ERROR DATA:", err.data);
        const data = err.data || {};

        setErrors({
          name: data.name ? data.name[0] : "",
          description: data.description ? data.description[0] : "",
          general: data.non_field_errors ? data.non_field_errors[0] : "",
        });
      });
  };

  return (
    <StoreForm
      nameEl={nameEl}
      descriptionEl={descriptionEl}
      saveEvent={saveStore}
      router={router}
      title="Create your store"
      errors={errors}
    >
      <p>
        Give your new store a name and description. Then add products on the
        next page
      </p>
    </StoreForm>
  );
}
