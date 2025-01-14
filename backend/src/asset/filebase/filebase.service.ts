import { Injectable } from "@nestjs/common";
import { ObjectManager } from "@filebase/sdk";

@Injectable()
export class FilebaseService {
  private objectManager: ObjectManager;

  constructor() {
    const S3_KEY = process.env.FILEBASE_KEY;
    const S3_SECRET = process.env.FILEBASE_SECRET;
    const bucketName = process.env.BUCKET_NAME;

    console.log("S3_KEY:", S3_KEY);
    console.log("S3_SECRET:", S3_SECRET);
    console.log("BUCKET_NAME:", bucketName);

    if (!S3_KEY || !S3_SECRET || !bucketName) {
      throw new Error(
        "FILEBASE CREDENTIALS ARE NOT SET IN ENVIRONMET VARIABLES",
      );
    }
    this.objectManager = new ObjectManager(S3_KEY, S3_SECRET, {
      bucket: bucketName,
    });

    console.log("ObjectManager initialized:", this.objectManager);
  }

  async uploadFile(
    key: string,
    data: Buffer,
    metadata?: object,
    options?: object,
  ): Promise<any> {
    try {
      const uploadedObject = await this.objectManager.upload(key, data, {}, {});
      return uploadedObject;
    } catch (error) {
      throw new Error(`Failed to upload file ${error.message}`);
    }
  }
}
