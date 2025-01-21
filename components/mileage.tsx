export default function Mileage() {
    const currentMileage = 11000;
    const maxMileage = 45000;
    


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

    function getAverageMilesPerDay() {
        const targetDate = new Date('December 24, 2027');
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

    return (
        <>
            <section>
                <h2>Mileage</h2>
                <p>You have until December 24, 2027 to stay below 45,000 miles.</p>
                <p>Current mileage: {currentMileage} as of {lastUpdated(new Date("1/7/2025"))}</p>
                <p>Time remaining: {getTimeRemaining('December 24, 2027')}</p>
                <p>Time remaining in year 1 of the lease: {getTimeRemaining('September 24, 2025')}</p>
                <p>Average miles allowed per day: {getAverageMilesPerDay()}</p>
            </section>
        </>
    );
}