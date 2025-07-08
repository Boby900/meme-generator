'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

export default function Create() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const imageUrl = URL.createObjectURL(image);
      const memeResult = await generateMeme(imageUrl);
      console.log('Meme generated:', memeResult);
      // TODO: Handle the memeResult (e.g., display it to the user)
    } catch (error) {
      console.error('Error generating meme:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateMeme = async (imageUrl: string) => {
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // Ensure this is set in .dev.vars
    const YOUR_SITE_URL = "http://localhost:3000"; // Replace with your actual site URL
    const YOUR_SITE_NAME = "MemeAI"; // Replace with your actual site name

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": YOUR_SITE_URL,
        "X-Title": YOUR_SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-small-3.2-24b-instruct:free",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "What is in this image?"
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": imageUrl
                }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    return response.json();
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Meme Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Upload an image and let AI create hilarious memes with OCR technology
          </p>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="space-y-8">
            {/* Image Upload Section */}
            <div
              {...getRootProps()}
              className={`border-2 border-dashed ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'} rounded-lg p-8 text-center transition-colors duration-200 cursor-pointer`}
            >
              <input {...getInputProps()} />
              <div className="space-y-4">
                {preview ? (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {isDragActive ? 'Drop your image here' : 'Drag and drop your image here, or click to select'}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Preview Section */}
            {preview && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Preview
                </h2>
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center relative">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
              </section>
            )}

            {/* Generate Button */}
            <button
              className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${image ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'}`}
              type="button"
              onClick={handleGenerate}
              disabled={!image || loading}
            >
              {loading ? 'Generating...' : 'Generate Meme'}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

