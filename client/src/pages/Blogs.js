import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      


      if (data?.success) {
        setBlogs(
          data?.blogs.map((blog) => ({
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
    getAllBlogs();
  }, []);

 // Utility function to format the date (choose your preferred library)
 const formatDate = (dateString) => {
  const date = new Date(dateString);
  // Adjust the format string to your desired output (e.g., "DD/MM/YYYY", "HH:mm")
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour : "numeric",
    minute :"numeric"
  }); // Example format: 6/24/2024
};



  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username} 
            time={blog.formattedTime} // Use the formatted time
          />
        ))}
    </div>
  )
}

export default Blogs
