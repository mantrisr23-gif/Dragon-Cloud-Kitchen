import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // 1. Added this import
import Link from "next/link";

export default async function EditDishPage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;

  const dish = await prisma.product.findUnique({
    where: { id: id }
  });

  if (!dish) return <div>Dish not found!</div>;

  async function updateDish(formData: FormData) {
    "use server";
    
    await prisma.product.update({
      where: { id: id },
      data: {
        title: formData.get("title") as string,
        price: Number(formData.get("price")),
        isAvailable: formData.get("isAvailable") === "true",
      }
    });

    // 2. Added this to clear the cache and show the fresh data!
    revalidatePath("/admin"); 
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-[#F5E6D3] p-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#3A2E26] mb-8" style={{ fontFamily: 'var(--font-dm-serif), serif' }}>
          Edit {dish.title}
        </h1>

        <form action={updateDish} className="flex flex-col gap-6">
          
          <div>
            <label className="block text-sm font-bold text-[#5C4D42] mb-2">Dish Name</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={dish.title} 
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#5C4D42] mb-2">Price (₹)</label>
            <input 
              type="number" 
              name="price" 
              defaultValue={dish.price} 
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#5C4D42] mb-2">Status</label>
            <select name="isAvailable" defaultValue={dish.isAvailable ? "true" : "false"} className="w-full border border-gray-300 p-3 rounded-lg">
              <option value="true">LIVE (Available)</option>
              <option value="false">SOLD OUT</option>
            </select>
          </div>

          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-[#C52D22] text-white px-8 py-3 rounded-full font-bold hover:bg-[#A32219] transition-colors">
              SAVE CHANGES
            </button>
            <Link href="/admin" className="px-8 py-3 rounded-full font-bold text-[#5C4D42] border border-gray-300 hover:bg-gray-50 transition-colors">
              CANCEL
            </Link>
          </div>

        </form>
      </div>
    </main>
  );
}