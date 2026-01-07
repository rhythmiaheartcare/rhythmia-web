import { collection, addDoc, getDocs, getDoc, updateDoc, doc, query, where, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = "reviews";

const generateToken = () => {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
};

export const reviewService = {
    // Fetch only approved reviews
    getApprovedReviews: async () => {
        try {
            const q = query(
                collection(db, COLLECTION_NAME),
                where("approved", "==", true),
                orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                // Convert timestamp to date string if present
                date: doc.data().createdAt?.toDate().toLocaleDateString() || "Recently"
            }));
        } catch (error) {
            console.error("Error fetching reviews:", error);
            return [];
        }
    },

    // Submit a new review (approved: false by default)
    addReview: async (reviewData) => {
        try {
            const approvalToken = generateToken();
            const docRef = await addDoc(collection(db, COLLECTION_NAME), {
                ...reviewData,
                approved: false, // Requires admin approval
                approvalToken: approvalToken,
                createdAt: serverTimestamp(),
                verified: false // Could be true if we link to purchase later
            });


            // Send Email Notification
            await reviewService.sendEmailNotification(reviewData, docRef.id, approvalToken);

            return docRef.id;
        } catch (error) {
            console.error("Error adding review:", error);
            throw error;
        }
    },

    // Approve a review
    approveReview: async (reviewId, token) => {
        try {
            const reviewRef = doc(db, COLLECTION_NAME, reviewId);
            const reviewSnap = await getDoc(reviewRef);

            if (!reviewSnap.exists()) {
                throw new Error("Review not found");
            }

            const data = reviewSnap.data();
            if (data.approvalToken !== token) {
                throw new Error("Invalid approval token");
            }

            await updateDoc(reviewRef, {
                approved: true
            });

            return true;
        } catch (error) {
            console.error("Error approving review:", error);
            throw error;
        }
    },

    // Simple email notification using FormSubmit.co via AJAX
    sendEmailNotification: async (data, reviewId, approvalToken) => {
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        if (!adminEmail) {
            console.warn("VITE_ADMIN_EMAIL not set, skipping email notification");
            return;
        }

        const approvalLink = `${window.location.origin}/approve-review?id=${reviewId}&token=${approvalToken}`;

        try {
            await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: "New Product Review Submitted",
                    _template: "table",
                    "Reviewer Name": data.name,
                    "Reviewer Email": data.email,
                    "Rating": `${data.rating} / 5 Stars`,
                    "Comment": data.comment,
                    "Review ID": reviewId,
                    "Approve Review": approvalLink
                })
            });
        } catch (e) {
            console.error("Failed to send email notification", e);
        }
    }
};
