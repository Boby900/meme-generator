'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { generateMeme } from '@/lib/actions';

export default function CreateClient() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [memeUrl, setMemeUrl] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

  useEffect(() => {
    if (!caption || !preview) return;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = preview;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const fontSize = Math.floor(canvas.height / 15);
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      const lines = caption.split('\n');
      const lineHeight = fontSize * 1.2;
      const yStart = canvas.height - (lines.length - 1) * lineHeight - 20;
      lines.forEach((line, i) => {
        const y = yStart + i * lineHeight;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 6;
        ctx.strokeText(line, canvas.width / 2, y);
        ctx.fillStyle = 'white';
        ctx.fillText(line, canvas.width / 2, y);
      });
      setMemeUrl(canvas.toDataURL('image/png'));
    };
  }, [caption, preview]);

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);
    setMemeUrl('');
    setCaption('');
    try {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = async () => {
        const base64Image = reader.result as string;
        try {
          const memeResult = await generateMeme(base64Image);
          const memeContent = memeResult?.choices?.[0]?.message?.content || '';
          setCaption(memeContent);
        } catch (error) {
          console.error('Error generating meme:', error);
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        setLoading(false);
      };
    } catch (error) {
      console.error('Error generating meme:', error);
      setLoading(false);
    }
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
        {/* Hidden canvas for meme generation */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        {/* Render generated meme and download button */}
        {memeUrl && (
          <div className="mt-8 text-center">
            <Image src={memeUrl} alt="Generated Meme" width={512} height={512} className="mx-auto rounded-lg" />
            <a
              href={memeUrl}
              download="meme.png"
              className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
            >
              Download Meme
            </a>
          </div>
        )}
        {/* Render meme caption if present and not showing meme image */}
        {caption && !memeUrl && (
          <div className="mt-6 p-4 bg-gray-200 dark:bg-gray-700 rounded-lg text-center text-lg text-gray-800 dark:text-gray-100 whitespace-pre-line">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
