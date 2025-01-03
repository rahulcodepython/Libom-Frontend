import { createClient } from "@/utils/supabase/server";

export default async function Dashboard() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            Dashboard
        </div>
    );
}
