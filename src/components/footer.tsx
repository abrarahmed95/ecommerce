import { Button } from "./ui/button";
import { Input } from "./ui/input";

<footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto px-4">
    <div className="flex flex-wrap justify-between">
      <div className="w-full md:w-1/4 mb-6 md:mb-0">
        <h3 className="text-lg font-semibold mb-4">About Us</h3>
        <p>
          ShopNow is your one-stop shop for all your needs. We offer
          high-quality products at competitive prices.
        </p>
      </div>
      <div className="w-full md:w-1/4 mb-6 md:mb-0">
        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li>
            <a href="#" className="hover:text-blue-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-blue-400">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="w-full md:w-1/4 mb-6 md:mb-0">
        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
        <p>123 Shop Street, City, Country</p>
        <p>Email: info@shopnow.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
      <div className="w-full md:w-1/4">
        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
        <p className="mb-4">
          Subscribe to our newsletter for updates and promotions.
        </p>
        <div className="flex">
          <Input
            type="email"
            placeholder="Your email"
            className="rounded-r-none"
          />
          <Button className="rounded-l-none">Subscribe</Button>
        </div>
      </div>
    </div>
    <div className="mt-8 text-center">
      <p>&copy; 2024 ShopNow. All rights reserved.</p>
    </div>
  </div>
</footer>;
