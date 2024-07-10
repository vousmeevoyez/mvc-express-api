document.addEventListener("DOMContentLoaded", () => {
  const userForm = document.getElementById("userForm");
  const userTableBody = document.getElementById("userTableBody");
  const errorMessageDiv = document.getElementById("error-message");
  const searchBox = document.getElementById("searchBox");
  const apiUrl = "http://localhost:3000/api/users";

  const fetchUsers = async (query = "") => {
    try {
      const response = await fetch(`${apiUrl}?text=${query}`);
      if (!response.ok) throw new Error("Error fetching users");
      const users = await response.json();
      renderUsers(users);
    } catch (error) {
      showError(error.message);
    }
  };

  const renderUsers = (users) => {
    userTableBody.innerHTML = "";
    users.forEach((user) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.firstName} ${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber}</td>
                <td>
                    <button class="edit-btn" data-id="${user.id}">Edit</button>
                    <button class="delete-btn" data-id="${user.id}">Delete</button>
                </td>
            `;
      userTableBody.appendChild(row);
    });

    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => editUser(button.dataset.id));
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => deleteUser(button.dataset.id));
    });
  };

  const createUser = async (user) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(`Error creating user: ${data["error"]}`);
      fetchUsers();
    } catch (error) {
      showError(error.message);
    }
  };

  const updateUser = async (user) => {
    try {
      const response = await fetch(`${apiUrl}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error("Error updating user");
      fetchUsers();
    } catch (error) {
      showError(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error deleting user");
      fetchUsers();
    } catch (error) {
      showError(error.message);
    }
  };

  const editUser = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      if (!response.ok) throw new Error("Error fetching user");
      const user = await response.json();
      document.getElementById("userId").value = user.id;
      document.getElementById("firstName").value = user.firstName;
      document.getElementById("lastName").value = user.lastName;
      document.getElementById("email").value = user.email;
      document.getElementById("phoneNumber").value = user.phoneNumber;
    } catch (error) {
      showError(error.message);
    }
  };

  const showError = (message) => {
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = "block";
    setTimeout(() => {
      errorMessageDiv.style.display = "none";
    }, 3000);
  };

  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const userId = document.getElementById("userId").value;
    const user = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      phoneNumber: document.getElementById("phoneNumber").value,
      email: document.getElementById("email").value,
    };
    if (userId) {
      user.id = userId;
      updateUser(user);
    } else {
      createUser(user);
    }
    userForm.reset();
  });

  searchBox.addEventListener("input", (event) => {
    const query = event.target.value;
    fetchUsers(query);
  });

  fetchUsers();
});
