document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("demoButton");

  if (button) {
    button.addEventListener("click", () => {
      alert("FreshBite is ready!");
    });
  }
});
