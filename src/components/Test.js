import React, { useContext, useEffect, useState } from "react";
import ServerCall from "@/common/ServerCall";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { ctx } from "@/context/appContext";
const Test = () => {
  const [questions, setQuestions] = useState([]);
  const [key, setKey] = useState({});
  const [ans, setAns] = useState({});
  const ctxData = useContext(ctx);
  const fnGetQuestions = async () => {
    try {
      const res = await ServerCall.fnSendGetReq("test/get-que");
      const _keyObj = {};
      res.data.forEach(({ _id, ans }) => {
        _keyObj[_id] = ans;
      });
      setKey(_keyObj);
      setQuestions(res.data);
      console.log(res.data);
    } catch (ex) {
      setQuestions(res.data);
    }
  };
  useEffect(() => {
    fnGetQuestions();
  }, []);
  const fnLogout = () => {
    const isOk = window.confirm("R u sure...");
    if (isOk) {
      sessionStorage.clear();
      ctxData.dispatch({
        type: "LOGOUT",
      });
    }
  };
  const fnSubmit = () => {
    let marks = 0;
    Object.keys(ans).forEach((val) => {
      if (key[val] == ans[val]) {
        marks = marks + 1;
      }
    });
    alert("You got " + marks + " marks");
  };
  const fnChange = (eve) => {
    const { name, value, type, checked } = eve.target;

    if (type === "checkbox") {
      const checkedValues = ans[name] ? ans[name].split("") : [];
      if (checked) {
        checkedValues.push(value);
      } else {
        const index = checkedValues.indexOf(value);
        checkedValues.splice(index, 1);
      }
      setAns({ ...ans, [name]: checkedValues.sort().join("") });
    } else {
      setAns({ ...ans, [name]: value });
    }
  };
  return (
    <div className="mb-5">
      <Button
        className="position-fixed end-0"
        onClick={fnLogout}
        variant="contained"
      >
        Logout
      </Button>
      {questions.map((obj, index) => {
        const { _id, que, type, opt1, opt2, opt3, opt4 } = obj;
        return (
          <Card className="px-3 py-3 mx-3 my-3">
            <h3 key={"que_" + index}>
              {index + 1}. {que}
            </h3>
            <p>
              <input
                key={"opt1_" + index}
                onChange={fnChange}
                value="A"
                className="me-2"
                name={_id}
                type={type == "M" ? "checkbox" : "radio"}
              />
              {opt1}
            </p>
            <p>
              <input
                key={"opt2_" + index}
                onChange={fnChange}
                value="B"
                className="me-2"
                name={_id}
                type={type == "M" ? "checkbox" : "radio"}
              />
              {opt2}
            </p>
            <p>
              <input
                key={"opt3_" + index}
                onChange={fnChange}
                value="C"
                className="me-2"
                name={_id}
                type={type == "M" ? "checkbox" : "radio"}
              />
              {opt3}
            </p>
            <p>
              <input
                key={"opt4_" + index}
                onChange={fnChange}
                value="D"
                className="me-2"
                name={_id}
                type={type == "M" ? "checkbox" : "radio"}
              />
              {opt4}
            </p>
          </Card>
        );
      })}
      <Button onClick={fnSubmit} variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default Test;
