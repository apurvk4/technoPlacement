import React, { useEffect, useState } from "react";
import Headers from "./Headers.js";
import searchImg from "../images/search.png";
import { useSearchParams } from "react-router-dom";
import TagFilter from "./TagFilter.js";
// import { Button } from "bootstrap";
import Footer from "./Footer";
function intersection(array1, array2) {
  return array1.filter((value) => array2.includes(value));
}
const Coding = () => {
  const [questions, setQuestion] = useState([]);
  const [filtered, setFiltered] = useState(questions);
  const [search, setSearch] = useSearchParams();
  const [lastpage, setLastPage] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchInp, setSearchInp] = useState(null);
  // const [direction, setDirection] = useState("next");
  async function getData() {
    let url = process.env.REACT_APP_ALL_CTYPE + "coding";
    let p = new URLSearchParams();
    if (search.get("skip") && search.get("skip") !== "null") {
      p.set("skip", search.get("skip"));
    }
    if (search.get("limit") && search.get("limit") !== "null") {
      p.set("limit", search.get("limit"));
    }
    if (p.has("skip") || p.has("limit")) {
      url += "?" + p.toString();
    }
    const res = await fetch(url, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 400) {
      return { status: false, result: data };
    }
    return { status: true, result: data };
  }
  function getPrev() {
    let s = parseInt(search.get("skip"));
    let l = parseInt(search.get("limit"));
    if (s - l >= 0) {
      if (lastpage) {
        setLastPage(false);
      }
      setSearch({ ...search, skip: s - l, limit: l });
    }
  }
  function getNext() {
    let s = parseInt(search.get("skip"));
    let l = parseInt(search.get("limit"));
    if (!lastpage) {
      setSearch({ ...search, skip: s + l, limit: l });
    }
  }
  useEffect(() => {
    if (!search.has("skip") && !search.has("limit")) {
      setSearch({ skip: 0, limit: 5 });
    } else if (!lastpage) {
      getData().then((val) => {
        if (!val.status) {
          alert(val.result);
        } else {
          if (val.result["items"].length > 0) {
            setQuestion(val.result);
          } else {
            setLastPage(true);
            let s = parseInt(search.get("skip"));
            let l = parseInt(search.get("limit"));
            setSearch({ ...search, skip: s - l, limit: l });
            alert("this is the last page");
          }
        }
      });
    }
  }, [search]);
  useEffect(() => {
    setFiltered(questions);
  }, [questions]);
  useEffect(() => {
    if (filtered["items"]) {
      if (searchInp === null || searchInp === "") {
        setFiltered(questions);
      } else {
        let items = filtered["items"].filter((item) =>
          item["name"].includes(searchInp)
        );
        setFiltered({ items });
      }
    }
  }, [searchInp]);
  useEffect(() => {
    if (filtered["items"]) {
      if (selectedTags.length == 0) {
        setFiltered(questions);
      } else {
        let items = filtered["items"].filter(
          (item) => intersection(item["tags"], selectedTags).length > 0
        );
        setFiltered({ items });
      }
    }
  }, [selectedTags]);
  function displayQuestions() {
    if ("items" in filtered) {
      const items = filtered["items"];
      return items.map((item, i) => {
        return (
          <div key={i} className="table-list">
            <div className="t1">
              <div className="quesHeading">
                <div className="quesId">{i + 1}</div>
                <p>{item.name}</p>
              </div>
              <div className="quesLinks">
                <span>
                  <a href={item["codingLinks"][0]["link"]}>Link1</a>
                </span>
                <span>
                  <a href={item["codingLinks"][1]["link"]}>Link2</a>
                </span>
              </div>
            </div>
            <div className="t2">
              {item["tags"].map((tag) => {
                return <span>{tag}</span>;
              })}
            </div>
          </div>
        );
      });
    }
  }
  return (
    <>
      <Headers />
      <div className="container-inner">
        <div className="filters">
          <div className="srch">
            <input
              type="text"
              className="search"
              placeholder="Search here..."
              value={searchInp || ""}
              onInput={(e) => {
                setSearchInp(e.target.value);
              }}
            />
            <img src={searchImg} alt="search" />
          </div>
        </div>
        <TagFilter
          questions={filtered["items"]}
          updateSelectedTags={setSelectedTags}
          selectedTags={selectedTags}
        />
        {displayQuestions()}
        <button className="submit-btn" style={{marginLeft:0}} onClick={() => {  getPrev();}}>
          Prev
        </button>
        <button className="submit-btn" onClick={() => {getNext();}}>
          next
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Coding;
