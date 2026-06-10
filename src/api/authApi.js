const LOCAL_USER_CREDENTIALS = {
  mhdrf: {
    password: "123",
    displayName: "Muhammad Rafi",
    email: "mhdrf@kakacanteen.id",
  },
};

export async function loginUser(username, password) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const registeredUser = LOCAL_USER_CREDENTIALS[username.trim()];

  if (!registeredUser || registeredUser.password !== password) {
    throw new Error("Username atau password salah.");
  }

  const token = `kakacanteen_${username}_${Date.now()}`;
  return { token, user: { username, displayName: registeredUser.displayName, email: registeredUser.email } };
}
