import React from 'react';
import Layout from '../components/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mt-5">
        <h1>About Photo Perfect</h1>
        <p className="lead">Welcome to Photo Perfect, your go-to platform for creating and sharing photo albums!</p>
        <p>
          At Photo Perfect, we believe that every picture tells a story, and our mission is to provide a space where you can organize and share these stories with your friends and family. Our platform offers a seamless and user-friendly experience for creating photo albums, adding descriptions, and categorizing your memories.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Create and manage photo albums</li>
          <li>Upload multiple photos at once</li>
          <li>Organize photos into categories</li>
          <li>Share albums with others</li>
        </ul>
        <h2>Our Story</h2>
        <p>
          Photo Perfect was founded by a group of photography enthusiasts who wanted to make it easier for people to store and share their photos. We understand the importance of preserving memories and are dedicated to providing a reliable and fun way to keep your photos safe and organized.
        </p>
        <h2>Contact Us</h2>
        <p>
          If you have any questions, feedback, or need support, please feel free to reach out to us through our <a href="/contact">contact page</a>. We are here to help you make the most of your photo-sharing experience.
        </p>
        <p>Thank you for choosing Photo Perfect!</p>
      </div>
    </Layout>
  );
};

export default AboutPage;
