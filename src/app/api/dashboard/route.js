import connectToDatabase from "@/lib/mongoose";
import Report from "@/models/Report";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");

  if (!month) {
    return NextResponse.json({ message: "Month is required" }, { status: 400 });
  }

  try {
    const reports = await Report.find({ month });

    const uniqueNgos = new Set(reports.map((r) => r.ngoId));
    const peopleHelped = reports.reduce((acc, r) => acc + r.peopleHelped, 0);
    const eventsConducted = reports.reduce(
      (acc, r) => acc + r.eventsConducted,
      0
    );
    const fundsUtilized = reports.reduce((acc, r) => acc + r.fundsUtilized, 0);
    return NextResponse.json({
      totalNGOs: uniqueNgos.size,
      totalPeopleHelped: peopleHelped,
      totalEventsConducted: eventsConducted,
      totalFundsUtilized: fundsUtilized,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching dashboard data" },
      { status: 500 }
    );
  }
}
