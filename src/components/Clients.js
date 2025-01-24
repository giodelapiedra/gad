import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Import the background image
import bg2 from '../images/drawing.webp'; // Adjust the path as needed

// Sample data for charts
const defaultGenderData = [
  { name: 'Jan', Male: 4000, Female: 2400 },
  { name: 'Feb', Male: 3000, Female: 1398 },
  { name: 'Mar', Male: 2000, Female: 9800 },
  { name: 'Apr', Male: 2780, Female: 3908 },
  { name: 'May', Male: 1890, Female: 4800 },
  { name: 'Jun', Male: 2390, Female: 3800 },
];

const defaultDevelopmentData = [
  { name: 'Jan', Development: 3000 },
  { name: 'Feb', Development: 4000 },
  { name: 'Mar', Development: 3500 },
  { name: 'Apr', Development: 4000 },
  { name: 'May', Development: 4200 },
  { name: 'Jun', Development: 5000 },
];

const defaultEqualityData = [
  { name: 'Jan', Equality: 70 },
  { name: 'Feb', Equality: 75 },
  { name: 'Mar', Equality: 80 },
  { name: 'Apr', Equality: 85 },
  { name: 'May', Equality: 90 },
  { name: 'Jun', Equality: 92 },
];

const GenderDevelopmentAnalytics = () => {
  const [genderData, setGenderData] = useState([]);
  const [developmentData, setDevelopmentData] = useState([]);
  const [equalityData, setEqualityData] = useState([]);

  useEffect(() => {
    const cachedGenderData = localStorage.getItem('genderData');
    const cachedDevelopmentData = localStorage.getItem('developmentData');
    const cachedEqualityData = localStorage.getItem('equalityData');

    if (cachedGenderData) {
      setGenderData(JSON.parse(cachedGenderData));
    } else {
      setGenderData(defaultGenderData);
      localStorage.setItem('genderData', JSON.stringify(defaultGenderData));
    }

    if (cachedDevelopmentData) {
      setDevelopmentData(JSON.parse(cachedDevelopmentData));
    } else {
      setDevelopmentData(defaultDevelopmentData);
      localStorage.setItem('developmentData', JSON.stringify(defaultDevelopmentData));
    }

    if (cachedEqualityData) {
      setEqualityData(JSON.parse(cachedEqualityData));
    } else {
      setEqualityData(defaultEqualityData);
      localStorage.setItem('equalityData', JSON.stringify(defaultEqualityData));
    }
  }, []);

  return (
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16"
      style={{
        background: `url(${bg2}) no-repeat center center/cover`, // Set the background image
      }}
    >
      <section data-aos="fade-up">
        <div className="text-center">
          <h2 className="text-4xl font-bold uppercase tracking-wider">Gender and Development Analytics</h2>
          <div className="w-24 mx-auto mt-2 border-t-4 border-yellow-400 mb-4"></div>
          <h3 className="text-xl md:text-2xl font-medium">Empowering insights for gender equality and development.</h3>
        </div>

        <div className="px-8 md:px-16 py-12">
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gender Statistics Graph */}
            <div className="p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-center text-2xl font-semibold text-blue-900 mb-6">Gender Statistics</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={genderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Male" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="Female" stroke="#fdb462" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Development Insights Graph */}
            <div className="p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-center text-2xl font-semibold text-green-900 mb-6">Development Insights</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={developmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Development" stroke="#82ca9d" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Equality Metrics Graph */}
            <div className="p-4 bg-white rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-center text-2xl font-semibold text-yellow-900 mb-6">Equality Metrics</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={equalityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Equality" stroke="#ff7300" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GenderDevelopmentAnalytics;
