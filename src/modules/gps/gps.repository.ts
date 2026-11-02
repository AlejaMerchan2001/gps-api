import { getDb } from "../../config/database";
import { Gps } from "./gps.model";
import { Collection, ObjectId } from "mongodb";

export class GpsRepository {

    private collection(): Collection<Gps> {
        return getDb().collection<Gps>("gps");
    }

    async create(data: Omit<Gps, "_id">): Promise<Gps> {
        const result = await this.collection().insertOne(data as Gps);
        return { _id: result.insertedId, ...data };
    }

    async findAll(): Promise<Gps[]> {
        return this.collection().find().sort({ createdAt: -1 }).toArray();
    }

    async findById(id: ObjectId): Promise<Gps | null> {
        return this.collection().findOne({ _id: id });
    }

    async update(id: ObjectId, changes: Partial<Gps>): Promise<Gps | null> {
        const result = await this.collection().findOneAndUpdate(
            { _id: id },
            { $set: changes },
            { returnDocument: "after" }
        );
        return result ?? null;
    }

    async delete(id: ObjectId): Promise<boolean> {
        const result = await this.collection().deleteOne({ _id: id });
        return result.deletedCount === 1;
    }
}
