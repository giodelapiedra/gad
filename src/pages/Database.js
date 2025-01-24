import React, { useState, useEffect } from 'react';
import '../appStyles.css';
import NavBar from '../components/Navbar/NavBar';

const Card = ({ title, pdfLink }) => (
  <div className="card">
    <div className="card-header">{title}</div>
    <div className="accordion-content">
      {pdfLink ? (
        <a href={pdfLink} target="_blank" rel="noopener noreferrer">
          View PDF
        </a>
      ) : (
        <span>No PDF available</span>
      )}
    </div>
  </div>
);

const App = () => {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [securityCheck, setSecurityCheck] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    // Simulate security check
    setTimeout(() => setSecurityCheck(false), 10000);

    const fetchCategoriesAndPosts = async () => {
      try {
        const categoriesResponse = await fetch(
          'https://tanauancity.gov.ph/gad/wp-json/wp/v2/categories'
        );
        const categoriesData = await categoriesResponse.json();

        // Filter desired categories
        const filteredCategories = categoriesData.filter((category) =>
          ['GAD Code', 'GAD Database', 'IEC Materials', 'Laws on GAD', 'Publications', 'Articles', 'Books', 'Laws on GAD',].includes(category.name)
        );

        if (!filteredCategories.some((category) => category.name === 'Laws on GAD')) {
          console.warn('Category "Laws on GAD" not found in API response.');
        }

        setCategories(filteredCategories);

        // Fetch posts for each category
        const postsPromises = filteredCategories.map(async (category) => {
          const postsResponse = await fetch(
            `https://tanauancity.gov.ph/gad/wp-json/wp/v2/posts?categories=${category.id}`
          );
          const postsData = await postsResponse.json();

          return postsData.map((post) => {
            const pdfLink = post.content.rendered.match(/href="(.*?\.pdf)"/);
            return {
              title: post.title.rendered,
              pdfLink: pdfLink ? pdfLink[1] : '',
              category: category.name,
            };
          });
        });

        const allResources = await Promise.all(postsPromises);
        setResources(allResources.flat());
      } catch (error) {
        console.error('Error fetching categories or posts:', error);
      } finally {
        setLoading(false);
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

    const newExpandedCategories = {};
    categories.forEach((category) => {
      const hasMatchingResources = resources.some(
        (resource) =>
          resource.category === category.name &&
          (resource.title.toLowerCase().includes(query.toLowerCase()) ||
            resource.category.toLowerCase().includes(query.toLowerCase()))
      );
      newExpandedCategories[category.name] = hasMatchingResources;
    });

    setExpandedCategories(newExpandedCategories);
  };

  return (
    <div className="App">
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

      {securityCheck ? (
        <div className="security-check">
          <div className="security-message">Security check in progress...</div>
        </div>
      ) : loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="container">
          {categories.map((category) => {
            const filteredResources = resources.filter(
              (resource) =>
                resource.category === category.name &&
                (resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  resource.category.toLowerCase().includes(searchQuery.toLowerCase()))
            );

            return (
              <div key={category.id} className="category-section">
                <div
                  className="accordion-header"
                  onClick={() => toggleCategory(category.name)}
                  style={{ cursor: 'pointer' }}
                >
                  <h2>{category.name}</h2>
                  <span>{expandedCategories[category.name] ? '-' : '+'}</span>
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
