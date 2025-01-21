import { PrismaClient } from '@prisma/client';
import prisma from "@/app/lib/db";
export default async function Mileage() {
    const data = await prisma.mileage.findUnique({
        where: {
            id: 'cm66li6b20000ujhphl21fo3i',
        },
    });
    const currentMileage = data?.currentMileage
    // const maxMileage = 45000;
    console.log("datata", data?.currentMileage)
    

    function getTimeRemaining(targetDateString: string) {
        const targetDate = new Date(targetDateString);
        const currentDate = new Date();
        const timeDiff = targetDate.getTime() - currentDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const years = Math.floor(daysDiff / 365);
        const months = Math.floor((daysDiff % 365) / 30);
        const days = daysDiff % 30;

        return `${years} years, ${months} months, ${days} days`;
    }

    function getAverageMilesPerDay(targetDateString: string, maxMileage: number) {
        const targetDate = new Date(targetDateString);
        const currentDate = new Date();
        const timeDiff = targetDate.getTime() - currentDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const milesRemaining = maxMileage - currentMileage;
        const averageMilesPerDay = milesRemaining / daysDiff;

        return averageMilesPerDay.toFixed(2);
    }

    function lastUpdated(updated: Date) {
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - updated.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff === 0) {
            return "today";
        } else if (daysDiff === 1) {
            return "1 day ago";
        } else {
            return `${daysDiff} days ago`;
        }
    }

    const lastUpdatedDate = new Date('October 10, 2023'); // Example date
    const lastUpdatedString = lastUpdated(lastUpdatedDate);
    console.log(data)

    return (
        <>
            <section>
                <p>You have until December 24, 2027 to stay below 45,000 miles.</p>
                <p>Current mileage: {currentMileage} as of {lastUpdated(data?.updatedAt)}</p>
                <p>Time remaining: {getTimeRemaining('December 24, 2027')}</p>
                <p>Time remaining in year 1 of the lease: {getTimeRemaining('September 24, 2025')}</p>
                <p>Average miles allowed per day until the end of the lease: {getAverageMilesPerDay('December 24, 2027', 45000)}</p>
                <p>Average miles allowed per day to stay under 15,000 in the first year: {getAverageMilesPerDay('09/24/2025', 15000)}</p>
            </section>
        </>
    );
}