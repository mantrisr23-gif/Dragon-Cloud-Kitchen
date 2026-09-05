import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // 1. Import revalidatePath
import Link from "next/link";

export default function AddDishPage() {

  // Server Action to create the dish in Neon
  async function createDish(formData: FormData) {
    "use server";
    
    await prisma.product.create({
      data: {
        title: formData.get("title") as string,
        desc: formData.get("desc") as string,
        price: Number(formData.get("price")),
        category: formData.get("category") as string,
        featured: formData.get("featured") === "true",
        // Using a default image for now if you don't type one in
        image: (formData.get("image") as string) || "/images/menu/chicken-biryani-1.png",
        isAvailable: formData.get("isAvailable") === "true",
      }
    });

    revalidatePath("/admin"); // 2. Clears the cache so the new dish shows up!
    redirect("/admin"); // Go back to dashboard
  }

  return (
    <main className="min-h-screen bg-[#F5E6D3] p-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-[#3A2E26] mb-8" style={{ fontFamily: 'var(--font-dm-serif), serif' }}>
          Add New Dish
        </h1>

        <form action={createDish} className="flex flex-col gap-6">
          
          <div>
            <label className="block text-sm font-bold text-[#5C4D42] mb-2">Dish Name</label>
            <input type="text" name="title" required className="w-full border border-gray-300 p-3 rounded-lg" placeholder="e.g. Garlic Naan" />
          </div>

          <div>
            <label className="block text-sm font-bold text-[#5C4D42] mb-2">Description</label>
            <input type="text" name="desc" required className="w-full border border-gray-300 p-3 rounded-lg" placeholder="Short tasty description..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#5C4D42] mb-2">Price (₹)</label>
              <input type="number" name="price" required className="w-full border border-gray-300 p-3 rounded-lg" placeholder="100" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#5C4D42] mb-2">Category</label>
              <input type="text" name="category" required className="w-full border border-gray-300 p-3 rounded-lg uppercase" placeholder="e.g. BREADS" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-[#5C4D42] mb-2">Status</label>
              <select name="isAvailable" className="w-full border border-gray-300 p-3 rounded-lg">
                <option value="true">LIVE (Available)</option>
                <option value="false">SOLD OUT</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#5C4D42] mb-2">Featured on Homepage?</label>
              <select name="featured" className="w-full border border-gray-300 p-3 rounded-lg">
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-[#C52D22] text-white px-8 py-3 rounded-full font-bold hover:bg-[#A32219] transition-colors">
              CREATE DISH
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