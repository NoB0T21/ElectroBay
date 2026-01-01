import { Request, Response } from "express";
import order from "../models/order.model";
import user from "../models/user.model";

export const getAnalysisData = async (req: Request, res: Response) => {
    try {
        const today = new Date();
        const lastYearToday = new Date();
        lastYearToday.setFullYear(today.getFullYear() - 1);

        const analytics = await order.aggregate([
            {
                $match: {
                createdAt: {
                    $gte: lastYearToday,
                    $lte: today
                }
                }
            },

            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    revenue: { $sum: "$price" },
                    orders: { $sum: 1 },
                    productId: { $push: "$productId" },
                    productName: { $push: "$productName" }
                }
            },

            {
                $addFields: {
                    productId: {
                        $reduce: {
                            input: "$productId",
                            initialValue: [],
                            in: { $concatArrays: ["$$value", "$$this"] }
                        }
                    },
                    productName: {
                        $reduce: {
                            input: "$productName",
                            initialValue: [],
                            in: { $concatArrays: ["$$value", "$$this"] }
                        }
                    }
                }
            },

            { $unwind: "$productId" },

            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            },

            { $unwind: "$product" },
            {
                $group: {
                    _id: {
                        year: "$_id.year",
                        month: "$_id.month",
                        category: "$product.productType"
                    },
                    revenue: { $first: "$revenue" },
                    orders: { $first: "$orders" },
                    productsByCategory: {
                        $sum: "$product.price"
                    },
                    productsName: { $first: "$productName" }
                }
            },

            {
                $group: {
                    _id: {
                        year: "$_id.year",
                        month: "$_id.month"
                    },
                    revenue: { $first: "$revenue" },
                    orders: { $first: "$orders" },
                    productsName: { $first: "$productsName" },
                    productsByCategory: {
                        $push: {
                            productType: "$_id.category",
                            total: "$productsByCategory"
                        }
                    }
                }
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]);

        let analysisData
        const result: { name: string; orders: number }[] = [];
        const map = new Map<string, number>();
        for(const analytic of analytics) {
            let sum:number = 0
            for(var i=0; i < analytic.productsName.length; i++){
                const [name, qyt] = analytic.productsName[i].split(' x ')
                const quantity = Number(qyt);
                map.set(name, (map.get(name) || 0) + quantity);
                sum += Number(qyt)
            }
            for (const [name, orders] of map.entries()) {
                result.push({ name, orders });
            }
            analysisData = {
                revenue: analytic.revenue,
                orders: analytic.orders,
                productsByCategory: analytic.productsByCategory,
                productsTotal: sum
            }
        }

        const statusCounts = await order.aggregate([
            {
                $group: {
                    _id: "$status",
                    total: { $sum: 1 }
                }
            }
        ])

        const totalUsers = await user.countDocuments();

        const data = await order.aggregate([
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    value: { $sum: "$price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id",
                    value: 1
                }
            },
            { $sort: { month: 1 } }
        ]);
        const monthMap = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const result2 = data.map(item => ({
            name: monthMap[item.month - 1],
            value: item.value
        }));

        const data2 = await order.aggregate([
            {
                $group: {
                    _id: { $week: "$createdAt" },
                    value: { $sum: "$price" }
                }
            },
            { $sort: { _id: -1 } },
            { $limit: 4 },
            { $sort: { _id: 1 } }
        ]);
        const result3 = data2.map((item, index) => ({
            name: `Week ${index + 1}`,
            value: item.value
        }));

        analysisData = {
            ...analysisData,
            orderStatus: statusCounts,
            bestProduct: result,
            monthlySalesData: result2,
            weeklySalesData: result3,
            totalUsers
        }

        return res.status(200).json({
            success: true,
            analysisData,
            message: "Analysis Report"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
