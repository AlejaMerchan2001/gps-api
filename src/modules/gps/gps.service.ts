import { ObjectId } from "mongodb";
import { Gps, gpsDTO } from "./gps.model";
import { GpsRepository } from "./gps.repository";
import { BadRequestError, NotFoundError } from "../../shared/errors/AppError";

export class GpsService {

    private readonly gpsRepository = new GpsRepository();

    async create(data: gpsDTO): Promise<Gps> {
        const name = this.requireString(data?.name, "name");
        const description = this.requireString(data?.description, "description");
        const lat = this.requireString(data?.lat, "description");
        const long = this.requireString(data?.long, "description");

        const now = new Date();
        return this.gpsRepository.create({
            name,
            description,
            lat,
            long,
            active: typeof data.active === "boolean" ? data.active : true,
            createdAt: now,
            updatedAt: now,
        });
    }

    async findAll(): Promise<Gps[]> {
        return this.gpsRepository.findAll();
    }

    async findById(id: string): Promise<Gps> {
        const demo = await this.gpsRepository.findById(this.toObjectId(id));
        if (!demo) {
            throw new NotFoundError("Registro no encontrado");
        }
        return demo;
    }

    async update(id: string, data: gpsDTO): Promise<Gps> {
        const objectId = this.toObjectId(id);
        const changes: Partial<Gps> = {};

        if (data.name !== undefined) changes.name = this.requireString(data.name, "name");
        if (data.description !== undefined) changes.description = this.requireString(data.description, "description");
        if (data.active !== undefined) {
            if (typeof data.active !== "boolean") {
                throw new BadRequestError("El campo 'active' debe ser booleano");
            }
            changes.active = data.active;
        }

        if (Object.keys(changes).length === 0) {
            throw new BadRequestError("No se enviaron campos para actualizar");
        }
        changes.updatedAt = new Date();

        const updated = await this.gpsRepository.update(objectId, changes);
        if (!updated) {
            throw new NotFoundError("Registro no encontrado");
        }
        return updated;
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.gpsRepository.delete(this.toObjectId(id));
        if (!deleted) {
            throw new NotFoundError("Registro no encontrado");
        }
    }

    private requireString(value: unknown, field: string): string {
        if (typeof value !== "string" || value.trim() === "") {
            throw new BadRequestError(`El campo '${field}' es obligatorio y debe ser un texto no vacío`);
        }
        return value.trim();
    }

    private toObjectId(id: string): ObjectId {
        if (!ObjectId.isValid(id)) {
            throw new BadRequestError(`Identificador inválido: ${id}`);
        }
        return new ObjectId(id);
    }
}
