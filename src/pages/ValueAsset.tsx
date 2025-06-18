import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  Car, 
  FileText, 
  Check,
  X,
  Camera,
  Info
} from 'lucide-react';

interface FormData {
  assetType: 'new' | 'foreign' | 'locally-used' | '';
  brand: string;
  model: string;
  color: string;
  mileage: string;
  engineType: string;
  displayImage: File | null;
  additionalImages: File[];
  legalTender: File | null;
  description: string;
  agreeToTerms: boolean;
}

const ValueAsset = () => {
  const [formData, setFormData] = useState<FormData>({
    assetType: '',
    brand: '',
    model: '',
    color: '',
    mileage: '',
    engineType: '',
    displayImage: null,
    additionalImages: [],
    legalTender: null,
    description: '',
    agreeToTerms: false
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const carBrands = [
    'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 
    'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 'Kia', 'Mazda', 
    'Lexus', 'Infiniti', 'Acura', 'Subaru', 'Mitsubishi', 'Peugeot'
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (file: File, type: 'display' | 'additional' | 'legal') => {
    if (type === 'display') {
      setFormData(prev => ({ ...prev, displayImage: file }));
    } else if (type === 'additional') {
      setFormData(prev => ({ 
        ...prev, 
        additionalImages: [...prev.additionalImages, file] 
      }));
    } else if (type === 'legal') {
      setFormData(prev => ({ ...prev, legalTender: file }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'display' | 'additional') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], type);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert('Asset valuation request submitted successfully!');
  };

  const isFormValid = formData.assetType && formData.brand && formData.model && 
                     formData.displayImage && formData.agreeToTerms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 mt-12">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 dark:from-indigo-800 dark:via-purple-800 dark:to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="flex items-center mb-8">
            <button className="inline-flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go back
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Get Your Values Worth
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Professional asset valuation service to determine the true market value of your vehicle
            </p>
          </div>
        </div>
        
        {/* Decorative 3D Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Asset Type Selection */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Asset Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: 'new', label: 'New', icon: '✨' },
                  { value: 'foreign', label: 'Foreign', icon: '🌍' },
                  { value: 'locally-used', label: 'Locally Used', icon: '🏠' }
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                      formData.assetType === option.value
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-400'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="assetType"
                      value={option.value}
                      checked={formData.assetType === option.value}
                      onChange={(e) => handleInputChange('assetType', e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{option.label}</span>
                    </div>
                    {formData.assetType === option.value && (
                      <Check className="absolute top-2 right-2 w-5 h-5 text-indigo-500" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Display Image Upload */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Upload Display Image</h2>
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                  dragActive
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={(e) => handleDrop(e, 'display')}
              >
                {formData.displayImage ? (
                  <div className="space-y-4">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium">{formData.displayImage.name}</p>
                    <button
                      type="button"
                      onClick={() => handleInputChange('displayImage', null)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                      <Camera className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium mb-2">
                        Drag and drop your image here, or
                      </p>
                      <label className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl cursor-pointer transition-colors">
                        <Upload className="w-5 h-5 mr-2" />
                        Choose a file
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'display')}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Asset Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Asset Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                    Brand
                  </label>
                  <select
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  >
                    <option value="">Select Car Brand</option>
                    {carBrands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                    Model
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    placeholder="Enter Model"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                    Color
                  </label>
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="Enter Car Color"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                    Mileage
                  </label>
                  <input
                    type="text"
                    value={formData.mileage}
                    onChange={(e) => handleInputChange('mileage', e.target.value)}
                    placeholder="Enter Mileage"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                    Engine Type
                  </label>
                  <input
                    type="text"
                    value={formData.engineType}
                    onChange={(e) => handleInputChange('engineType', e.target.value)}
                    placeholder="Enter Type"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Additional Images */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">More of Car Image</h2>
              <div className="space-y-4">
                {formData.additionalImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {formData.additionalImages.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Additional ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, 'additional')}
                >
                  <label className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl cursor-pointer transition-colors">
                    <Plus className="w-5 h-5 mr-2" />
                    Add More Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          Array.from(e.target.files).forEach(file => 
                            handleFileUpload(file, 'additional')
                          );
                        }
                      }}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Legal Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Legal Information</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                  Legal Tender
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex-1 flex items-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <FileText className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {formData.legalTender ? formData.legalTender.name : 'Choose Files'}
                    </span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'legal')}
                      className="sr-only"
                    />
                  </label>
                  {formData.legalTender && (
                    <button
                      type="button"
                      onClick={() => handleInputChange('legalTender', null)}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  placeholder="Provide detailed description of your asset..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors resize-none"
                />
              </div>

              <div className="flex items-start space-x-3 mb-8">
                <input
                  type="checkbox"
                  id="terms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer underline">
                    Agree to Terms and Conditions
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all ${
                  isFormValid && !isSubmitting
                    ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5'
                    : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Submit for Valuation'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ValueAsset;