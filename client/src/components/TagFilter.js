const TagFilter = ({ questions, updateSelectedTags, selectedTags }) => {
  function addTags() {
    if (questions) {
      let temp = questions.map((q) => q["tags"]).flat();
      temp = [...new Set(temp)];
      return temp.map((tag, i) => {
        return (
          <button
            key={i}
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
              selectedTags.includes(tag) ? "tag-pill pill-selected" : "tag-pill"
            }
          >
            {tag}
          </button>
        );
      });
    }
  }
  return <section className="tag-filter">{addTags()}</section>;
};

export default TagFilter;
