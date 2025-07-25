// levels/js/validation.js (Simplified)

// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Securely checks the user's answer against the correct flag in Firestore.
 * @param {string} levelId - The document ID in Firestore (e.g., 'level1').
 * @param {string} userAnswer - The answer submitted by the user.
 * @returns {Promise<boolean>} - True if the answer is correct, false otherwise.
 */
async function checkAnswer(levelId, userAnswer) {
  try {
    const flagDocRef = doc(db, "flags", levelId);
    const docSnap = await getDoc(flagDocRef);

    if (docSnap.exists()) {
      const correctAnswer = docSnap.data().answer;
      // Compare in lowercase to avoid case-sensitivity issues
      return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    } else {
      // This error means you haven't created the document for this level in Firestore
      console.error("Flag document not found in Firestore:", levelId);
      alert(`Error: Flag for ${levelId} not found in the database. Please contact the administrator.`);
      return false;
    }
  } catch (error) {
    console.error("Error connecting to Firebase:", error);
    alert("Could not connect to the server to check the answer. Please check your internet connection and try again.");
    return false;
  }
}

// Export the single function to be used in the level pages
export { checkAnswer };