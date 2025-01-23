import prisma from "@/app/lib/db";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { id, currentMileage } = await request.json();

    // Validate inputs
    if (!id || !currentMileage) {
      return new Response(JSON.stringify({ error: 'Missing id or currentMileage' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update the database entry
    const updatedEntry = await prisma.mileage.update({
      where: { id },
      data: { currentMileage },
    });

    // Return success response
    return new Response(JSON.stringify({ message: 'Mileage updated successfully', updatedEntry }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating mileage:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while updating mileage' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function GET() {
  const id = "cm66li6b20000ujhphl21fo3i"
  const endLease = {
    mileage: 45000,
    date: "December 27, 2027"
  }
  const yearOne = {
    mileage: 15000,
    date: "September 24, 2025"
  }

  function daysRemaining(targetDate: string) {
    // Get today's date
    const today = new Date();

    // Ensure only the date portion is used (time is set to 0)
    today.setHours(0, 0, 0, 0);

    // Convert the target date string into a Date object
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = target - today;

    // Convert the difference to days
    const daysDifference = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    return daysDifference;
  }




  try {
    // Fetch the mileage entry from the database
    const mileageEntry = await prisma.mileage.findUnique({
      where: { id },
    });





    if (!mileageEntry) {
      return new Response(JSON.stringify({ error: "Entry not found" }), {
        status: 404,
      });
    }
    // Need to return the current mileage, average per day till the end of the lease and average per day for end of year one

    const currentMileage = mileageEntry.currentMileage
    const mileLeftLease = endLease.mileage - currentMileage
    const milesLeftYear = yearOne.mileage - currentMileage
    const perDayLease = mileLeftLease / daysRemaining(endLease.date)
    const perDayYear = milesLeftYear / daysRemaining(yearOne.date)

    const finalResponse = `Hi! Your current mileage is ${currentMileage.toFixed()}. You must stay below an average of ${perDayYear.toFixed()} miles per day to stay below the alloted mileage for this year, and average ${perDayLease.toFixed()} miles per day to stay below the final mileage for the lease. You've got a total of ${mileLeftLease} miles left in the lease and ${milesLeftYear} miles left in this year. Good luck! `

    //RESPONSE SENT TO REQUESTER!!
    return new Response(JSON.stringify(finalResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong", details: error.message }),
      { status: 500 }
    );
  }
}

//   export async function POST(request) {
//     const body = await request.json(); // Parse JSON body
//     const { name } = body;
//     console.log('omgwow', body.thing)
//     return new Response(JSON.stringify(body.thing), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
