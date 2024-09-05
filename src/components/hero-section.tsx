import { Button } from "./ui/button";

export function HeroSection() {
  return (
    <div className=" bg-white  py-12 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShopNow</h1>
        <p className="text-xl mb-8">
          Discover amazing products at unbeatable prices!
        </p>
        <Button variant="default" size="lg">
          Shop Now
        </Button>
      </div>
    </div>
  );
}
