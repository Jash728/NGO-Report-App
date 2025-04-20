import { NextResponse } from 'next/server';
import Report from '@/models/Report';
import connectToDatabase from '@/lib/mongoose';

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { ngoId, month, peopleHelped, eventsConducted, fundsUtilized } = body;

    // Basic validation
    if (!ngoId || !month || peopleHelped == null || eventsConducted == null || fundsUtilized == null) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Create a new report
    const newReport = new Report({
      ngoId,
      month,
      peopleHelped,
      eventsConducted,
      fundsUtilized,
    });

    await newReport.save();

    return NextResponse.json({ message: 'Report submitted successfully.' }, { status: 201 });

  } catch (error) {
    console.error('Error submitting report:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
