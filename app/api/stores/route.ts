import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Missing name", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // İstek gövdesinden mağaza ID'sini alın
    const { storeId } = await req.json();

    if (!storeId) {
      return new NextResponse("Missing store ID", { status: 400 });
    }

    // Kullanıcının sadece kendi mağazasını silebilmesini sağlayın
    const store = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!store) {
      return new NextResponse("Store not found or unauthorized", { status: 404 });
    }

    await prismadb.store.delete({
      where: {
        id: storeId,
      },
    });

    return NextResponse.json({ message: 'Store deleted successfully' });
  } catch (error) {
    console.log('[STORES_DELETE]', error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


