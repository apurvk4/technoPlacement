import { useState } from "react";

const AddCourse = () => {
  const [courseType, setcourseType] = useState(null);
  function updateType(e) {
    if (e.target.value !== "") {
      console.log(e.target.value);
      setcourseType(e.target.value);
    }
  }
  return (
    <form>
      <div style={{ marginBottom: "1rem" }}>
        <label for="CourseName">Course Name</label>
        <input
          type="text"
          class="form-control"
          id="CourseName"
          aria-describedby="nameHelp"
        />
        <small id="nameHelp" class="form-text text-muted">
          Enter the name of course
        </small>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label for="courseType">Course Type</label>
        <select
          class="custom-select"
          id="courseType"
          onChange={updateType}
          required
        >
          <option selected disabled value="">
            Choose...
          </option>
          <option value="Coding">Coding</option>
          <option value="Article">Article</option>
          <option value="Mcq">Mcq</option>
        </select>
      </div>

      <div class="form-check" style={{ marginBottom: "1rem" }}>
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">
          Check me out
        </label>
      </div>
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default AddCourse;
