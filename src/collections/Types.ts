import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { anyone } from '../access/anyone'
import { slugField } from '@/fields/slug'

export const Types: CollectionConfig = {
    slug: 'types',
    access: {
        create: authenticated,
        delete: authenticated,
        read: anyone,
        update: authenticated,
    },
    admin: {
        group: 'Sections',
        useAsTitle: 'title'
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            localized: true,
            unique: true,
        },
        ...slugField(),
    ],
    hooks: {
        beforeDelete: [
            async ({ req, id }) => {
                try {
                    console.log(`Starting beforeDelete hook for type ID: ${id}`)
                    
                    // Handle Tours collection - type field
                    const toursWithType = await req.payload.find({
                        collection: 'tours',
                        where: {
                            'type.id': {
                                equals: id,
                            },
                        },
                    })

                    console.log(`Found ${toursWithType.docs.length} tours with type field referencing type ${id}`)

                    for (const tour of toursWithType.docs) {
                        console.log(`Updating tour ${tour.id}, setting type to null`)
                        
                        await req.payload.db.updateOne({
                            collection: 'tours',
                            where: { id: { equals: tour.id } },
                            data: {
                                type: null,
                            },
                        })
                    }
                    
                    console.log(`Successfully completed beforeDelete hook for type ID: ${id}`)
                } catch (error) {
                    console.error(`Error in beforeDelete hook for type ID ${id}:`, error)
                    throw error
                }
            },
        ],
    },
    timestamps: true,
}