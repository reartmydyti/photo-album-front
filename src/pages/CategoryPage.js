import React, { useState, useEffect } from 'react';
import { createCategory, updateCategory, deleteCategory, getCategories } from '../api/api';
import Layout from '../components/Layout';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryForm, setCategoryForm] = useState({ id: null, name: '' }); 
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm({
      ...categoryForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!categoryForm.name) {
        console.error('Category name is required.');
        return;
      }

      if (isEditing) {
        await updateCategory(categoryForm.id, categoryForm);
      } else {
        await createCategory(categoryForm);
      }
      setCategoryForm({ id: null, name: '' }); 
      setIsEditing(false);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error submitting category:', error);
    }
  };

  const handleEdit = (category) => {
    setCategoryForm(category);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h1>Manage Categories</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Category Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={categoryForm.name}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Category' : 'Create Category'}
          </button>
        </form>

        <hr />

        <h2>Categories</h2>
        <ul className="list-group">
          {categories.map((category) => (
            <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
              {category.name}
              <div>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(category)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(category.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default CategoryPage;
