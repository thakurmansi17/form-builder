import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ".././../node_modules/bootstrap/dist/css/bootstrap.min.css";
const Form = (props) => {
  const history = useHistory();
  const [formData, setFormData] = useState({ question: "", toq: "" });
  const [options, setOptions] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [valid, setValid] = useState(false);
  const [block, setBlock] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, question: e.target.value });
    if (e.target.value.length == 0) {
      setErrorMsg("Please enter the question");
      setValid(false);
    } else {
      setErrorMsg("");
      setValid(true);
    }
  };

  const handleDropdown = (e) => {
    setFormData({ ...formData, toq: e.target.value });
    if (e.target.value == "mcq") {
      setBlock(true);
    } else {
      setBlock(false);
    }
  };

  const handleOption = (e) => {
    if (e.target.name == "option1") {
      setOptions({ ...options, first: e.target.value });
    } else if (e.target.name == "option2") {
      setOptions({ ...options, second: e.target.value });
    } else if (e.target.name == "option3") {
      setOptions({ ...options, third: e.target.value });
    } else if (e.target.name == "option4") {
      setOptions({ ...options, fourth: e.target.value });
    }
  };
  const onSubmit = (e) => {
    history.push("/");
    e.preventDefault();
    console.log(123, formData);
    let _formData = formData;
    _formData.opt = options;

    let obj1 = [];
    if (formData.toq == "mcq") {
      let arr1 = [
        formData.opt.first,
        formData.opt.second,
        formData.opt.third,
        formData.opt.fourth,
      ];
      console.log(9, arr1);
      obj1 = {
        formName: props.match.params.fn,
        questionData: _formData,
        date: new Date().toDateString(),
      };
    } else {
      obj1 = {
        formName: props.match.params.fn,
        questionData: _formData,
        date: new Date().toDateString(),
      };
    }

    let data = JSON.parse(sessionStorage.getItem("data"));
    if (data) {
      data.push(obj1);
      sessionStorage.setItem("data", JSON.stringify(data));
    } else {
      let arr1 = [];
      arr1.push(obj1);
      sessionStorage.setItem("data", JSON.stringify(arr1));
    }
  };
  const back = () => {
    history.push("/");
  };
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center">
        <div className="col-md-6">
          <h3>{props.match.params.fn}</h3>
          <form>
            <div className="form-group">
              <label>Question</label>
              <input
                className="form-control"
                type="text"
                onChange={handleChange}
                value={formData.question}
              ></input>
              <span className="text-danger">{errorMsg}</span>
            </div>

            <div className="form-group">
              <label>Type of Question</label>
              <select
                className="form-control"
                value={formData.mcq}
                onChange={handleDropdown}
              >
                <option value="" selected disabled>
                  ---select---
                </option>
                <option value="text">text</option>
                <option value="mcq">multiple choice</option>
              </select>
            </div>

            {block ? (
              <div className="">
                <form>
                  <div className="form-group">
                    <label>option 1</label>
                    <input
                      value={options.first}
                      name="option1"
                      type="text"
                      onChange={handleOption}
                    ></input>
                    <br />
                    <label>option 2</label>
                    <input
                      value={options.second}
                      name="option2"
                      type="text"
                      onChange={handleOption}
                    ></input>
                    <br />
                    <label>option 3</label>
                    <input
                      value={options.third}
                      name="option3"
                      type="text"
                      onChange={handleOption}
                    ></input>
                    <br />
                    <label>option 4</label>
                    <input
                      value={options.fourth}
                      name="option4"
                      type="text"
                      onChange={handleOption}
                    ></input>
                  </div>
                </form>
              </div>
            ) : null}
            <button
              disabled={!valid}
              className="btn btn-success"
              onClick={onSubmit}
            >
              Add
            </button>
            <br />
          </form>

          <button onClick={back} className="btn btn-warning mt-2">
            Back
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Form;
