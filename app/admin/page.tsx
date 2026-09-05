import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function AdminDashboard() {
  // Fetch the live menu directly from Neon
  const menuItems = await prisma.product.findMany({
    orderBy: { category: 'asc' } 
  });

  // Server Action to Delete a dish
  async function deleteDish(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    await prisma.product.delete({
      where: { id }
    });
    revalidatePath("/admin"); // Refreshes the page instantly!
  }

  return (
    <main className="min-h-screen bg-[#F5E6D3] p-12">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#3A2E26]" style={{ fontFamily: 'var(--font-dm-serif), serif' }}>
            Dragon Command Center
          </h1>
          {/* FIXED: This is now a Link to the Add page */}
          <Link href="/admin/add" className="bg-[#C52D22] text-white px-6 py-2 rounded-full font-bold tracking-wider text-sm hover:bg-[#A32219] transition-colors">
            + ADD NEW DISH
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#3A2E26]/10 text-[#5C4D42] text-sm uppercase tracking-wider">
                <th className="p-4">Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="border-b border-[#3A2E26]/5 hover:bg-[#F5E6D3]/30 transition-colors">
                  <td className="p-4 flex items-center gap-4">
                    <div className="relative w-12 h-12 bg-[#F5E6D3] rounded-lg p-1">
                      <Image src={item.image} alt={item.title} fill className="object-contain" />
                    </div>
                    <div>
                      <p className="font-bold text-[#3A2E26]">{item.title}</p>
                      <p className="text-xs text-[#5C4D42] truncate max-w-[200px]">{item.desc}</p>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-[#B85C29]">{item.category}</td>
                  <td className="p-4 font-bold text-[#C52D22]">₹{item.price}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {item.isAvailable ? 'LIVE' : 'SOLD OUT'}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-4 mt-2">
                    
                    {/* FIXED: The working Edit Link */}
                    <Link href={`/admin/edit/${item.id}`} className="text-sm font-bold text-[#5C4D42] hover:text-[#C52D22]">
                      EDIT
                    </Link>
                    
                    {/* FIXED: The working Delete Form */}
                    <form action={deleteDish}>
                      <input type="hidden" name="id" value={item.id} />
                      <button type="submit" className="text-sm font-bold text-red-500 hover:text-red-700">
                        DELETE
                      </button>
                    </form>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  );
}