const TagFilter = ({ questions, updateSelectedTags, selectedTags }) => {
  function addTags() {
    if (questions) {
      return questions
        .map((q, i) => {
          return q["tags"].map((tag, j) => {
            return (
              <button
                key={i + "" + j}
                onClick={(e) => {
                  if (e.target.classList.contains("pill-selected")) {
                    e.target.classList.remove("pill-selected");
                    updateSelectedTags(
                      selectedTags.filter((tag) => tag !== e.target.textContent)
                    );
                  } else {
                    e.target.classList.add("pill-selected");
                    updateSelectedTags([...selectedTags, e.target.textContent]);
                  }
                }}
                className={
                  selectedTags.includes(tag)
                    ? "tag-pill pill-selected"
                    : "tag-pill"
                }
              >
                {tag}
              </button>
            );
          });
        })
        .flatMap((val) => val);
    }
  }
  return <section className="tag-filter">{addTags()}</section>;
};

export default TagFilter;
