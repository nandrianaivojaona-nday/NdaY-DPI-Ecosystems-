import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Ensure this matches your path!

// 1. Explicitly define what data can be updated
interface ProfileUpdate {
  name?: string;
  contactEmail?: string;
  contactPhone?: string;
  officeAddress?: string;
}

// 2. Define the expected shape of your authenticated User object
interface AuthenticatedUser {
  role: string;
  operatorId: string;
}

// 3. Accept the user as a parameter instead of invoking a missing hook
export const updateOperatorProfile = async (
  operatorId: string, 
  data: ProfileUpdate, 
  currentUser: AuthenticatedUser | null
) => {
  // Authorization verification
  if (!currentUser || currentUser.role !== 'operator_admin' || currentUser.operatorId !== operatorId) {
    throw new Error('Unauthorized');
  }

  // Update Firestore record
  const operatorRef = doc(db, 'operators', operatorId);
  await updateDoc(operatorRef, {
    ...data,
    updatedAt: serverTimestamp(),
    status: 'PENDING_SETUP'
  });
};
