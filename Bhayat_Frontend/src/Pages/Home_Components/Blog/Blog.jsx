import React from 'react';

const blogs = [
  {
    title: 'The Future of NGOs in a Digital World',
    content: 'The digital revolution is transforming the way Non-Governmental Organizations (NGOs) operate, offering new opportunities for engagement, outreach, and impact. As technology continues to evolve, NGOs must adapt to stay relevant and effective...',
  },
  {
    title: 'Stories of Impact: How NGOs Are Changing Lives',
    content: 'Non-Governmental Organizations (NGOs) around the world are making a profound impact on the lives of individuals and communities. Here are some inspiring stories of how NGOs are driving positive change...',
  },
  {
    title: 'The Vital Role of NGOs in Modern Society',
    content: "In today's world, Non-Governmental Organizations (NGOs) play an essential role in addressing social, environmental, and economic challenges that governments and private sectors often cannot tackle alone...",
  },
];

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-12 mt-10">
      <h2 className="text-3xl font-bold text-black-900 mb-6 text-center m-auto">-: Our Blogs :- </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-2 text-gray-800">{blog.title}</h3>
            <p className="text-gray-600">{blog.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;