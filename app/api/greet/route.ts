import { NextRequest, NextResponse } from 'next/server';

type RequestBody = {
  name?: string;
};

type GreetResponse = {
  message: string;
};

export async function POST(
  request: NextRequest
): Promise<NextResponse<GreetResponse>> {
  try {
    const body = (await request.json()) as RequestBody;
    const name = body.name?.trim() || '';

    // Simulate a small delay to demonstrate loading state
    await new Promise((resolve) => setTimeout(resolve, 300));

    const message = name ? `Hi, ${name}!` : 'Hi';

    return NextResponse.json({ message });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while processing your request';

    return NextResponse.json(
      { message: `Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}
