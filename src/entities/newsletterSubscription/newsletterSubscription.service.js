import NewsletterSubscription from "./newsletterSubscription.model.js";

export const createNewsletterSubscriptionService = async (email) => {
    const existingSubscription = await NewsletterSubscription.findOne({ email });
    if (existingSubscription) throw new Error('Email already subscribed to the newsletter');

    const newsletterSubscription = new NewsletterSubscription({ email });

    await newsletterSubscription.save();
    return;
}

export const getAllNewsletterSubscriptionService = async (page, limit, skip) => {
    const newsletterSubscriptions = (
        await NewsletterSubscription
            .find({})
            .sort({ subscribedAt: -1 })
            .lean()
    )
    return {
        data: newsletterSubscriptions.slice(skip, skip + limit),
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(newsletterSubscriptions.length / limit),
            totalItems: newsletterSubscriptions.length,
            itemsPerPage: limit
        }
    };
}