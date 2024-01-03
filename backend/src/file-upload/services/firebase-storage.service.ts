import {Injectable} from '@nestjs/common';
import {ref, uploadBytes} from "@firebase/storage";
import type {File} from 'src/file-upload/types'
import {FirebaseFactory} from "./firebase-factory.service";

@Injectable()
export class FirebaseStorage {
    constructor(private readonly firebaseApp: FirebaseFactory) {}

    async uploadFile(file: File, path: string): Promise<string> {
        const generatedFileName = `${new Date().getTime()}${file.extension}`
        const filePathInFirebase = `${path}/${generatedFileName}`;
        const fileRef = ref(this.firebaseApp.getFirebaseStorage(), filePathInFirebase)
        const metadata = {
            contentType: 'image/png',
        };
        await uploadBytes(fileRef, file.content,metadata)
        const displayPath = filePathInFirebase.replace(/\//g, '%2F');
        return `https://firebasestorage.googleapis.com/v0/b/${fileRef.bucket}/o/${displayPath}?alt=media`
    }
}