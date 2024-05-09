import { SupabaseClient } from '@supabase/supabase-js';
import { conlog } from './utils';
/**
 * List all the buckets 
 * @returns {Object} Return Object
 * @property {Array} data - Array of buckets or null
 * @property {Object} error - Error or null
 */
export async function getAllBuckets(supabase: SupabaseClient) {
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    return { data: null, error };
  }
  return { data, error: null };
}

/**
 * Get Information on a bucket 
 * @param {string} bucketName - Name of the bucket
 * @returns {Object} Return Object 
 * @property {Object} data - Bucket Info Object or null
 * @property {Object} error - Error or null
 */
export async function getBucket(supabase: SupabaseClient, bucketName: string) {
  const { data, error } = await supabase.storage.getBucket(bucketName);
  if (error) {
    return { data: null, error };
  }
  conlog("Bucket data of " + bucketName, data);
  return { data, error: null };
}

/**
 * Upload a file to a bucket 
 * @param {File} file - File to upload
 * @param {string} fileName - File Name of the file. This file name should be {uid}/{uid}.png
 * @param {string} bucketName - The name of the bucket to upload
 * 
 * @returns {Object} Return Object 
 * @property {Object} data - File upload Info Object or null
 * @property {Object} error - Error or null
 * @property {string} publicUrl - the public url of the file uploaded or null. Use this to access the file.
 * @property {string} path - path of the uploaded file in the bucket or null. This can be used to download file from bucket.
 */
export async function uploadFile(
supabase: SupabaseClient,
  file: File | string | ArrayBuffer,
  fileName: string,
  bucketName: string
) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    // .upload(fileName, file, {
    //   upsert: true,
    // });
    .upload(fileName, file, {
      upsert: true,
      contentType: 'image/png'
    });
  if (error) {
    conlog("Upload error", error);
    return { data: null, publicUrl: null, error, path: null };
  }
  const path = data.path;
  const { data: publicData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(path);
  conlog("Data from upload", data);
  return { data, publicUrl: publicData.publicUrl, error: null, path };
}

/**
 * Download a file from the bucket 
 * @param path - path of the file to be downloaded in the bucket
 * @param bucketName - name of the bucket that the file resides.
 * 
 * @returns {Object} Return Object
 * @property {Object} data - Download Info Object or null
 * @property {Object} error - Error or null
 */
export async function downloadFile(supabase: SupabaseClient, path: string, bucketName: string) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .download(path);
  if (error) {
    return { data: null, error };
  }
  return { data, error: null };
}