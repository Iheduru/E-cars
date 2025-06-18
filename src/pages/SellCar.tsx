import React, { useState, useEffect } from 'react';
import { Car, DollarSign, FileText, Image as ImageIcon, Calendar, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

const SellCar = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    description: '',
  });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to sell your car', {
        duration: 4000,
        position: 'top-center',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter((file) =>
        ['image/png', 'image/jpeg', 'image/gif'].includes(file.type) && file.size <= 10 * 1024 * 1024
      );

      if (selectedFiles.length !== selectedFiles.length) {
        toast.error('Some files were invalid. Only PNG, JPG, GIF up to 10MB are allowed.');
      }

      setFiles((prev) => [...prev, ...selectedFiles.slice(0, 5 - prev.length)]);
      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previews[index]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to list your car');
      return;
    }
    if (!formData.make || !formData.model || !formData.year || !formData.price || !formData.description || files.length === 0) {
      toast.error('Please fill out all fields and upload at least one photo.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      toast.success('Your car has been listed successfully!');
      setIsLoading(false);
      setFormData({ make: '', model: '', year: '', price: '', description: '' });
      setFiles([]);
      setPreviews([]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 my-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Sell Your Car
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            List your vehicle quickly and easily on our platform.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="make" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Make
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
                <Car className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="make"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="e.g., Toyota"
              />
            </div>

            <div className="relative">
              <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Model
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
                <Car className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="e.g., Camry"
              />
            </div>

            <div className="relative">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Year
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min="1900"
                max={new Date().getFullYear() + 1}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="e.g., 2020"
              />
            </div>

            <div className="relative">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="e.g., 15000000"
              />
            </div>

            <div className="relative">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <div className="absolute left-3 top-9">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                placeholder="Describe your car's features, condition, and history..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Photos (up to 5)
              </label>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl ${
                  files.length === 0
                    ? 'border-gray-300 dark:border-gray-600'
                    : 'border-indigo-200 dark:border-indigo-900/30'
                }`}
              >
                {files.length === 0 ? (
                  <div className="space-y-2 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        <span>Upload photos</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/png,image/jpeg,image/gif"
                          multiple
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                ) : (
                  <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {files.length < 5 && (
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center w-full h-24 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept="image/png,image/jpeg,image/gif"
                          multiple
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold transition-all focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Listing your car...
                </span>
              ) : (
                'List Your Car'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellCar;