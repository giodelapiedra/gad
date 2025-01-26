import React, { useState, useEffect } from "react";
import "../appStyles.css";
import NavBar from "../components/Navbar/NavBar";

// Card Component for displaying individual resources
const Card = ({ title, pdfLink }) => (
  <div className="card">
    <div className="card-header">{title}</div>
    <div className="accordion-content">
      {pdfLink ? (
        <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="view-pdf-link">
          View PDF
        </a>
      ) : (
        <span>No PDF available</span>
      )}
    </div>
  </div>
);

// Security Check Component
const SecurityCheck = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="security-check-overlay">
      <div className="security-check-message">
        <p>Database Security Check in Progress...</p>
      </div>
    </div>
  );
};

const App = () => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showSecurityCheck, setShowSecurityCheck] = useState(true);

  useEffect(() => {
    const fetchCategoriesAndPosts = async () => {
      try {
        const categoriesResponse = await fetch(
          "https://tanauancity.gov.ph/gad/wp-json/wp/v2/categories"
        );
        const categoriesData = await categoriesResponse.json();

        const filteredCategories = categoriesData.filter((category) =>
          ["GAD Code", "GAD Database", "IEC Materials", "Laws on GAD", "Publications", "Articles", "Books"].includes(category.name)
        );

        setCategories(filteredCategories);

        const postsPromises = filteredCategories.map(async (category) => {
          const postsResponse = await fetch(
            `https://tanauancity.gov.ph/gad/wp-json/wp/v2/posts?categories=${category.id}`
          );
          const postsData = await postsResponse.json();

          return postsData.map((post) => {
            const pdfLink = post.content.rendered.match(/href="(.*?\.pdf)"/);
            return {
              title: post.title.rendered,
              pdfLink: pdfLink ? pdfLink[1] : "",
              category: category.name,
            };
          });
        });

        const allResources = await Promise.all(postsPromises);
        setResources(allResources.flat());
      } catch (error) {
        console.error("Error fetching categories or posts:", error);
      } finally {
        setLoading(false);
        setTimeout(() => {
          setShowSecurityCheck(false); // Hide the security check after 10 seconds
        }, 10000);
      }
    };

    fetchCategoriesAndPosts();
  }, []);

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  
    if (!query) {
      setExpandedCategories({});
      return;
    }
  
    const normalizedQuery = query.trim().toLowerCase();  // Normalize the query to lowercase and remove extra spaces
  
    const newExpandedCategories = {};
    categories.forEach((category) => {
      const hasMatchingResources = resources.some((resource) => {
        const titleLower = resource.title.toLowerCase();  // Normalize resource title
        return (
          resource.category.toLowerCase().includes(normalizedQuery) ||  // Normalize category to lowercase
          titleLower.includes(normalizedQuery)  // Normalize title to lowercase
        );
      });
  
      newExpandedCategories[category.name] = hasMatchingResources;
    });
  
    setExpandedCategories(newExpandedCategories);
  };

  return (
    <div
      className="App"
      style={{
        fontFamily: "Arial, sans-serif",
        paddingTop: "200px",
        margin: 0,
        backgroundColor: "#f4f4f4",
        position: "relative",
      }}
    >
      {/* Security Check Overlay */}
      <SecurityCheck isVisible={showSecurityCheck} />

      <NavBar />
      <header className="App-header">GAD DATABASE</header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className={`container ${showSecurityCheck ? "frozen" : ""}`}>
          {categories.map((category) => {
            const filteredResources = resources.filter(
              (resource) =>
                resource.category.toLowerCase() === category.name.toLowerCase() &&  // Ensure case-insensitivity for category
                (
                  resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  resource.category.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );

            return (
              <div key={category.id} className="category-section">
                <div
                  className="accordion-header"
                  onClick={() => toggleCategory(category.name)}
                  style={{ cursor: "pointer" }}
                >
                  <h2>{category.name}</h2>
                  <span>{expandedCategories[category.name] ? "-" : "+"}</span>
                </div>
                {expandedCategories[category.name] && (
                  <div className="accordion-body">
                    {filteredResources.length > 0 ? (
                      filteredResources.map((resource, index) => (
                        <Card key={index} title={resource.title} pdfLink={resource.pdfLink} />
                      ))
                    ) : (
                      <p>No resources found.</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
