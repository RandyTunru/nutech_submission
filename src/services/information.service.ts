import pool from "../configs/database";

export const getBanners = async () => {
    const query = `
        SELECT banner_name, banner_image, description
        FROM banners;
    `;

    const result = await pool.query(query);
    return result.rows;
}

export const getServices = async () => {
    const query = `
        SELECT service_code, service_name, service_icon, service_tariff
        FROM services;
    `;
    
    const result = await pool.query(query);
    return result.rows;
}
