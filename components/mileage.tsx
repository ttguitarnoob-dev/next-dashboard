import { PrismaClient } from '@prisma/client';
import prisma from "@/app/lib/db";
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Image } from '@heroui/image';
import { Divider } from '@heroui/divider';
export default async function Mileage() {
    const data: any = await prisma.mileage.findUnique({
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
            return "Today";
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

            <section className='p-4 mb-4'>
                <p>You have until December 24, 2027 to stay below 45,000 miles.</p>
                <Divider className='mt-4 mb-4' />
                <p><span className='font-bold'>Time remaining in lease:</span> {getTimeRemaining('December 24, 2027')}</p>
                <p><span className='font-bold'>Time remaining in year 1:</span> {getTimeRemaining('September 24, 2025')}</p>
            </section>
            <section className='flex flex-wrap gap-4 justify-center'>
                <div>
                    <Card className="py-4">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">Current Mileage As Of</p>
                            <h4 className="font-bold text-large">{lastUpdated(data?.updatedAt)}</h4>
                        </CardHeader>
                        <Divider className='mt-4' />
                        <CardBody className="overflow-visible py-2 items-center">
                            <h2 className='text-4xl text-blue-600'>{currentMileage}</h2>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <Card className="py-4">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">Average Miles Per day</p>
                            <h4 className="font-bold text-large">End Of Lease</h4>
                        </CardHeader>
                        <Divider className='mt-4' />
                        <CardBody className="overflow-visible py-2 items-center">
                            <h2 className='text-4xl text-blue-600'>{getAverageMilesPerDay('December 24, 2027', 48750)}</h2>
                        </CardBody>
                    </Card>
                </div>
                <div>
                    <Card className="py-4">
                        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                            <p className="text-tiny uppercase font-bold">Average Miles Per day</p>
                            <h4 className="font-bold text-large">End Of Year 1</h4>
                        </CardHeader>
                        <Divider className='mt-4' />
                        <CardBody className="overflow-visible py-2 items-center">
                            <h2 className='text-4xl text-blue-600'>{getAverageMilesPerDay('September 24, 2025', 15000)}</h2>
                        </CardBody>
                    </Card>
                </div>
                
            </section>
        </>
    );
}