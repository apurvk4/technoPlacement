import React, { useEffect, useState } from "react";
import Headers from "./Headers.js";
import searchImg from "../images/search.png";
import { useSearchParams } from "react-router-dom";
import TagFilter from "./TagFilter.js";
import Footer from "./Footer";
import Loading from "./Loading.js";
function intersection(array1, array2) {
  let a = array1.filter((value) => array2.includes(value));
  a = new Set(a);
  return Array.from(a);
}
const Article = () => {
  const [questions, setQuestion] = useState([]);
  const [filtered, setFiltered] = useState(questions);
  const [search, setSearch] = useSearchParams();
  const [lastpage, setLastPage] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchInp, setSearchInp] = useState(null);
  const [loading,setLoading]= useState(false);
  // const [direction, setDirection] = useState("next");
  async function getData() {
    let url = process.env.REACT_APP_ALL_CTYPE + "article";
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
      setLoading(true);
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
          setLoading(false);
        }
      }).catch((err)=>{
        setLoading(false);
        alert(err.message);
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
  function displayArticles() {
    if ("items" in filtered) {
      const items = filtered["items"];
      return items.map((item, i) => {
        // return (
        //   <div key={i} className="about-content">
        //     <div className="side-text">
        //       <h2>{item.name}</h2>
        //       <div className="t2">
        //         {item["tags"].map((tag) => {
        //           return <span>{tag}</span>;
        //         })}
        //       </div>
        //       <p>{item.articleBody}</p>
        //     </div>
        //   </div>
        // );
        return (
          <div className="accordion" id={"accordion" + i}>
            <div className="card">
              <div className="card-header" id={"heading" + i}>
                <h2 className="mb-0 d-flex justify-content-between">
                  <button
                    className="btn text-left table-list"
                    type="button"
                    data-toggle="collapse"
                    data-target={"#collapse" + i}
                    aria-expanded="true"
                    aria-controls={"collapse" + i}
                  >
                    <div className="t1"> {item.name} </div>
                    <div className="t2">
                      {item["tags"].map((tag) => {
                        return <span>{tag}</span>;
                      })}
                    </div>
                  </button>
                </h2>
              </div>
              <div
                id={"collapse" + i}
                className="collapse"
                aria-labelledby={"heading" + i}
                data-parent={"#accordion" + i}
              >
                <div className="card-body">{item.articleBody}</div>
              </div>
            </div>
          </div>
        );
      });
    }
  }
  return (
    <>
      <Headers />
      <div className="container-article">
        <div className="filters">
          <div className="search-name">
            <h2> Search Tags</h2>
          </div>
          <div className="srch">
            <input
              type="text"
              className="search"
              placeholder="Search here..."
              value={searchInp}
              onInput={(e) => {
                setSearchInp(e.target.value);
              }}
            />
            <img src={searchImg} alt="search" />
          </div>
          <TagFilter
            questions={filtered["items"]}
            updateSelectedTags={setSelectedTags}
            selectedTags={selectedTags}
          />
        </div>
        {loading ? <Loading/> :displayArticles()}
        <button
           className="submit-btn" style={{marginLeft:0}}
          onClick={() => {
            getPrev();
          }}
        >
          prev
        </button>
        <button
        className="submit-btn" 
          onClick={() => {
            getNext();
          }}
        >
          next
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Article;
