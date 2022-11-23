import { useState } from "react";
const McqModal = ({ questions }) => {
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [answers, setAnswers] = useState({});
  function selectOption(opt, index) {
    let id = index.toString();
    if (id in answers) {
      return;
    }
    let temp = {};
    temp[id] = opt;
    setAnswers({ ...answers, ...temp });
    if (opt === questions[index]["answer"]) {
      setCorrect(correct + 1);
      return true;
    } else {
      setIncorrect(incorrect + 1);
      return false;
    }
  }
  function displayQuestions() {
    let l = [];
    for (let i = 0; i < questions.length; i++) {
      let tag = (
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
                  Question {i + 1}
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
                <div>{questions[i]["question"]}</div>
                <div className="d-column justify-content-center align-items-center p-2 ">
                  <div className="d-flex justify-content-between align-items-center p-1">
                    <button
                      data-id={i}
                      className="btn btn-secondary bg-white text-dark"
                      onClick={(e) => {
                        let res = selectOption(
                          "option1",
                          parseInt(e.target.dataset.id)
                        );
                        if (res && typeof res == "boolean") {
                          e.target.classList.add("bg-success");
                        } else if (!res && typeof res == "boolean") {
                          e.target.classList.add("bg-danger");
                        }
                      }}
                    >
                      {questions[i]["option1"]}
                    </button>
                    <button
                      data-id={i}
                      className="btn btn-secondary bg-white text-dark"
                      onClick={(e) => {
                        let res = selectOption(
                          "option2",
                          parseInt(e.target.dataset.id)
                        );
                        if (res && typeof res == "boolean") {
                          e.target.classList.add("bg-success");
                        } else if (!res && typeof res == "boolean") {
                          e.target.classList.add("bg-danger");
                        }
                      }}
                    >
                      {questions[i]["option2"]}
                    </button>
                  </div>
                  <div
                    data-id={i}
                    className="d-flex justify-content-between align-items-center p-1"
                  >
                    <button
                      className="btn btn-secondary bg-white text-dark"
                      data-id={i}
                      onClick={(e) => {
                        let res = selectOption(
                          "option3",
                          parseInt(e.target.dataset.id)
                        );
                        if (res && typeof res == "boolean") {
                          e.target.classList.add("bg-success");
                        } else if (typeof res == "boolean") {
                          e.target.classList.add("bg-danger");
                        }
                      }}
                    >
                      {questions[i]["option3"]}
                    </button>
                    <button
                      data-id={i}
                      className="btn btn-secondary bg-white text-dark"
                      onClick={(e) => {
                        let res = selectOption(
                          "option4",
                          parseInt(e.target.dataset.id)
                        );
                        if (res && typeof res == "boolean") {
                          e.target.classList.add("bg-success");
                        } else if (!res && typeof res == "boolean") {
                          e.target.classList.add("bg-danger");
                        }
                      }}
                    >
                      {questions[i]["option4"]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      l.push(tag);
    }
    return l;
  }
  return (
    <>
      {displayQuestions()}
      <div className="card-footer my-2 d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center justify-content-center  text-success">
          <b>Correct Answers : </b>
          <b>{correct}</b>
        </div>
        <div className="d-flex align-items-center justify-content-center text-danger">
          <b>Incorrect Answers : </b>
          <b>{incorrect}</b>
        </div>
      </div>
    </>
  );
};

export default McqModal;
