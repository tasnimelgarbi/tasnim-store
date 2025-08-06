import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    avatar: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const age = localStorage.getItem("age");
    const gender = localStorage.getItem("gender");
    const avatar = localStorage.getItem("avatar");

    setUser({ name, email, age, gender, avatar });
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow text-center">
        <div className="card-header bg-custom text-white">
          <h2><i className="fas fa-user-circle me-2"></i>Profile</h2>
        </div>
        <div className="card-body">
          {user.avatar && (
            <img
              src={user.avatar}
              alt="Profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "20px",
                border: "3px solid #ccc"
              }}
            />
          )}
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
        </div>
      </div>
    </div>
  );
}
