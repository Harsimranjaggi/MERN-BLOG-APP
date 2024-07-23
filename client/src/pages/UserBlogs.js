import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  // Utility function to format the date (choose your preferred library)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Adjust the format string to your desired output (e.g., "DD/MM/YYYY", "HH:mm")
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }); // Example format: 6/24/2024
  };

  // Get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(
          data?.userBlog.blogs.map((blog) => ({
            ...blog, // Keep other properties
            formattedTime: formatDate(blog.createdAt), // Add formatted time
          }))
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div className="blog-container">
      {blogs && blogs.length > 0 ? (
        <div className="blog-grid">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user.username}
              time={blog.formattedTime} // Use the formatted time
            />
          ))}
        </div>
      ) : (
        <h1>You Havent Created a blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;
