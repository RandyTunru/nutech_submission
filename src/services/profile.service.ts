import pool from "../configs/database";
import { UpdateProfileBody } from "../schemas/profile.schema";

export const getProfile = async (email: string) => {
    try {
        const query = `
            SELECT email, first_name, last_name, profile_image
            FROM users
            WHERE email = $1
        `;

        const result = await pool.query(query, [email]);
        return result.rows[0];
    } catch (error: any) {
        throw new Error("Gagal mendapatkan profil: " + error.message);
    }
};

export const updateProfile = async (email: string, data: UpdateProfileBody) => {
    try {
        const query = `
            UPDATE users
            SET first_name = $1, last_name = $2
            WHERE email = $3
            RETURNING email, first_name, last_name, profile_image;
        `;

        const values = [data.first_name, data.last_name, email];

        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error: any) {
        throw new Error("Gagal memperbarui profil: " + error.message);
    }
};

export const updateProfileImage = async (email: string, imageUrl: string) => {
    try {
        const query = `
            UPDATE users
            SET profile_image = $1
            WHERE email = $2
            RETURNING email, first_name, last_name, profile_image;
        `;
        const values = [imageUrl, email];

        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error: any) {
        throw new Error("Gagal memperbarui gambar profil: " + error.message);
    }
};
