import { useMemo, useState } from "react";
import MonoConnect from "@mono.co/connect.js";
import { useDispatch } from "react-redux";
import {
  connectMono,
  connectMonoNonAuthenticatedUsers,
} from "../../../data/actions/user";
import { useGlobalContext } from "../../../context/global";

const BankStatement = ({ form, setForm, setProgress, isDisabled }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { key } = useGlobalContext();
  console.log("key::: ", key, loading);
  const mono = useMemo(() => {
    const instance = new MonoConnect({
      key,
      onSuccess: ({ code }) => {
        setLoading(true);
        const monoForm = {
          code,
          email: form?.personal?.email,
        };

        console.log("called oooo: ", monoForm);
        dispatch(
          connectMonoNonAuthenticatedUsers(
            monoForm,
            () => {},
            () => {},
            setProgress
          )
        );
      },
      onError: (res) => {
        console.log(res ? res : "error");
      },
    });
    instance.setup();
    return instance;
  }, [dispatch, setLoading, key, setProgress, form?.personal?.email]);
  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-primary btn-get-started"
        onClick={() => mono.open()}
        disabled={isDisabled}
      >
        Connect Bank Statement
      </button>
    </div>
  );
};

export default BankStatement;
