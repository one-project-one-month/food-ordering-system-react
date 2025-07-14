import { Input } from "./ui/input"
import { Button } from "./ui/button"
import bannerImage from "../assets/bannerImage.png"

export default function Banner() {

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 py-10 px-4 sm:px-8 md:px-16">
            <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold md:leading-[1.3] lg:leading-[1.4] text-primary font-merienda">
                    Be the Fastest <br />
                    In Delivering <br />
                    Your Food
                </h1>
                <p className="text-muted-foreground text-lg">
                    Freshly made food delivered to your door.
                </p>

                <div className="flex flex-col sm:flex-nowrap gap-4">
                    <Input
                        placeholder="Enter your location"
                        className="w-full rounded-full border border-[#3F9A1E]"
                    />
                    <Button
                        size="lg"
                        className="rounded-full border border-[#3F9A1E] sm:w-1/2"
                    >
                        Delivery Now
                    </Button>
                </div>
            </div>

            <div className="flex justify-center">
                <img
                    src={bannerImage}
                    alt="Food Delivery"
                    className="w-full h-auto object-contain"
                />
            </div>
        </section>
    )
}
