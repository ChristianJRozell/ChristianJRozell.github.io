function logout() {
  console.log(document.cookie);
  document.cookie = "session=; expires=Thu, 01 Jan 1950 00:00:01 GMT;";
  // window.location.reload();
}
