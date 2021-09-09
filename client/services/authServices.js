export const isUserAuth = async (callback) => {
  try {
    const res = await fetch("/auth", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    callback(data?.user, null);
  } catch (err) {
    callback(null, err);
  }
};

export const logUserIn = async (user, callback) => {
  try {
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    callback(data, null);
  } catch (err) {
    callback(null, err);
  }
};

export const addUser = async (user, callback) => {
  try {
    const res = await fetch("/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    callback(data, null);
  } catch (err) {
    callback(null, err);
  }
};

export const updateUserData = async (id, userData, callback) => {
  try {
    const res = await fetch(`/user/edit/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    callback(data, null);
  } catch (err) {
    callback(null, err);
  }
};



export const logUserOut = async (callback) => {
  try {
    const res = await fetch(`/auth/logout`, {
      method: "POST",
    });
    const data = await res.json();
    callback(data, null);
  } catch (err) {
    callback(null, err);
  }
};
