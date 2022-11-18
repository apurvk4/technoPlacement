import { PromiseProvider } from "mongoose";
import { useState, useRef } from "react";
function codingCourse(details, links, setDetails, setLinks) {
  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="details" data-required="true">
          details
        </label>
        <textarea
          type="text"
          className="form-control"
          id="details"
          aria-describedby="nameHelp"
          value={details}
          onInput={(e) => {
            if (details !== e.target.value) {
              setDetails(e.target.value);
            }
          }}
        />
        <small id="nameHelp" className="form-text text-muted">
          Detailed Explaination of the Question
        </small>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="link1" data-required="true">
          question Link 1
        </label>
        <input
          type="url"
          className="form-control"
          id="link1"
          aria-describedby="qlink1"
          onBlur={(e) => {
            if (links[0] !== e.target.value) {
              setLinks([e.target.value, links[1]]);
            }
          }}
        />
        <small id="qlink1" class="form-text text-muted">
          Enter the first Link of the question
        </small>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="link2" data-required="true">
          question Link 2
        </label>
        <input
          type="url"
          className="form-control"
          id="link2"
          aria-describedby="qlink2"
          onBlur={(e) => {
            if (links[1] !== e.target.value) {
              setLinks([links[0], e.target.value]);
            }
          }}
        />
        <small id="qlink2" className="form-text text-muted">
          Enter the second Link of the question
        </small>
      </div>
    </>
  );
}
function articleCourse(body, setBody) {
  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="articleBody" data-required="true">
          Article Body
        </label>
        <textarea
          type="text"
          className="form-control"
          id="articleBody"
          aria-describedby="article"
          value={body}
          onInput={(e) => {
            if (body !== e.target.value) {
              setBody(e.target.value);
            }
          }}
        />
        <small id="article" className="form-text text-muted">
          Body of the article
        </small>
      </div>
    </>
  );
}

function McqCourse(len, removeQ, mcq) {
  let l = [];
  for (let k = 0; k < len; k++) {
    let i = k + 1;
    l.push(
      <div className="accordion" id={"accordion" + i}>
        <div className="card">
          <div className="card-header" id={"heading" + i}>
            <h2 className="mb-0 d-flex justify-content-between">
              <button
                className="btn btn-link btn-block text-left"
                type="button"
                data-toggle="collapse"
                data-target={"#collapse" + i}
                aria-expanded="true"
                aria-controls={"collapse" + i}
                style={{ flexGrow: 2 }}
              >
                Question {i}
              </button>
              <button
                style={{ flexGrow: 1 }}
                className="btn btn-sm"
                aria-label="remove this question"
                title="remove this question"
                onClick={(e) => {
                  e.preventDefault();
                  removeQ(k);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </h2>
          </div>
          <div
            id={"collapse" + i}
            className="collapse"
            aria-labelledby={"heading" + i}
            data-parent={"#accordion" + i}
          >
            <div className="card-body">
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor={"question" + i} data-required="true">
                  Question {i}
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id={"question" + i}
                  aria-describedby={"ques" + i}
                  required
                  onInput={(e) => {
                    e.preventDefault();
                    mcq[k]["question"] = e.target.value;
                  }}
                />
                <small id={"ques" + i} className="form-text text-muted">
                  Enter The Question
                </small>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="option1" data-required="true">
                  Option 1
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="option1"
                  aria-describedby="opt1"
                  required
                  onInput={(e) => {
                    e.preventDefault();
                    mcq[k]["option1"] = e.target.value;
                  }}
                />
                <small id="opt1" className="form-text text-muted">
                  Enter Option 1
                </small>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="option2" data-required="true">
                  Option 2
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="option2"
                  aria-describedby="opt2"
                  required
                  onInput={(e) => {
                    e.preventDefault();
                    mcq[k]["option2"] = e.target.value;
                  }}
                />
                <small id="opt2" className="form-text text-muted">
                  Enter Option 2
                </small>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="option3" data-required="true">
                  Option 3
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="option3"
                  aria-describedby="opt3"
                  required
                  onInput={(e) => {
                    e.preventDefault();
                    mcq[k]["option3"] = e.target.value;
                  }}
                />
                <small id="opt3" className="form-text text-muted">
                  Enter Option 3
                </small>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="option4" data-required="true">
                  Option 4
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  id="option4"
                  aria-describedby="opt4"
                  required
                  onInput={(e) => {
                    e.preventDefault();
                    mcq[k]["option4"] = e.target.value;
                  }}
                />
                <small id="opt4" className="form-text text-muted">
                  Enter Option 4
                </small>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="answer" data-required="true">
                  Correct Answer
                </label>
                <select
                  className="custom-select"
                  id="answer"
                  onChange={(e) => {
                    mcq[k]["answer"] = e.target.value;
                  }}
                  required={true}
                >
                  <option selected disabled value="">
                    Choose...
                  </option>
                  <option value="option1">option1</option>
                  <option value="option2">option2</option>
                  <option value="option3">option3</option>
                  <option value="option4">option4</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return l;
}
const AddCourse = (props) => {
  const [courseType, setcourseType] = useState(null);
  const [tags, setTags] = useState([]);
  const tagInp = useRef(null);
  const [mcq, setMcq] = useState([{}]);
  const [cname, setcname] = useState("");
  const [details, setDetails] = useState("");
  const [links, setLinks] = useState(["", ""]);
  const [body, setBody] = useState("");

  function displayForm() {
    switch (courseType) {
      case "Coding":
        return codingCourse(details, links, setDetails, setLinks);
      case "Article":
        return articleCourse(body, setBody);
      case "Mcq":
        let l = McqCourse(mcq.length, removeMcq, mcq);
        let btn = (
          <button
            id="tag-add-btn"
            className="btn"
            style={{
              backgroundColor: "#7f90fb",
              marginLeft: "10px",
              width: "149px",
              height: "50px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
            onClick={() => {
              setMcq([...mcq, {}]);
            }}
          >
            Add More Questions
          </button>
        );
        l.push(btn);
        return l;
      default:
        break;
    }
  }
  function updateType(e) {
    // console.log(e.target.value);
    switch (e.target.value) {
      case "Coding":
        setcourseType(e.target.value);
        break;
      case "Article":
        setcourseType(e.target.value);
        break;
      case "Mcq":
        setcourseType(e.target.value);
        break;
      default:
        break;
    }
  }
  function removeMcq(index) {
    if (mcq.length > 1) {
      setMcq(mcq.filter((m, i) => i !== index));
    }
  }
  function verifyMcq() {
    let res = true;
    let index = -1;
    let prop = "";
    for (let i = 0; i < mcq.length; i++) {
      let q = mcq[i];
      if (!("question" in q) || q["question"].trim().length === 0) {
        res = false;
        index = i;
        prop = "question";
        break;
      }
      if (!("option1" in q) || q["option1"].trim().length === 0) {
        res = false;
        index = i;
        prop = "option1";
        break;
      }
      if (!("option2" in q) || q["option2"].trim().length === 0) {
        res = false;
        index = i;
        prop = "option2";
        break;
      }
      if (!("option3" in q) || q["option3"].trim().length === 0) {
        res = false;
        index = i;
        prop = "option3";
        break;
      }
      if (!("option4" in q) || q["option4"].trim().length === 0) {
        res = false;
        index = i;
        prop = "option4";
        break;
      }
      if (!("answer" in q) || q["answer"].trim().length === 0) {
        res = false;
        index = i;
        prop = "answer";
        break;
      }
    }
    if (res) {
      return { status: true };
    }
    return { status: false, index, prop };
  }
  function verifyArticle() {
    if (body === "" || body.trim().length === 0) {
      return { status: false, prop: "body" };
    }
    return { status: true };
  }
  function verifyCoding() {
    if (details === "" || details.trim().length === 0) {
      return { status: false, prop: "details" };
    }
    if (links.length < 2) {
      return { status: false, prop: "question urls" };
    }
    let re =
      /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    if (!links[0].match(re)) {
      return { status: false, prop: "question url 1" };
    }
    if (!links[1].match(re)) {
      return { status: false, prop: "question url 2" };
    }
    return { status: true };
  }
  function verifyFields() {
    if (cname === "" || cname.trim().length === 0) {
      return "course name needs to filled";
    }
    if (!courseType) {
      return "need to select a course type";
    }
    if (tags.length === 0) {
      return "atleast one tag needs to be added";
    }
    switch (courseType) {
      case "Coding":
        let res = verifyCoding();
        if (res.status) {
          return true;
        }
        return res.prop + " feild needs to be filled properly";
      case "Article":
        let res1 = verifyArticle();
        if (res1.status) {
          return true;
        }
        return res1.prop + " feild needs to be filled";
      case "Mcq":
        let res2 = verifyMcq();
        if (res2.status) {
          return true;
        }
        let i = res2.index + 1;
        return (
          res2.prop + " feild of question number " + i + " needs to filled"
        );
      default:
        return "unknown error";
    }
  }
  async function submitForm() {
    let res = verifyFields();
    if (typeof res === "boolean" && res) {
      let feilds = {};
      switch (courseType) {
        case "Coding":
          feilds = {
            name: cname,
            courseType,
            tags,
            codingLinks: [{ link: links[0] }, { link: links[1] }],
            details,
          };
          break;
        case "Article":
          feilds = {
            name: cname,
            courseType,
            tags,
            articleBody: body,
          };
          break;
        case "Mcq":
          feilds = {
            name: cname,
            courseType,
            tags,
            mcqs: mcq,
          };
          break;
        default:
          alert("invalid courseType");
          return;
      }
      const res = await fetch(process.env.REACT_APP_ADD_COURSE, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(feilds),
      });
      if (res.status === 201) {
        alert("course added successfully");
        props.close();
      } else {
        let value = await res.json();
        alert(value.message);
      }
    } else {
      alert(res);
    }
  }

  function updateTags(e) {
    e.preventDefault();
    let value = tagInp.current.value;
    if (value !== "" && !tags.includes(value)) {
      setTags([...tags, value]);
      tagInp.current.value = "";
      tagInp.current.focus();
    }
  }
  function removeTag(e) {
    const item = e.target.parentElement.textContent.slice(0, -1);
    console.log(e.target.parentElement.textContent.slice(0, -1));
    setTags(tags.filter((tag) => tag !== item));
    console.log(tags);
  }
  function displayTags() {
    return tags.map((tag, i) => {
      return (
        <span key={i} className="tag">
          {tag}
          <span onClick={(e) => removeTag(e)} class="remove-tag">
            &#10006;
          </span>
        </span>
      );
    });
  }
  return (
    <form style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="CourseName" data-required="true">
          Course Name
        </label>
        <input
          type="text"
          className="form-control"
          id="CourseName"
          aria-describedby="nameHelp"
          required
          onBlur={(e) => {
            if (cname !== e.target.value) {
              setcname(e.target.value);
            }
          }}
        />
        <small id="nameHelp" className="form-text text-muted">
          Enter the name of course
        </small>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="courseType" data-required="true">
          Course Type
        </label>
        <select
          className="custom-select"
          id="courseType"
          onChange={updateType}
          required={true}
        >
          <option selected disabled value="">
            Choose...
          </option>
          <option value="Coding">Coding</option>
          <option value="Article">Article</option>
          <option value="Mcq">Mcq</option>
        </select>
      </div>
      {displayForm()}
      <div className="tag-input">
        <input
          type="text"
          className="form-control"
          ref={tagInp}
          placeholder="Enter tags . . ."
          required
        />
        <button
          id="tag-add-btn"
          className="btn"
          style={{ backgroundColor: "#7f90fb", marginLeft: "10px" }}
          onClick={(e) => updateTags(e)}
        >
          Add
        </button>
      </div>
      <small id="tag" className="form-text text-muted">
        Please Enter tags related to question
      </small>
      <div className="tag-container">{displayTags()}</div>
      {/* <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-plus-square-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
        </svg>
      </button> */}
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          submitForm();
        }}
        className="btn"
        style={{ backgroundColor: "rgb(127, 144, 251)", color: "white" }}
      >
        Submit
      </button>
    </form>
  );
};

export default AddCourse;
