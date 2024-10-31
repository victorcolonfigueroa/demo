// import React, { useState } from 'react';

// const EditableRecipeCard = () => {
//     // Initial recipe data
//     const [recipe, setRecipe] = useState({
//         title: '',
//         ingredients: '',
//         instructions: ''
//     });

//     // Fetch recipe data from the database when the component mounts
//     React.useEffect(() => {
//         const fetchRecipe = async () => {
//             try {
//                 const response = await fetch('/api/recipe'); // Adjust the endpoint as needed
//                 const data = await response.json();
//                 setRecipe(data);
//             } catch (error) {
//                 console.error("Error fetching recipe:", error);
//             }
//         };

//         fetchRecipe();
//     }, []);

//     const [isEditing, setIsEditing] = useState(false); // State to track editing mode

//     const handleEditClick = () => {
//         setIsEditing(true); // Enable editing mode
//     };

//     const handleSaveClick = () => {
//         setIsEditing(false); // Disable editing mode
//         // Here you could also add logic to save to a backend or local storage
//     };

//     return (
//         <div className="recipe-card">
//             {isEditing ? (
//                 <div>
//                     <input
//                         type="text"
//                         value={recipe.title}
//                         onChange={(e) => setRecipe({ ...recipe, title: e.target.value })} // Update title
//                     />
//                     <textarea
//                         value={recipe.ingredients}
//                         onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })} // Update ingredients
//                     />
//                     <textarea
//                         value={recipe.instructions}
//                         onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })} // Update instructions
//                     />
//                     <button onClick={handleSaveClick}>Save</button>
//                 </div>
//             ) : (
//                 <div>
//                     <h2>{recipe.title}</h2>
//                     <h3>Ingredients:</h3>
//                     <p>{recipe.ingredients}</p>
//                     <h3>Instructions:</h3>
//                     <p>{recipe.instructions}</p>
//                     <button onClick={handleEditClick}>Edit</button> {/* Edit button */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EditableRecipeCard;