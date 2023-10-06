import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/customService/prisma.service";
import * as fs from 'fs'
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) { }

    async create_product(data: any) {
        try {
            const product = await this.prisma.product.create(
                {
                    data: {
                        description: {
                            create: {
                                title: data.title,
                                description: data.description,
                                price_in: data.price_in,
                                yearly_tax_rate: data.yearly_tax_rate,
                                association_fee: data.association_fee,
                                after_price_label: data.after_price_label,
                                before_price_label: data.before_price_label,
                                propert_status: data.propert_status
                            }
                        },
                        media: {
                            create: {
                                images: {
                                    create: data.images.map(image => {
                                        return {
                                            path: image.filename
                                        }
                                    })
                                },
                                video: data.video,
                                virtual_tour: data.virtual_tour
                            }
                        },
                        location: {
                            create: {
                                address: data.address,
                                state: data.state,
                                city: data.city,
                                zip: data.zip,
                                latitude: data.latitude,
                                longitude: data.longitude,
                                country: data.country,
                                neighbour: data.neighborhood
                            }
                        },
                        detail: {
                            create: {
                                size_in_ft: data.size_in_ft,
                                lot_size_in_ft: data.lot_size_in_ft,
                                rooms: data.rooms,
                                bedrooms: data.bedrooms,
                                bathrooms: data.bathrooms,
                                custom_id: data.custom_id,
                                garages: data.garages,
                                garage_size: data.garage_size,
                                year_built: data.year_built,
                                available_from: data.available_from,
                                basement: data.basement,
                                extra_details: data.extra_details,
                                roofing: data.roofing,
                                exterior_material: data.exterior_material,
                                structure_type: data.structure_type,
                                floors_no: data.floors_no,
                                agent_nots: data.agent_nots,
                                energy_type: data.energy_type,
                            }
                        },
                        category: {
                            connect: {
                                id: Number(data.category)
                            }
                        },
                    }
                }
            )
            return product
        } catch (err) {
            console.log(err)
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }

    async get_all_product() {
        try {
            const products = await this.prisma.product.findMany(
                {
                    include: {
                        category: {
                            include: {
                                language: true
                            }
                        },
                        media: {
                            include: {
                                images: true
                            }
                        },
                        location: true,
                        detail: true,
                        description: true,
                    }
                }
            )
            return products
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_REQUEST);
        }
    }


    async get_product(id: string) {
        try {
            const product = await this.prisma.product.findMany(
                {
                    where: {
                        id: id
                    },
                    include: {
                        description: true,
                        media: {
                            include: {
                                images: true
                            }
                        },
                        location: true,
                        detail: true,
                        category: true,
                    }
                }
            )

            return product
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_GATEWAY)
        }
    }

    async delete_product(id: string) {
        try {
            await this.prisma.product.deleteMany(
                {
                    where: {
                        id: id
                    },
                }
            )
            return true
        } catch (err) {
            throw new HttpException(err, HttpStatus.BAD_GATEWAY)
        }
    }

    async update_product(id: string, data: any) {
        try {
            const create_new_image = []
            for (const image of data.images) {
                const create_image = await this.prisma.images.create(
                    {
                        data: {
                            path: image.filename
                        }
                    }
                )

                create_new_image.push(create_image.id)
            }
            await this.prisma.product.update(
                {
                    where: {
                        id: id
                    },
                    data: {
                        media: {
                            update: {
                                video: data.video,
                                virtual_tour: data.virtual_tour,
                                images: {
                                    connect: create_new_image.map((id: number) => {
                                        return {
                                            id: id
                                        }
                                    })
                                }
                            },
                        },
                        location: {
                            update: {
                                address: data.address,
                                state: data.state,
                                city: data.city,
                                zip: data.zip,
                                latitude: data.latitude,
                                longitude: data.longitude,
                                country: data.country,
                                neighbour: data.neighborhood
                            }
                        },
                        detail: {
                            update: {
                                size_in_ft: data.size_in_ft,
                                lot_size_in_ft: data.lot_size_in_ft,
                                rooms: data.rooms,
                                bedrooms: data.bedrooms,
                                bathrooms: data.bathrooms,
                                custom_id: data.custom_id,
                                garages: data.garages,
                                garage_size: data.garage_size,
                                year_built: data.year_built,
                                available_from: data.available_from,
                                basement: data.basement,
                                extra_details: data.extra_details,
                                roofing: data.roofing,
                                exterior_material: data.exterior_material,
                                structure_type: data.structure_type,
                                floors_no: data.floors_no,
                                agent_nots: data.agent_nots,
                                energy_type: data.energy_type,
                            }
                        },
                        description: {
                            update: {
                                title: data.title,
                                description: data.description,
                                price_in: data.price_in,
                                yearly_tax_rate: data.yearly_tax_rate,
                                association_fee: data.association_fee,
                                after_price_label: data.after_price_label,
                                before_price_label: data.before_price_label,
                                propert_status: data.propert_status
                            }
                        },
                        category: {
                            connect: {
                                id: Number(data.category)
                            }
                        }
                    }
                }
            )
        } catch (err) {
            console.log(err)
            throw new HttpException('PRoduct update error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }


    async product_image_delete(img_id: Number) {
        try {
            const image = await this.prisma.images.findUnique({
                where: {
                    id: Number(img_id)
                }
            });

            if (image) {
                const filepath = "src/assets/public/uploads/" + image.path
                // Delete the image file from the folder
                fs.unlinkSync(filepath);

                // Delete the image from the database
                await this.prisma.images.deleteMany({
                    where: {
                        id: Number(img_id)
                    }
                });
            } else {
                throw new HttpException('Image not found', HttpStatus.NOT_FOUND);
            }
        } catch (err) {
            throw new HttpException('Image remove error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async product_search(category_key: string, location_key: string, keyword_key: string) {
        try {
            const where: any = {};

            if (category_key !== '') {
                where.category = {
                    name: {
                        contains: category_key,
                        mode: 'insensitive'
                    }
                };
            }

            if (location_key !== '') {
                where.location = {
                    city: {
                        contains: location_key,
                        mode: 'insensitive'
                    }
                };
            }

            if (keyword_key !== '') {
                where.OR = [
                    {
                        title: {
                            contains: keyword_key,
                            mode: 'insensitive'
                        },
                        description: {
                            contains: keyword_key,
                            mode: 'insensitive'
                        },
                        details: {
                            contains: keyword_key,
                            mode: 'insensitive'
                        }
                    }
                ]
            }

            const result = await this.prisma.product.findMany({
                where,
                include: {
                    description: true,
                    media: {
                        include: {
                            images: true
                        }
                    },
                    location: true,
                    detail: true,
                    category: true
                }
            });

            return result;
        } catch (err) {
            throw new HttpException('Product search error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}