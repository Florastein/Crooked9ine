import { User } from '@/pages/UserTeamManagementPage';
import React, { useState, useEffect } from 'react';
import { auth, db } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, collection, getDocs, addDoc } from 'firebase/firestore';
import { supabase } from '@/supabaseClient';

interface AddUserModalProps {
  onClose: () => void;
  onSave: (userData: Omit<User, 'id' | 'avatar' | 'joinDate'>) => void;
}

interface Division {
  id: string;
  name: string;
}

export const AddUserModal: React.FC<AddUserModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: '',
    division: '',
    email: '',
    specialty: '',
    image: '',
    password: '',
    account_type: 'Team Member' as 'Admin' | 'Team Lead' | 'Team Member',
  });

  const [errors, setErrors] = useState({
    username: '',
    division: '',
    email: '',
    specialty: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [showAddDivision, setShowAddDivision] = useState(false);
  const [newDivision, setNewDivision] = useState('');
  const [addingDivision, setAddingDivision] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // ✅ Handle Image Upload to Supabase
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }

    if (file.size > maxSize) {
      alert('Image size must be less than 5MB');
      return;
    }

    setAvatarFile(file);
    
    // Create temporary URL for preview
    const tempUrl = URL.createObjectURL(file);
    setFormData(prev => ({ ...prev, image: tempUrl }));

    try {
      setUploadingImage(true);
      const fileExtension = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2)}.${fileExtension}`;

      // Upload to Supabase bucket named "profile"
      const { data, error } = await supabase.storage
        .from("profile")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from("profile")
        .getPublicUrl(fileName);

      const publicUrl = publicUrlData.publicUrl;
      setAvatarUrl(publicUrl);

      console.log("✅ Image uploaded successfully:", publicUrl);
    } catch (error: any) {
      console.error("❌ Error uploading image to Supabase:", error);
      alert(`Image upload failed: ${error.message}`);
      // Reset image state on error
      setFormData(prev => ({ ...prev, image: '' }));
      setAvatarUrl(null);
    } finally {
      setUploadingImage(false);
    }
  };

  // ✅ Fetch Divisions from Firestore
  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const divisionsCollection = collection(db, 'Division');
        const divisionsSnapshot = await getDocs(divisionsCollection);
        const divisionsList = divisionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Division[];

        // Sort alphabetically
        divisionsList.sort((a, b) => a.name.localeCompare(b.name));
        setDivisions(divisionsList);
      } catch (error) {
        console.error('Error fetching divisions:', error);
        alert('Failed to load divisions');
      }
    };

    fetchDivisions();
  }, []);

  // ✅ Form Validation
  const validateForm = () => {
    const newErrors = {
      username: '',
      division: '',
      email: '',
      specialty: '',
      password: '',
    };

    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (formData.username.trim().length < 2) newErrors.username = 'Username must be at least 2 characters';
    
    if (!formData.division.trim()) newErrors.division = 'Division is required';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.specialty.trim()) newErrors.specialty = 'Specialty is required';
    
    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  // ✅ Handle Form Submit (Create Firebase User + Firestore Document)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      // 1️⃣ Create Firebase Auth Account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const uid = userCredential.user.uid;

      // Map account_type to role for Firestore
      const firestoreRole = formData.account_type === 'Team Member' 
        ? 'Member' 
        : formData.account_type;

      // 2️⃣ Add User to Firestore
      const userData = {
        id: uid,
        name: formData.username.trim(),
        email: formData.email.trim(),
        role: firestoreRole,
        avatar: avatarUrl || `https://i.pravatar.cc/150?u=${formData.email}`,
        joinDate: serverTimestamp(),
        status: 'active',
        division: formData.division.trim(),
        specialty: formData.specialty.trim(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(db, "Users", uid), userData);

      // 3️⃣ Update Local UI via callback
      onSave({
        name: formData.username.trim(),
        email: formData.email.trim(),
        role: firestoreRole as 'Admin' | 'Team Lead' | 'Member',
        status: 'active',
        division: formData.division.trim(),
        specialty: formData.specialty.trim(),
      });

      console.log('✅ User created successfully:', userData);
      onClose();
    } catch (error: any) {
      console.error('❌ Error creating user:', error);
      
      // More specific error messages
      let errorMessage = 'Failed to create user.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak.';
      } else {
        errorMessage = error.message || 'Failed to create user.';
      }
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Field Changes
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  // ✅ Add New Division
  const handleAddDivision = async () => {
    const trimmedDivision = newDivision.trim();
    
    if (!trimmedDivision) {
      alert('Please enter a division name');
      return;
    }

    if (trimmedDivision.length < 2) {
      alert('Division name must be at least 2 characters');
      return;
    }

    if (divisions.some(div => div.name.toLowerCase() === trimmedDivision.toLowerCase())) {
      alert('Division already exists');
      return;
    }

    try {
      setAddingDivision(true);

      const divisionRef = await addDoc(collection(db, 'Division'), {
        name: trimmedDivision,
        createdAt: serverTimestamp(),
      });

      const newDivisionObj: Division = {
        id: divisionRef.id,
        name: trimmedDivision,
      };

      setDivisions(prev => {
        const updated = [...prev, newDivisionObj];
        updated.sort((a, b) => a.name.localeCompare(b.name));
        return updated;
      });

      setFormData(prev => ({
        ...prev,
        division: trimmedDivision,
      }));

      setNewDivision('');
      setShowAddDivision(false);

      console.log('✅ Division added successfully:', newDivisionObj);
    } catch (error: any) {
      console.error('Error adding division:', error);
      alert(`Failed to add division: ${error.message}`);
    } finally {
      setAddingDivision(false);
    }
  };

  // Clean up temporary URLs when component unmounts
  useEffect(() => {
    return () => {
      if (formData.image && formData.image.startsWith('blob:')) {
        URL.revokeObjectURL(formData.image);
      }
    };
  }, [formData.image]);

  const isFormDisabled = loading || uploadingImage;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isFormDisabled}
            type="button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm ${
                    errors.username ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter username"
                  disabled={isFormDisabled}
                />
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>

              {/* Division */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Division *</label>
                <select
                  value={formData.division}
                  onChange={(e) => handleChange('division', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm ${
                    errors.division ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  disabled={isFormDisabled}
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division.id} value={division.name}>
                      {division.name}
                    </option>
                  ))}
                </select>

                {errors.division && <p className="mt-1 text-sm text-red-600">{errors.division}</p>}

                <div className="mt-2">
                  {!showAddDivision ? (
                    <button
                      type="button"
                      onClick={() => setShowAddDivision(true)}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 disabled:text-gray-400"
                      disabled={isFormDisabled}
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                      Add New Division
                    </button>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={newDivision}
                        onChange={(e) => setNewDivision(e.target.value)}
                        placeholder="Enter new division name"
                        className="flex-1 px-3 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500"
                        disabled={addingDivision}
                      />
                      <button
                        type="button"
                        onClick={handleAddDivision}
                        className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 flex items-center gap-1 disabled:bg-green-400"
                        disabled={addingDivision}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {addingDivision ? 'refresh' : 'check'}
                        </span>
                        {addingDivision ? 'Adding...' : 'Add'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddDivision(false);
                          setNewDivision('');
                        }}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
                        disabled={addingDivision}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter email address"
                  disabled={isFormDisabled}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty *</label>
                <input
                  type="text"
                  value={formData.specialty}
                  onChange={(e) => handleChange('specialty', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg text-sm ${
                    errors.specialty ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Enter specialty"
                  disabled={isFormDisabled}
                />
                {errors.specialty && <p className="mt-1 text-sm text-red-600">{errors.specialty}</p>}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image {uploadingImage && '(Uploading...)'}
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-300">
                    {formData.image || avatarUrl ? (
                      <img
                        src={avatarUrl || formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-gray-400">person</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isFormDisabled}
                    />
                    <label
                      htmlFor="image-upload"
                      className={`block w-full px-3 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer text-center transition-colors ${
                        isFormDisabled 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                          : 'hover:bg-gray-50 hover:border-gray-400'
                      }`}
                    >
                      {uploadingImage ? 'Uploading...' : 'Choose Image'}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      JPEG, PNG, GIF, WebP • Max 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg text-sm pr-10 ${
                      errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="Enter password"
                    disabled={isFormDisabled}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:text-gray-300"
                    disabled={isFormDisabled}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Type *</label>
                <select
                  value={formData.account_type}
                  onChange={(e) => handleChange('account_type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm disabled:bg-gray-100"
                  disabled={isFormDisabled}
                >
                  <option value="Team Member">Team Member</option>
                  <option value="Team Lead">Team Lead</option>
                  <option value="Admin">Admin</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Admins have full access, Team Leads can manage their team, Team Members have basic access.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 mt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:bg-gray-50 disabled:text-gray-400"
              disabled={isFormDisabled}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={isFormDisabled}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                  Creating User...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  Create User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};