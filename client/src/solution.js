const solution = async (language, code, input) => {
  let b = {
    language,
    code,
  };
  if (input) {
    b["input"] = input;
  }
  try {
    const response = await fetch(process.env.REACT_APP_FETCHURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(b),
    });
    return response.json();
  } catch (e) {
    return { result: e.message };
  }
};
export default solution;
