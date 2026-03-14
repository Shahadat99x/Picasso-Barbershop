import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size: 10MB' },
        { status: 400 }
      );
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName) {
      console.error('Cloudinary cloud name not configured');
      return NextResponse.json(
        { error: 'Upload configuration error' },
        { status: 500 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create base64 data URI
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Generate timestamp and signature for signed upload
    const timestamp = Math.round(new Date().getTime() / 1000);
    
    // Create signature using api_secret if available, otherwise use unsigned
    let uploadUrl: string;
    let uploadFormData: FormData;
    
    if (apiSecret) {
      // Signed upload
      const signature = crypto
        .createHash('sha256')
        .update(`folder=picasso-barbershop&timestamp=${timestamp}&upload_preset=ml_default${apiSecret}`)
        .digest('hex');
      
      uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      uploadFormData = new FormData();
      uploadFormData.append('file', base64);
      uploadFormData.append('timestamp', timestamp.toString());
      uploadFormData.append('folder', 'picasso-barbershop');
      uploadFormData.append('signature', signature);
      uploadFormData.append('api_key', process.env.CLOUDINARY_API_KEY || '');
    } else {
      // Use Cloudinary's auto-upload feature - just pass the image URL
      // We'll upload via data URL directly
      uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      uploadFormData = new FormData();
      uploadFormData.append('file', base64);
      uploadFormData.append('timestamp', timestamp.toString());
      uploadFormData.append('folder', 'picasso-barbershop');
      uploadFormData.append('upload_preset', 'ml_default'); // Cloudinary's default unsigned preset
    }

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: uploadFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Cloudinary upload error:', errorText);
      let errorMessage = 'Failed to upload image';
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error?.message || errorData.error || errorMessage;
      } catch {
        // Keep default error message
      }
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
