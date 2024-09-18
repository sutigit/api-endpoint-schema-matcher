import { z } from 'zod';

const Schema = z.object({
    results: z.array(z.object({
        id: z.number().min(0),
    }))
});


const getLeadingKeys = (key: string, data: any) => {
    const leadingKeySchema = z.object({
        results: z.array(z.object({
            [key]: z.number().min(0)
        }))
    })

    return leadingKeySchema.safeParse(data)
}


export { Schema, getLeadingKeys };