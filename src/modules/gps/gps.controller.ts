import { Request, Response } from "express";
import { GpsService } from "./gps.service";

export class GpsController {

    private readonly gpsService = new GpsService();

    create = async (req: Request, res: Response): Promise<void> => {
        const demo = await this.gpsService.create(req.body);
        res.status(201).json(demo);
    };

    findAll = async (_req: Request, res: Response): Promise<void> => {
        const demos = await this.gpsService.findAll();
        res.status(200).json(demos);
    };

    findById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const demo = await this.gpsService.findById(req.params.id);
        res.status(200).json(demo);
    };

    update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const demo = await this.gpsService.update(req.params.id, req.body);
        res.status(200).json(demo);
    };

    delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        await this.gpsService.delete(req.params.id);
        res.status(204).send();
    };
}
