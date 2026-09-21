import { useState } from "react";
import "./styles.css";
import posts from "./posts.json";

function BlogCard({ post }) {
  return (
    <article className="blog-card">
      <div className="blog-image">{post.emoji}</div>

      <div className="blog-content">
        <span className="blog-category">{post.category}</span>

        <h2>{post.title}</h2>

        <p>{post.description}</p>

        <div className="blog-footer">
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(posts.map((post) => post.category))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || post.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>My Blog</h1>

          <nav>
            <a href="#home">Home</a>
            <a href="#posts">Posts</a>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Welcome to My Blog</h1>

          <p>
            Explore interesting articles, technology trends, and useful learning
            resources.
          </p>
        </div>
      </section>

      <main className="container" id="posts">
        <div className="section-heading">
          <h1>Latest Blog Posts</h1>

          <p>Read our latest articles and discover new ideas.</p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search blog posts..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="categories">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <p className="result-count">
          Showing {filteredPosts.length} post
          {filteredPosts.length !== 1 ? "s" : ""}
        </p>

        <div className="blog-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <div className="no-results">
              <h2>No posts found</h2>
              <p>Try another search or choose a different category.</p>
            </div>
          )}
        </div>
      </main>

      <section className="about" id="about">
        <div className="container">
          <h2>About This Blog</h2>

          <p>
            This React Blog UI project demonstrates React components, JSON data,
            search functionality, category filtering, and responsive web design.
          </p>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 My Blog | Built with React by Meenakshi</p>
      </footer>
    </div>
  );
}

export default App;
