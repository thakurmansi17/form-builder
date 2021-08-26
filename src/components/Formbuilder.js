import React from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import FormDetails from "./FormDetails";
const Formbuilder = () => {
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [fname, setFname] = React.useState(null);
  const [res, setRes] = React.useState(null);
  const onsubmit = () => {
    history.push(`/addForm/${fname}`);
    console.log("submitted!!");
  };
  React.useEffect(() => {
      //sessionStorage.clear()
    let a = JSON.parse(sessionStorage.getItem("data"));
    let b = JSON.parse(sessionStorage.getItem("response"));
    console.log("sessionData", b);
    console.log("mounted");
    if (a) {
      setData(a);
    }
    if (b) {
      setRes(b);
    }
  }, []);
  const handleLink = (v) => {
    history.push({ pathname: `/form/${v.formName}` });
    sessionStorage.setItem("form", JSON.stringify(v));
  };
  const handleInput = (e) => {
    if (e.target.value.length > 0) {
      setFname(e.target.value);
    } else {
      setFname(null);
    }
  };
  const len = (d) => {
    console.log(d);
    let count = 0;

    if (res) {
      res.forEach((v) => {
        console.log(d.formName, v.formName);
        if (v.formName == d.formName) {
          count += 1;
        }
      });
    }
    return count;
  };
  return (
    <React.Fragment>
      {open ? (
        <FormDetails></FormDetails>
      ) : (
        <>
          <h2>Create Form!!!</h2>
          <input type="text" onChange={handleInput}></input>&nbsp;
          <button
            className="btn btn-primary"
            onClick={onsubmit}
            disabled={!fname}
          >
            Add Question
          </button>
          <table className="table table-striped mt-3">
            <thead className="thead-dark">
              <tr>
                <th>Form Name</th>
                <th>Created At</th>
                <th>No of Responses</th>
              </tr>
            </thead>
            {/*<tbody>*/}
            {data ? (
              <tbody>
                {data.map((d) => {
                  return (
                    <tr key={d.formName}>
                      <td>
                        <Link onClick={() => handleLink(d)}>{d.formName}</Link>
                      </td>
                      <td>{d.date}</td>
                      <td>{len(d)}</td>
                    </tr>
                  );
                })}
              </tbody>
            ) : null}
            {/*tbody*/}
          </table>
        </>
      )}
    </React.Fragment>
  );
};
export default Formbuilder
