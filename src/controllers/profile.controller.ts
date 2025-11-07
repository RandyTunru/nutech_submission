import { Request, Response } from "express";
import { getProfile, updateProfile, updateProfileImage } from "../services/profile.service";
import fileUploadService from "../services/file.service";

export const getProfileController = async (req: Request, res: Response) => {
    try {
        const email = req.user!.email;
        const profile = await getProfile(email);
        res.status(200).json({
            status: 0,
            message: "Profil berhasil diambil",
            data: profile,
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            status: 1,
            message: "Gagal mengambil profil",
            data: null,
        });
    }
};

export const updateProfileController = async (req: Request, res: Response) => {
    try {
        const email = req.user!.email;

        const updatedProfile = await updateProfile(email, req.body);

        res.status(200).json({
            status: 0,
            message: "Profil berhasil diperbarui",
            data: updatedProfile,
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            status: 1,
            message: "Gagal memperbarui profil",
            data: null,
        });
    }
};

export const updateProfileImageController = async (req: Request, res: Response) => {
    try {
        const email = req.user!.email;

        if (!req.file) {
            return res.status(400).json({
                status: 102,
                message: "Tidak ada file yang diunggah",
                data: null,
            });
        }

        const imageUrl = await fileUploadService.upload(req.file);

        const updatedProfile = await updateProfileImage(email, imageUrl);


        res.status(200).json({
            status: 0,
            message: "Gambar profil berhasil diperbarui",
            data: updatedProfile,
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({
            status: 1,
            message: "Gagal memperbarui gambar profil",
            data: null,
        });
    }
};