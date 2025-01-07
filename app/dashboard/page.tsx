import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getUser } from "@/utils/utils";
import { getAccessToken } from "../actions";

export default async function Dashboard() {
    const access = await getAccessToken();
    const user = getUser(access);

    return (
        <div className="flex-1 w-full flex flex-col gap-4">
            <span>
                <p className="text-muted-foreground">
                    Welcome back, {user?.first_name + " " + user?.last_name}!
                </p>
            </span>
            <div className="w-full grid grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Week
                        </CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Month
                        </CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Year
                        </CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </div>
            <div className="flex flex-col gap-2">
                <span>
                    <p className="text-muted-foreground">Your Holdings</p>
                </span>
                <div className="w-full grid grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Book Name
                            </CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Book Name
                            </CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Blank
                            </CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <p>Card Footer</p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-2 col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                Announcements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <p>Announcement 1</p>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                {/* <div className="w-2 h-2 rounded-full bg-red-500"></div> */}
                            </div>
                            <div className="flex items-center justify-between">
                                <p>Announcement 1</p>
                                {/* <div className="w-2 h-2 rounded-full bg-green-500"></div> */}
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>Announcement 1</p>
                                {/* <div className="w-2 h-2 rounded-full bg-green-500"></div> */}
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>Announcement 1</p>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                {/* <div className="w-2 h-2 rounded-full bg-red-500"></div> */}
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Penalty
                        </CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
