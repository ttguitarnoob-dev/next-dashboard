import prisma from "@/app/lib/db";

export async function POST(request) {
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


// export async function GET() {
//     return new Response(JSON.stringify({ message: "Hello, world!" }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
  
//   export async function POST(request) {
//     const body = await request.json(); // Parse JSON body
//     const { name } = body;
//     console.log('omgwow', body.thing)
//     return new Response(JSON.stringify(body.thing), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
  