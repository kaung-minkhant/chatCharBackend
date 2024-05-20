"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.uploadFile = exports.getBucket = exports.getAllBuckets = void 0;
/**
 * List all the buckets
 * @returns {Object} Return Object
 * @property {Array} data - Array of buckets or null
 * @property {Object} error - Error or null
 */
function getAllBuckets(supabase) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase.storage.listBuckets();
        if (error) {
            return { data: null, error };
        }
        return { data, error: null };
    });
}
exports.getAllBuckets = getAllBuckets;
/**
 * Get Information on a bucket
 * @param {string} bucketName - Name of the bucket
 * @returns {Object} Return Object
 * @property {Object} data - Bucket Info Object or null
 * @property {Object} error - Error or null
 */
function getBucket(supabase, bucketName) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase.storage.getBucket(bucketName);
        if (error) {
            return { data: null, error };
        }
        return { data, error: null };
    });
}
exports.getBucket = getBucket;
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
function uploadFile(supabase, file, fileName, bucketName) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase.storage
            .from(bucketName)
            // .upload(fileName, file, {
            //   upsert: true,
            // });
            .upload(fileName, file, {
            upsert: true,
            contentType: 'image/png'
        });
        if (error) {
            return { data: null, publicUrl: null, error, path: null };
        }
        const path = data.path;
        const { data: publicData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(path);
        return { data, publicUrl: publicData.publicUrl, error: null, path };
    });
}
exports.uploadFile = uploadFile;
/**
 * Download a file from the bucket
 * @param path - path of the file to be downloaded in the bucket
 * @param bucketName - name of the bucket that the file resides.
 *
 * @returns {Object} Return Object
 * @property {Object} data - Download Info Object or null
 * @property {Object} error - Error or null
 */
function downloadFile(supabase, path, bucketName) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase.storage
            .from(bucketName)
            .download(path);
        if (error) {
            return { data: null, error };
        }
        return { data, error: null };
    });
}
exports.downloadFile = downloadFile;
