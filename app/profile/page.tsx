import { CalorieCalculator } from "@/components/CalorieCalculator";
import { ProfileComp } from "@/components/Profile";



export default function Profile() {
    return (
        <div className=" flex flex-col h-screen">
            <ProfileComp />
            <CalorieCalculator />
        </div >
    )
}