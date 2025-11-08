import { Request, Response } from "express"
import { getBanners, getServices } from "../services/information.service"

export const getBannersController = async (req: Request, res: Response) => {
    try {
        const banners = await getBanners()
        res.status(200).json({ banners })
    } catch (error) {
        console.error("Error fetching banners:", error)
        res.status(500).json({ 
            status: 1,
            error: "Internal Server Error",
            data: null
        })
    }
}

export const getServicesController = async (req: Request, res: Response) => {
    try {
        const services = await getServices()
        res.status(200).json({ services })
    } catch (error) {
        console.error("Error fetching services:", error)
        res.status(500).json({ 
            status: 1,
            error: "Internal Server Error",
            data: null
        })
    }
}